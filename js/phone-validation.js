document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneNumber');
    const phoneError = document.getElementById('phoneError');

    phoneInput.addEventListener('input', function() {
        // إزالة أي أحرف غير رقمية
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // التحقق من طول الرقم
        if (this.value.length !== 11) {
            phoneError.style.display = 'block';
            this.setCustomValidity('أدخل رقم هاتف مكون من 11 رقم فقط');
        } else {
            phoneError.style.display = 'none';
            this.setCustomValidity('');
        }
    });

    // التحقق عند فقدان التركيز
    phoneInput.addEventListener('blur', function() {
        if (this.value.length !== 11) {
            phoneError.style.display = 'block';
            this.setCustomValidity('أدخل رقم هاتف مكون من 11 رقم فقط');
        }
    });
}); 