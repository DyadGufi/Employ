
// Обработка формы
const form = document.querySelector('.js-form');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);

        let inputs = form.querySelectorAll('input');

        // Валидация полей
        if (!validateForm(form)) {
            return;
        }

        // Добавляем обработку файла
        const fileInput = form.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        // Добавляем CSRF-токен (если используете Laravel)
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        if (csrfToken) {
            formData.append('_token', csrfToken);
        }

        try {
            // Отправка данных
            const response = await axios.post(form.action || '/submit-form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Обработка успешного ответа
            if (response.data.success) {
                alert('Форма успешно отправлена!');
                form.reset();
                // Сброс значения range slider
                if (rangeSlider && percentNum) {
                    rangeSlider.value = 75;
                    percentNum.textContent = '75';
                }
            } else {
                throw new Error(response.data.message || 'Ошибка при отправке формы');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.response?.data?.message || error.message || 'Произошла ошибка при отправке формы');
        }
    });
}

// Функция валидации формы с проверкой типов
function validateForm(form) {
    // Проверка select
    const typeSelects = form.querySelectorAll('[name="type"]');
    let hasEmptySelect;

    if (typeSelects.length > 0) {
        let hasEmptySelect = Array.from(typeSelects).some(select => !select.value);

        if (hasEmptySelect) {
            showError('Пожалуйста, выберите тип системы');
            typeSelects[0].focus(); // Фокусируем первый невалидный
            return false;
        }
    }

    // Проверка email полей
    const emailInputs = form.querySelectorAll('[name="email"]');
    let emailValid = true;

    if (emailInputs.length > 0) {
        // Проверяем все email поля
        for (const emailInput of emailInputs) {
            if (!emailInput.value.trim()) {
                showError('Пожалуйста, введите email', emailInput);
                emailValid = false;
                break; // Прерываем при первой ошибке
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError('Пожалуйста, введите корректный email', emailInput);
                emailValid = false;
                break; // Прерываем при первой ошибке
            }
        }

        if (!emailValid) {
            return false;
        }
    }

    return true;
}

// Вспомогательные функции
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    // Здесь можно реализовать красивый вывод ошибок
    alert(message);
}

function showSuccess(message) {
    // Здесь можно реализовать красивый вывод успеха
    alert(message);
}
