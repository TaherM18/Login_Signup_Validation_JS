// Imports

import {
    setValidInput,
    setInvalidInput,
    isValidEmail,
    isValidPassword,
    setValidMessage,
    setInvalidMessage,
    resetInput,
    resetMessage,
    invalidSubmit,
    validSubmit,
} from "./validation.js";

// Elements

const txtEmail = document.getElementById("txt-email");
const txtPass = document.getElementById("txt-pass");
const loginForm = document.getElementById("login-form");
const btnSubmit = document.getElementById("btn-submit");
const msgEmail = document.getElementById("msg-email");
const msgPass = document.getElementById("msg-pass");

// Event Listeners

txtEmail.addEventListener("input", (e) => {
    if (isValidEmail(e.target.value) === true) {
        setValidInput(e.target);
        setValidMessage(msgEmail)
        validSubmit(btnSubmit);
    } else {
        setInvalidInput(e.target);
        setInvalidMessage(msgEmail);
        invalidSubmit(btnSubmit);
    }
});

txtPass.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
        setValidInput(e.target);
        setValidMessage(msgPass);
        validSubmit(btnSubmit);
    } else {
        setInvalidInput(e.target);
        setInvalidMessage(msgPass);
        invalidSubmit(btnSubmit);
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("form submit");
    const emailData = "taher@gmail.com";
    const passData = "pass@123";

    if (isValidEmail(txtEmail.value) && isValidPassword(txtPass.value)) {
        if (txtEmail.value == emailData && txtPass.value == passData) {
            alert("Login Successfull");
            loginForm.reset();
            resetInput(txtEmail);
            resetInput(txtPass);
            resetMessage(msgEmail);
            resetMessage(msgPass);
        }
        else {
            setInvalidInput(txtEmail);
            setInvalidInput(txtPass);
            alert("Incorect Credentials");
        }
    }
    else {
        alert("Please enter valid data");
        loginForm.reset();
        resetInput(txtEmail);
        resetInput(txtPass);
        resetMessage(msgEmail);
        resetMessage(msgPass);
    }
});
