document.addEventListener('DOMContentLoaded', function() {
    const rangeSliders = document.querySelectorAll('.range__slider');

    rangeSliders.forEach(function(slider) {
        const percentNum = slider.closest('.range').querySelector('.range-percent-num');

        slider.addEventListener('input', function() {
            percentNum.textContent = this.value;
        });

        percentNum.textContent = slider.value;
    });
});
