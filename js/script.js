const form = document.querySelector("form"),
  nextBtn = form.querySelector(".nextBtn"),
  backBtn = form.querySelector(".backBtn"),
  allInput = form.querySelectorAll(".first input");


// Add event listener for the "Next" button
nextBtn.addEventListener("click", () => {
  allInput.forEach(input => {
    if (input.value != "") {
      form.classList.add('secActive');
    } else {
      form.classList.remove('secActive');
    }
  })
})

// Add event listener for the "Back" button
backBtn.addEventListener("click", () => form.classList.remove('secActive'));

// إغلاق النافذة المنبثقة عند النقر خارجها
document.addEventListener('click', function(event) {
  const popup = document.getElementById('confirmationOverlay');
  if (popup && !popup.contains(event.target)) {
    popup.style.display = 'none';
  }
});

// دالة للتحقق من قيمة القائمة المنسدلة
function validateDropdown(dropdown) {
  const input = dropdown.querySelector('input');
  const value = input.value.trim();
  
  if (value) {
    input.classList.remove('error');
    const errorMessage = dropdown.querySelector('.field-error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// دالة لإخفاء رسالة الخطأ عند ملء الحقل
function hideFieldError(field) {
  if (field.value.trim()) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.field-error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// دالة التحقق من صحة البيانات
function validateForm() {
  // تحديد جميع الحقول المطلوبة في القسم الأول
  const requiredFields = document.querySelectorAll('.first input[required], .first select[required], .first .dropdown input[required]');
  let isValid = true;
  let emptyFields = [];

  // إزالة جميع رسائل الخطأ السابقة
  document.querySelectorAll('.field-error-message').forEach(msg => msg.remove());
  document.querySelectorAll('.has-error').forEach(field => field.classList.remove('has-error'));

  // التحقق من الحقول في القسم الأول
  requiredFields.forEach(field => {
    const value = field.value.trim();
    
    if (!value) {
      isValid = false;
      let labelText = '';
      const label = field.closest('.input-field').querySelector('label');
      if (label) {
        labelText = label.textContent.trim();
      } else {
        labelText = field.placeholder || 'حقل مطلوب';
      }
      
      emptyFields.push(labelText);
      field.classList.add('error');
      
      // إضافة فئة has-error للحقل الأب إذا كان من حقول تاريخ الميلاد
      const dateField = field.closest('.date-field');
      if (dateField) {
        dateField.classList.add('has-error');
      }
      
      field.style.animation = 'shake 0.5s';
      setTimeout(() => {
        field.style.animation = '';
      }, 500);

      const errorMessage = document.createElement('div');
      errorMessage.className = 'field-error-message';
      errorMessage.textContent = 'هذا الحقل مطلوب';
      field.parentNode.appendChild(errorMessage);
    } else {
      field.classList.remove('error');
      // إزالة فئة has-error من الحقل الأب
      const dateField = field.closest('.date-field');
      if (dateField) {
        dateField.classList.remove('has-error');
      }
    }
  });

  // التحقق من الحقول في القسم الثاني إذا كان النموذج في القسم الثاني
  if (form.classList.contains('secActive')) {
    const secondSectionFields = document.querySelectorAll('.second input[required], .second select[required], .second .dropdown input[required]');
    
    secondSectionFields.forEach(field => {
      const value = field.value.trim();
      
      if (!value) {
        isValid = false;
        let labelText = '';
        const label = field.closest('.input-field').querySelector('label');
        if (label) {
          labelText = label.textContent.trim();
        } else {
          labelText = field.placeholder || 'حقل مطلوب';
        }
        
        emptyFields.push(labelText);
        field.classList.add('error');
        
        field.style.animation = 'shake 0.5s';
        setTimeout(() => {
          field.style.animation = '';
        }, 500);

        const errorMessage = document.createElement('div');
        errorMessage.className = 'field-error-message';
        errorMessage.textContent = 'هذا الحقل مطلوب';
        field.parentNode.appendChild(errorMessage);
      } else {
        field.classList.remove('error');
      }
    });
  }

  if (!isValid) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <p>يرجى إكمال الحقول التالية:</p>
      <ul>
        ${emptyFields.map(field => `<li>${field}</li>`).join('')}
      </ul>
    `;

    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    const nextButton = document.querySelector('.nextBtn');
    nextButton.parentNode.insertBefore(errorMessage, nextButton);

    const firstEmptyField = document.querySelector('.first input.error, .first select.error, .first .dropdown input.error, .second input.error, .second select.error, .second .dropdown input.error');
    if (firstEmptyField) {
      firstEmptyField.focus();
    }

    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }

  return isValid;
}

// دالة الانتقال للخطوة التالية
function nextStep() {
  if (validateForm()) {
    const form = document.querySelector("form");
    form.classList.add("secActive");
    
    // إضافة التركيز التلقائي على حقل التحصيل الدراسي
    setTimeout(() => {
      const educationInput = document.querySelector('#education');
      if (educationInput) {
        educationInput.focus();
      }
    }, 300); // تأخير قصير للتأكد من اكتمال الانتقال
  }
}

// دالة العودة للخطوة السابقة
function prevStep() {
  const form = document.querySelector("form");
  form.classList.remove("secActive");
}

// إضافة مستمعي الأحداث لأزرار التنقل
document.querySelector(".nextBtn").addEventListener("click", nextStep);
document.querySelector(".backBtn").addEventListener("click", prevStep);

// إضافة مستمعي الأحداث للحقول المطلوبة
document.addEventListener('DOMContentLoaded', function() {
  const requiredFields = document.querySelectorAll('.first input[required], .first select[required], .first .dropdown input[required]');
  
  requiredFields.forEach(field => {
    // إضافة مستمع أحداث للكتابة
    field.addEventListener('input', function() {
      hideFieldError(this);
    });
    
    // إضافة مستمع أحداث للتركيز
    field.addEventListener('blur', function() {
      hideFieldError(this);
    });
    
    // إضافة مستمع أحداث للتغيير (للقوائم المنسدلة)
    field.addEventListener('change', function() {
      hideFieldError(this);
    });
  });

  // إضافة مستمعي الأحداث للقوائم المنسدلة
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const input = dropdown.querySelector('input');
    if (input && input.hasAttribute('required')) {
      // التحقق عند اختيار خيار
      dropdown.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
          setTimeout(() => validateDropdown(dropdown), 0);
        }
      });

      // التحقق عند الكتابة
      input.addEventListener('input', function() {
        validateDropdown(dropdown);
      });

      // التحقق عند الخروج من الحقل
      input.addEventListener('blur', function() {
        validateDropdown(dropdown);
      });
    }
  });
});