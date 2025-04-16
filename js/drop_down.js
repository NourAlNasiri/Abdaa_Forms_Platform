function toggleDropdown(inputElement) {
    closeAllDropdowns();
    const dropdown = inputElement.nextElementSibling.nextElementSibling;
    dropdown.classList.toggle("show");
    inputElement.classList.toggle("active");
}

function selectOption(element) {
    const dropdownContent = element.parentElement;
    const inputElement = dropdownContent.previousElementSibling.previousElementSibling;
    inputElement.value = element.textContent.trim();
    closeAllDropdowns();
}

function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-content").forEach(dropdown => {
        dropdown.classList.remove("show");
    });
    document.querySelectorAll(".dropdown input").forEach(input => {
        input.classList.remove("active");
    });
}

document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
        closeAllDropdowns();
    }
});

function filterOptions(inputElement) {
    const filter = inputElement.value.toLowerCase();
    const dropdownContent = inputElement.nextElementSibling.nextElementSibling;
    const options = dropdownContent.querySelectorAll("a");

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? "block" : "none";
    });
}