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