// Imports

import {
    setValidInput,
    setInvalidInput,
    setValidMessage,
    setInvalidMessage,
    checkName,
    checkPassword,
    checkConfirmPassword,
    checkDOB,
    checkPasswordConditions
} from "./validation.js";

// Elements =============================================================

const name = document.getElementById("name");
const male = document.getElementById("male");
const female = document.getElementById("female");
const dob = document.getElementById("dob");
const country = document.getElementById("country");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const terms = document.getElementById("terms");
const btnSubmit = document.getElementById("btn-submit");
const signupForm = document.getElementById("signup-form");

const msgName = document.getElementById("msg-name");
const msgDOB = document.getElementById("msg-dob");
const msgGender = document.getElementById("msg-gender");
const msgPass = document.getElementById("msg-pass");
const msgConfirm = document.getElementById("msg-confirm");

const conditionGroup = document.getElementsByClassName("condition-group")[0];


// Event Listeners ==================================================

name.addEventListener("input", (e) => {
    checkName(e.target, msgName);
});

dob.addEventListener("change", (e) => {
    checkDOB(e.target, msgDOB);
});

password.addEventListener("input", (e) => {
    checkPassword(e.target, msgPass);
    checkPasswordConditions(e.target.value);
});

password.addEventListener("focus", () => {
    conditionGroup.style.display = "block"
});

password.addEventListener("blur", () => {
    conditionGroup.style.display = "none"
});

confirmPassword.addEventListener("input", (e) => {
    checkConfirmPassword(password, e.target, msgConfirm);
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if ( checkName(name, msgName) && checkGender() 
        && checkDOB(dob, msgDOB) && checkPassword(password, msgPass) 
        && checkConfirmPassword(password, confirmPassword, msgConfirm)
        && checkTerms() ) {
            alert("Registration Success");
        // TODO: Show sucess alert using bootstrap
    }
    else {
        // alert("Please solve input errors");
        // TODO: Show danger alert using bootstrap
    }
});

// Functions ===================================================================

function checkGender() {
    if (male.checked || female.checked) {
        setValidMessage(msgGender);
        return true
    }
    else {
        setInvalidMessage(msgGender, "Please select your gender");
        return false;
    }
}

function checkTerms() {
    if (terms.checked) {
        setValidInput(terms);
        return true;
    }
    else {
        setInvalidInput(terms);
        return false;
    }
}