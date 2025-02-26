// function closePopup() {
//   document.getElementById('popupOverlay').style.display = 'none';
// }

// window.onload = function () {
//   document.getElementById('popupOverlay').style.display = 'flex';
// };

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}

window.onload = function () {
  document.getElementById('popupOverlay').style.display = 'flex';
};

function submitForm(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة
  alert("تم إرسال البيانات بنجاح!"); // تنبيه المستخدم
}