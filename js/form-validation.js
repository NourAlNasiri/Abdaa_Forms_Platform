document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const specializationInput = document.getElementById('specialization');
    const collegeInput = document.getElementById('collegeName');
    const specializationError = document.getElementById('specializationError');
    const collegeError = document.getElementById('collegeError');

    // إضافة معالج حدث الإرسال للنموذج
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الافتراضي
        
        let isValid = true;

        // التحقق من حقل الاختصاص
        if (!specializationInput.value.trim()) {
            specializationError.style.display = 'block';
            isValid = false;
        } else {
            specializationError.style.display = 'none';
        }

        // التحقق من حقل اسم الكلية
        if (!collegeInput.value.trim()) {
            collegeError.style.display = 'block';
            isValid = false;
        } else {
            collegeError.style.display = 'none';
        }

        // إذا كان النموذج صالحاً، اعرض نافذة التأكيد
        if (isValid) {
            showConfirmationPopup();
        }
    });

    // إخفاء رسالة الخطأ عند الكتابة في الحقل
    specializationInput.addEventListener('input', function() {
        if (this.value.trim()) {
            specializationError.style.display = 'none';
        }
    });

    collegeInput.addEventListener('input', function() {
        if (this.value.trim()) {
            collegeError.style.display = 'none';
        }
    });
});

// دالة لعرض نافذة تأكيد البيانات
function showConfirmationPopup() {
    // جمع البيانات من النموذج
    const formData = {
        personal: {
            fullName: document.getElementById('fullName').value,
            prostration: document.getElementById('Prostration').value,
            birthDate: `${document.querySelector('select[name="birthDay"]').value}/${document.querySelector('select[name="birthMonth"]').value}/${document.querySelector('input[name="birthYear"]').value}`,
            sex: document.getElementById('sex').value,
            maritalStatus: document.getElementById('marital-status').value
        },
        identity: {
            civilID: document.getElementById('civilID').value,
            province: document.querySelector('input[placeholder="اختر من القائمة المحافظة..."]').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.querySelector('input[type="email"]').value
        },
        education: {
            educationLevel: document.getElementById('education').value,
            specialization: document.getElementById('specialization').value,
            college: document.getElementById('collegeName').value,
            graduationYear: document.getElementById('yearSelect').value
        }
    };

    // عرض البيانات في النافذة المنبثقة
    displayFormData(formData);
    
    // إظهار النافذة المنبثقة
    const overlay = document.getElementById('confirmationOverlay');
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
}

// دالة لعرض البيانات في النافذة المنبثقة
function displayFormData(data) {
    // عرض المعلومات الشخصية
    const personalInfo = document.getElementById('personalInfo');
    personalInfo.innerHTML = `
        <div class="data-item">
            <span class="data-label">الاسم الكامل:</span>
            <span class="data-value">${data.personal.fullName}</span>
        </div>
        <div class="data-item">
            <span class="data-label">مجال التقديم:</span>
            <span class="data-value">${data.personal.prostration}</span>
        </div>
        <div class="data-item">
            <span class="data-label">تاريخ الميلاد:</span>
            <span class="data-value">${data.personal.birthDate}</span>
        </div>
        <div class="data-item">
            <span class="data-label">الجنس:</span>
            <span class="data-value">${data.personal.sex}</span>
        </div>
        <div class="data-item">
            <span class="data-label">الحالة الزوجية:</span>
            <span class="data-value">${data.personal.maritalStatus}</span>
        </div>
    `;

    // عرض معلومات الهوية والعنوان
    const identityInfo = document.getElementById('identityInfo');
    identityInfo.innerHTML = `
        <div class="data-item">
            <span class="data-label">رقم البطاقة الموحدة:</span>
            <span class="data-value">${data.identity.civilID}</span>
        </div>
        <div class="data-item">
            <span class="data-label">المحافظة:</span>
            <span class="data-value">${data.identity.province}</span>
        </div>
        <div class="data-item">
            <span class="data-label">رقم الهاتف:</span>
            <span class="data-value">${data.identity.phone}</span>
        </div>
        <div class="data-item">
            <span class="data-label">البريد الإلكتروني:</span>
            <span class="data-value">${data.identity.email || 'غير محدد'}</span>
        </div>
    `;

    // عرض المعلومات التعليمية
    const educationInfo = document.getElementById('educationInfo');
    educationInfo.innerHTML = `
        <div class="data-item">
            <span class="data-label">التحصيل الدراسي:</span>
            <span class="data-value">${data.education.educationLevel}</span>
        </div>
        <div class="data-item">
            <span class="data-label">الاختصاص:</span>
            <span class="data-value">${data.education.specialization}</span>
        </div>
        <div class="data-item">
            <span class="data-label">اسم الكلية/الجامعة:</span>
            <span class="data-value">${data.education.college}</span>
        </div>
        <div class="data-item">
            <span class="data-label">سنة التخرج:</span>
            <span class="data-value">${data.education.graduationYear}</span>
        </div>
    `;
}

// دالة لتأكيد إرسال النموذج
function confirmSubmission() {
    // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
    alert('تم إرسال النموذج بنجاح!');
    document.getElementById('confirmationOverlay').style.display = 'none';
    // يمكنك إعادة توجيه المستخدم إلى صفحة أخرى أو إعادة تعيين النموذج
}

// دالة لإلغاء إرسال النموذج
function cancelSubmission() {
    document.getElementById('confirmationOverlay').style.display = 'none';
} 