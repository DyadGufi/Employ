// Добавляем класс active при фокусе
    document.querySelectorAll('.def-select').forEach(select => {
    console.log(select);
    
      select.addEventListener('focus', function() {
        this.closest('.def-select-wrapper').classList.add('def-select-wrapper-active');
      });
      
      select.addEventListener('blur', function() {
        this.closest('.def-select-wrapper').classList.remove('def-select-wrapper-active');
      });
    });