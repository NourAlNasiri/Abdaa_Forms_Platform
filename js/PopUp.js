// function closePopup() {
//   document.getElementById('popupOverlay').style.display = 'none';
// }

// window.onload = function () {
//   document.getElementById('popupOverlay').style.display = 'flex';
// };

function closePopup() {
  const overlay = document.getElementById('popupOverlay');
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}

function showPopup() {
  const overlay = document.getElementById('popupOverlay');
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  }, 10);
}

window.onload = function () {
  showPopup();
};

function submitForm(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة
  
  // التحقق من صحة البيانات
  if (validateForm()) {
    // عرض نافذة تأكيد البيانات
    showConfirmationPopup();
  }
}

function showConfirmationPopup() {
  // إنشاء نافذة التأكيد
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'confirmationOverlay';
  
  const popup = document.createElement('div');
  popup.className = 'popup confirmation-popup';
  
  // إضافة محتوى النافذة
  popup.innerHTML = `
    <div class="popup-header">
      <h2 class="cairo-welcom">تأكيد البيانات</h2>
      <button class="close-btn" onclick="cancelSubmission()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="confirmation-content">
      <div class="data-section">
        <div class="section-header">
          <i class="fas fa-user"></i>
          <h3>المعلومات الشخصية</h3>
        </div>
        <div id="personalInfo" class="data-container"></div>
      </div>
      <div class="data-section">
        <div class="section-header">
          <i class="fas fa-id-card"></i>
          <h3>معلومات الهوية والعنوان</h3>
        </div>
        <div id="identityInfo" class="data-container"></div>
      </div>
      <div class="data-section">
        <div class="section-header">
          <i class="fas fa-graduation-cap"></i>
          <h3>البيانات الدراسية</h3>
        </div>
        <div id="educationInfo" class="data-container"></div>
      </div>
    </div>
    <div class="confirmation-buttons">
      <button onclick="confirmSubmission()" class="confirm-btn">
        <i class="fas fa-check"></i>
        تأكيد الإرسال
      </button>
      <button onclick="cancelSubmission()" class="cancel-btn">
        <i class="fas fa-times"></i>
        إلغاء
      </button>
    </div>
  `;
  
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  
  // عرض النافذة
  setTimeout(() => {
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  }, 100);
  
  // عرض البيانات في النافذة
  displayFormData();
}

function displayFormData() {
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
  
  // عرض المعلومات الشخصية
  const personalInfo = document.getElementById('personalInfo');
  personalInfo.innerHTML = `
    <div class="data-item">
      <span class="data-label">الاسم الكامل:</span>
      <span class="data-value">${formData.personal.fullName}</span>
    </div>
    <div class="data-item">
      <span class="data-label">مجال التقديم:</span>
      <span class="data-value">${formData.personal.prostration}</span>
    </div>
    <div class="data-item">
      <span class="data-label">تاريخ الميلاد:</span>
      <span class="data-value">${formData.personal.birthDate}</span>
    </div>
    <div class="data-item">
      <span class="data-label">الجنس:</span>
      <span class="data-value">${formData.personal.sex}</span>
    </div>
    <div class="data-item">
      <span class="data-label">الحالة الزوجية:</span>
      <span class="data-value">${formData.personal.maritalStatus}</span>
    </div>
  `;
  
  // عرض معلومات الهوية والعنوان
  const identityInfo = document.getElementById('identityInfo');
  identityInfo.innerHTML = `
    <div class="data-item">
      <span class="data-label">رقم البطاقة الموحدة:</span>
      <span class="data-value">${formData.identity.civilID}</span>
    </div>
    <div class="data-item">
      <span class="data-label">المحافظة:</span>
      <span class="data-value">${formData.identity.province}</span>
    </div>
    <div class="data-item">
      <span class="data-label">رقم الهاتف:</span>
      <span class="data-value">${formData.identity.phone}</span>
    </div>
    <div class="data-item">
      <span class="data-label">البريد الإلكتروني:</span>
      <span class="data-value">${formData.identity.email || 'غير محدد'}</span>
    </div>
  `;
  
  // عرض المعلومات التعليمية
  const educationInfo = document.getElementById('educationInfo');
  educationInfo.innerHTML = `
    <div class="data-item">
      <span class="data-label">التحصيل الدراسي:</span>
      <span class="data-value">${formData.education.educationLevel}</span>
    </div>
    <div class="data-item">
      <span class="data-label">الاختصاص:</span>
      <span class="data-value">${formData.education.specialization}</span>
    </div>
    <div class="data-item">
      <span class="data-label">اسم الكلية/الجامعة:</span>
      <span class="data-value">${formData.education.college}</span>
    </div>
    <div class="data-item">
      <span class="data-label">سنة التخرج:</span>
      <span class="data-value">${formData.education.graduationYear}</span>
    </div>
  `;
}

function confirmSubmission() {
  // إرسال البيانات
  alert('تم إرسال كافة المعلومات بنجاح!');
  document.getElementById('confirmationOverlay').remove();
  // يمكنك إضافة كود هنا لإرسال البيانات إلى الخادم
}

function cancelSubmission() {
  document.getElementById('confirmationOverlay').remove();
}