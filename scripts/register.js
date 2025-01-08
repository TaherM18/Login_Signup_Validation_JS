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
    checkPasswordConditions,
    checkEmail,
    resetForm
} from "./validation.js";
import { togglePassword } from "./bootstrapUtil.js";

// Elements =============================================================

const name = document.getElementById("name");
const male = document.getElementById("male");
const female = document.getElementById("female");
const dob = document.getElementById("dob");
const country = document.getElementById("country");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePass = document.getElementById("toggle-pass");
const toggleIcon = document.getElementById("toggle-icon");
const confirmPassword = document.getElementById("confirm-password");
const terms = document.getElementById("terms");
const btnSubmit = document.getElementById("btn-submit");
const signupForm = document.getElementById("signup-form");

const msgName = document.getElementById("msg-name");
const msgDOB = document.getElementById("msg-dob");
const msgGender = document.getElementById("msg-gender");
const msgEmail = document.getElementById("msg-email");
const msgPass = document.getElementById("msg-pass");
const msgConfirm = document.getElementById("msg-confirm");

const conditionGroup = document.getElementsByClassName("condition-group")[0];

const alertSuccess = document.getElementById("alert-success");
const alertDanger = document.getElementById("alert-danger");


// Event Listeners ==================================================

name.addEventListener("input", (e) => {
    checkName(e.target, msgName);
});

dob.addEventListener("change", (e) => {
    checkDOB(e.target, msgDOB, false, 18);
});

email.addEventListener("input", (e) => {
    checkEmail(e.target, msgEmail);
});

password.addEventListener("input", (e) => {
    checkPassword(e.target, msgPass);
    checkPasswordConditions(e.target.value);
});

togglePass.addEventListener("click", (e) => {
    togglePassword(toggleIcon, password);
})

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

        show(alertSuccess);
        setTimeout(() => { hide(alertSuccess) }, 3000);
        resetForm(signupForm);
    }
    else {
        show(alertDanger);
        setTimeout(() => { hide(alertDanger) }, 3000);
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

function show(target) {
    target.style.display = "block";
}

function hide(target) {
    target.style.display = "none";
}