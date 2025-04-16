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
  alert("تم إرسال البيانات بنجاح!"); // تنبيه المستخدم
}

function toggleDeveloperInfo() {
  const popup = document.getElementById('developerInfoPopup');
  popup.classList.toggle('show');
}