const input = document.getElementById("yearInput");
const tooltip = document.getElementById("tooltip");

// منع إدخال الأحرف غير الرقمية
input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

input.addEventListener("mouseover", function() {
    adjustTooltipPosition();
});

function adjustTooltipPosition() {
    const inputRect = input.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    let leftPosition = inputRect.left + inputRect.width / 2 - tooltipRect.width / 2;

    // إذا كان التلميح يخرج عن الحافة اليسرى
    if (leftPosition < 10) {
        leftPosition = 10;
    }

    // إذا كان التلميح يخرج عن الحافة اليمنى
    if (leftPosition + tooltipRect.width > screenWidth - 10) {
        leftPosition = screenWidth - tooltipRect.width - 10;
    }

    tooltip.style.left = leftPosition + "px";
}

/**
 * ملف التحقق من صحة السنة وإضافة السنوات إلى القائمة المنسدلة
 */

// إضافة سنوات التخرج في القائمة المنسدلة
window.onload = function() {
    console.log('تم تحميل الصفحة، جاري إضافة السنوات إلى القائمة المنسدلة...');
    
    const yearSelect = document.getElementById('yearSelect');
    
    // التحقق من وجود العنصر قبل محاولة إضافة الخيارات
    if (yearSelect) {
        console.log('تم العثور على عنصر القائمة المنسدلة للسنة');
        
        // إزالة الخيار الافتراضي إذا كان موجودًا
        yearSelect.innerHTML = '';
        
        // إضافة خيار افتراضي
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'اختر سنة التخرج';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        yearSelect.appendChild(defaultOption);
        
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 30; // نبدأ من 30 سنة مضت
        
        console.log(`إضافة السنوات من ${startYear} إلى ${currentYear}`);
        
        // إضافة السنوات للقائمة المنسدلة
        for (let year = currentYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        
        // إضافة مستمع حدث للتغيير
        yearSelect.addEventListener('change', function() {
            console.log('تم اختيار السنة:', this.value);
        });
        
        console.log(`تم إضافة ${yearSelect.options.length} سنة إلى القائمة المنسدلة`);
    } else {
        console.error('لم يتم العثور على عنصر القائمة المنسدلة للسنة');
    }
};