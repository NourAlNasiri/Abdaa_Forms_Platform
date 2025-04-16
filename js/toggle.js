// تحديد نطاق السنوات
const startYear = 1966; // أول سنة
const endYear = new Date().getFullYear(); // السنة الحالية
const select = document.getElementById("yearSelect");

// توليد السنوات وإضافتها للقائمة المنسدلة
for (let year = endYear; year >= startYear; year--) {
    let option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
}

// إرجاع الخيار الافتراضي إذا لم يتم الاختيار
select.addEventListener("change", function() {
    if (!this.value) {
        this.selectedIndex = 0;
    }
});