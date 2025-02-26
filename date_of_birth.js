  // تعبئة الأيام
  const daySelect = document.getElementById("day");
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  }

  // تعبئة الشهور
  const monthSelect = document.getElementById("month");
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  
    // إرجاع الخيار الافتراضي إذا لم يتم الاختيار
    select.addEventListener("change", function() {
        if (!this.value) {
            this.selectedIndex = 0;
        }
    });