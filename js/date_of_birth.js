// التحقق من صحة التاريخ وتحديث الأيام
document.addEventListener('DOMContentLoaded', function() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('yearInput');

    // دالة لتحديث عدد الأيام بناءً على الشهر والسنة
    function updateDays() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearInput.value);
        
        // حذف جميع الخيارات الحالية
        while (daySelect.options.length > 1) {
            daySelect.remove(1);
        }

        // تحديد عدد الأيام في الشهر
        let daysInMonth;
        if (month === 2) { // فبراير
            daysInMonth = isLeapYear(year) ? 29 : 28;
        } else if ([4, 6, 9, 11].includes(month)) { // أشهر 30 يوم
            daysInMonth = 30;
        } else { // أشهر 31 يوم
            daysInMonth = 31;
        }

        // إضافة خيارات الأيام
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    // دالة للتحقق من السنة الكبيسة
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // إضافة مستمعي الأحداث
    monthSelect.addEventListener('change', updateDays);
    yearInput.addEventListener('input', function() {
        const year = parseInt(this.value);
        if (year >= 1966 && year <= 2006) {
            updateDays();
        }
    });

    // التحقق من صحة السنة عند الإدخال
    yearInput.addEventListener('blur', function() {
        const year = parseInt(this.value);
        if (year < 1966 || year > 2006) {
            this.setCustomValidity('يجب أن تكون السنة بين 1966 و 2006');
        } else {
            this.setCustomValidity('');
        }
    });
});