'use strict';

// ################### about me -> start ###################
var aboutText = document.querySelector('.about-text');

aboutText.children[0].textContent = "I'm Habibur Rahman, a Junior Software Engineer with expertise in Java and Spring Boot. I graduated in 2024 with a CGPA of 3.00+ and have experience in web development (HTML, CSS, JavaScript). I'm currently learning Android development with Java and Kotlin. I love coding and problem-solving, having solved over 2000+ problems on platforms like Codeforces, HackerRank, and LeetCode. I'm fluent in English and can speak a little Hindi and Urdu, with Bengali as my mother tongue.";
aboutText.children[1].textContent = "I'm passionate about machine learning and cyber-security, particularly image processing. I plan to pursue a master’s degree in one of these fields. I actively participate in online coding competitions to sharpen my skills and stay current with tech trends.";

// ################### about me -> end ###################

// Element toggle function
const toggleElement = elem => elem.classList.toggle('active');

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar elements
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Toggle sidebar on button click
sidebarBtn.addEventListener('click', () => toggleElement(sidebar));

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { toggleElement(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    toggleElement(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");   


// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// add event   
formBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent default form submission

  // get form data
  const formData = new FormData(form);
  const fullName = formData.get("fullname");
  const email = formData.get("email");
  const message = formData.get("message");

  // construct email subject and body
  const subject = `New Message from ${fullName}`;
  const body = `Name: ${fullName}\nEmail: ${email}\nMessage:\n${message}`;

  // create a new Gmail window with pre-filled email
  const gmailUrl = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;

  // redirect to the current browser window with the Gmail URL
  window.location.href = gmailUrl;
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Change current time
const now = new Date();

// Format the date as "14 June, 2021"
const formattedDate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

// Update the HTML element
const timeElement = document.getElementById('current-time');
timeElement.setAttribute('datetime', now.toISOString().split('T')[0]); // YYYY-MM-DD
timeElement.textContent = formattedDate;