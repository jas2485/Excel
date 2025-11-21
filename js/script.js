// script.js - JavaScript Assignment 3
// Group 7: Rittanpreet Kaur and Jaskirat Singh

// Global variables
let isDarkTheme = false;

// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on based on the presence of specific elements
    const isHomePage = document.getElementById('sendButton') !== null;
    const isExcelPage = document.getElementById('calculateButton') !== null;
    
    // Set up event listeners based on the current page
    if (isHomePage) {
        setupHomePageEvents();
    } else if (isExcelPage) {
        setupExcelPageEvents();
    }
    
    // Set up theme switcher if it exists
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }
    
    // Check if there is a saved theme preference
    loadThemePreference();
});

/**
 * Sets up event listeners for the home page
 */
function setupHomePageEvents() {
    const sendButton = document.getElementById('sendButton');
    const cancelButton = document.getElementById('cancelButton');
    
    if (sendButton) {
        sendButton.addEventListener('click', validateAndGetUserInfo);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            document.getElementById('output').innerHTML = '';
        });
    }
}

/**
 * Validates form input and then gets user info if valid
 */
function validateAndGetUserInfo() {
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const province = document.getElementById('province').value.trim();
    
    // Validate inputs
    if (!firstName) {
        alert('Please enter your first name.');
        return false;
    }
    
    if (!lastName) {
        alert('Please enter your last name.');
        return false;
    }
    
    if (!email) {
        alert('Please enter your email address.');
        return false;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!address) {
        alert('Please enter your address.');
        return false;
    }
    
    if (!city) {
        alert('Please enter your city.');
        return false;
    }
    
    if (!province) {
        alert('Please enter your province.');
        return false;
    }
    
    // If all validation passes, get user info
    getUserInfo();
    return true;
}

/**
 * Collects and displays user information from the registration form
 */
function getUserInfo() {
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const province = document.getElementById('province').value.trim();
    
    // Get selected membership option
    let membership = "";
    if (document.getElementById('premium').checked) {
        membership = "Premium";
    } else if (document.getElementById('standard').checked) {
        membership = "Standard";
    } else if (document.getElementById('basic').checked) {
        membership = "Basic";
    }
    
    // Create the output text
    const outputText = `
        <h3>User Information</h3>
        <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}<br>
        ${city}, ${province}</p>
        <p><strong>Membership:</strong> ${membership}</p>
    `;
    
    // Display the output
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = outputText;
    }
}

/**
 * Sets up event listeners for the excel page
 */
function setupExcelPageEvents() {
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', myExcelFuns);
    }
}

/**
 * Performs Excel-like calculations on user-provided numbers
 */
function myExcelFuns() {
    // Get the user input
    const numberStr = document.getElementById('numbers').value;
    
    // Check if the input is empty
    if (!numberStr || numberStr.trim() === '') {
        alert('Please enter numbers separated by spaces.');
        return false;
    }
    
    // Remove extra spaces and split the string into an array
    const numberArr = numberStr.trim().split(' ');
    
    // Create a new array with only numeric values
    const finalNumericArray = [];
    
    // Loop through each element in the array
    for (let i = 0; i < numberArr.length; i++) {
        // Convert the string to a number and check if it's a valid number and not an empty string
        const num = parseFloat(numberArr[i]);
        if (!isNaN(num) && numberArr[i].trim() !== '') {
            finalNumericArray.push(num);
        }
    }
    
    // Check if there are valid numbers after filtering
    if (finalNumericArray.length === 0) {
        alert('Please enter valid numbers separated by spaces.');
        return false;
    }
    
    // Variable to store the final result
    let result;
    
    // Check which operation was selected and perform the calculation
    if (document.getElementById('sum').checked) {
        // Calculate the sum
        result = finalNumericArray.reduce((total, num) => total + num, 0);
    } else if (document.getElementById('avg').checked) {
        // Calculate the average
        const total = finalNumericArray.reduce((sum, num) => sum + num, 0);
        result = total / finalNumericArray.length;
    } else if (document.getElementById('max').checked) {
        // Find the maximum number
        result = Math.max(...finalNumericArray);
    } else {
        // Find the minimum number
        result = Math.min(...finalNumericArray);
    }
    
    // Format the result to 2 decimal places if it's not a whole number
    if (result % 1 !== 0) {
        result = result.toFixed(2);
    }
    
    // Display the result
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.textContent = result;
    }
    
    return true;
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
    
    // Save theme preference to localStorage
    saveThemePreference();
}

/**
 * Saves the current theme preference to localStorage
 */
function saveThemePreference() {
    localStorage.setItem('isDarkTheme', isDarkTheme);
}

/**
 * Loads the theme preference from localStorage
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('isDarkTheme');
    if (savedTheme !== null) {
        isDarkTheme = savedTheme === 'true';
        
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }
}