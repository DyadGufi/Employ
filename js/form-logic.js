
// Обработка формы
const form = document.querySelector('.js-form');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);

        // Валидация полей
        if (!validateForm(form)) {
            return;
        } else {
            alert('Форма успешно отправлена!')
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
    alert(message);
}

function showSuccess(message) {
    alert(message);
}
