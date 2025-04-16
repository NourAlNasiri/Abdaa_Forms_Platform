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

// دالة للتحكم في ظهور واختفاء معلومات المطور
function toggleDeveloperInfo() {
  const popup = document.getElementById('developerInfoPopup');
  popup.classList.toggle('show');
}

// إغلاق النافذة المنبثقة عند النقر خارجها
document.addEventListener('click', function(event) {
  const popup = document.getElementById('developerInfoPopup');
  const infoIcon = document.querySelector('.info-icon');
  
  if (!popup.contains(event.target) && !infoIcon.contains(event.target)) {
    popup.classList.remove('show');
  }
});

// دالة الانتقال للخطوة التالية
function nextStep() {
  const form = document.querySelector("form");
  form.classList.add("secActive");
}

// دالة العودة للخطوة السابقة
function prevStep() {
  const form = document.querySelector("form");
  form.classList.remove("secActive");
}

// إضافة مستمعي الأحداث لأزرار التنقل
document.querySelector(".nextBtn").addEventListener("click", nextStep);
document.querySelector(".backBtn").addEventListener("click", prevStep);