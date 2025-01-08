// Imports

import {
    checkEmail,
    setInvalidInput,
    setInvalidMessage,
    setValidInput,
    setValidMessage,
    resetForm
} from "./validation.js";

import { togglePassword } from "./bootstrapUtil.js";

// Elements ================================================================

const txtEmail = document.getElementById("txt-email");
const txtPass = document.getElementById("txt-pass");
const loginForm = document.getElementById("login-form");
const btnSubmit = document.getElementById("btn-submit");
const msgEmail = document.getElementById("msg-email");
const msgPass = document.getElementById("msg-pass");
const togglePass = document.getElementById("toggle-pass");
const toggleIcon = document.getElementById("toggle-icon");

const alertSuccess = document.getElementById("alert-success");
const alertDanger = document.getElementById("alert-danger");

// Event Listeners ===========================================================

togglePass.addEventListener("click", (e) => {
    togglePassword(toggleIcon, txtPass);
})

txtEmail.addEventListener("input", (e) => {
    checkEmail(e.target, msgEmail);
});

txtPass.addEventListener("input", (e) => {
    validatePassword(e.target, msgPass);
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailData = "taher@gmail.com";
    const passData = "pass@123";

    if (checkEmail(txtEmail, msgEmail) && validatePassword(txtPass, msgPass)) {
        if (txtEmail.value == emailData && txtPass.value == passData) {
            show(alertSuccess);
            setTimeout(() => {
                hide(alertSuccess);
            }, 3000);

            resetForm(loginForm);
        }
        else {
            alertDanger.querySelector("div").innerHTML = "Incorect Credentials";
            show(alertDanger);
            setTimeout(() => {
                hide(alertDanger);
            }, 3000);
        }
    }
    else {
        alertDanger.querySelector("div").innerHTML = "Resolve form errors to contnue";
        show(alertDanger);
        setTimeout(() => {
            hide(alertDanger);
        }, 3000);
    }
});

// Functions =========================================================================

function show(target) {
    target.style.display = "block";
}

function hide(target) {
    target.style.display = "none";
}

function validatePassword(target, msg) {
    if (target.value.length === 0) { // Check for empty input first
        setInvalidInput(target);
        setInvalidMessage(msg, "Password is required");
        return false;
    }
    else if (target.value.length < 6) { // Ensure this condition only applies to non-empty input
        setInvalidInput(target);
        setInvalidMessage(msg, "Password must be at least 6 characters long");
        return false;
    }
    else {
        setValidInput(target);
        setValidMessage(msg);
        return true;
    }
}