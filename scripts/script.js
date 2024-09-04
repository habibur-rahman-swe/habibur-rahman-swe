'use strict';

// ################### about me -> start ###################
var aboutText = document.querySelector('.about-text');

aboutText.children[0].textContent = "I'm Habibur Rahman, a Junior Software Engineer with expertise in Java and Spring Boot. I graduated in 2024 with a CGPA of 3.00+ and have experience in web development (HTML, CSS, JavaScript). I'm currently learning Android development with Java and Kotlin. I love coding and problem-solving, having solved over 2000+ problems on platforms like Codeforces, HackerRank, and LeetCode. I'm fluent in English and can speak a little Hindi and Urdu, with Bengali as my mother tongue.";
aboutText.children[1].textContent = "I'm passionate about machine learning and cyber-security, particularly image processing. I plan to pursue a master’s degree in one of these fields. I actively participate in online coding competitions to sharpen my skills and stay current with tech trends.";

// ################### about me -> end ###################

// Element toggle function
const toggleElement = elem => elem.classList.toggle('active');

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

