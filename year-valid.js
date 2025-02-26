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