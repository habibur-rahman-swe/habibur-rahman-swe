'use strict';

// Element toggle function
const toggleElement = elem => elem.classList.toggle('active');

// Sidebar elements
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Toggle sidebar on button click
sidebarBtn.addEventListener('click', () => toggleElement(sidebar));
