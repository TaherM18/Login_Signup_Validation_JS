const validInputClass = "valid";
const invalidInputClass = "invalid";
const successClass = "success";
const dangerClass = "danger";
const satisfiedClass = "satisfied";
const notSatisfiedClass = "not-satisfied";

// Elements =================================================================

const num = document.getElementById("num");
const char = document.getElementById("char");
const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const special = document.getElementById("special");

// Valids =================================================================================

export function sanitize(value) {
    const regex = /\s{2,}/g;
    return value.trim().replace(regex, " ");
}

export function isValidName(value) {
    const regex = /^[a-zA-Z\s'-]+$/;
    return value.match(regex) != null;
}

export function isValidPhone(value) {
    const regex = /^[7-9]{1}[0-9]{9}$/;
    return value.match(regex) != null;
}

export function isValidDate(value) {
    const date = new Date(value);
    return !isNaN(date.getTime());
}

export function isValidEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,5}$/;
    return value.match(regex) != null;
}

export function isValidPassword(value) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return value.match(regex) != null;
}

export function isValidConfirm(value1, value2) {
    return value1 == value2;
}

// Checks =================================================================================

export function checkName(input, msg) {
    if (input.value.trim().length === 0) {
        setInvalidInput(input);
        setInvalidMessage(msg, "Name is required");
        return false;
    }
    else if (!isValidName(input.value)) {
        setInvalidInput(input);
        setInvalidMessage(msg);
        return false;
    }
    else {
        setValidInput(input)
        setValidMessage(msg);
        return true;
    }
}

export function checkEmail(input, msg) {
    input.value = input.value.replace(/\s+/, "");
    if (input.value.length === 0) {
        setInvalidInput(input);
        setInvalidMessage(msg, "This field is required");
        return false;
    }
    else if (!isValidEmail(input.value)) {
        setInvalidInput(input);
        setInvalidMessage(msg, "Invalid email");
        return false;
    }
    else {
        setValidInput(input)
        setValidMessage(msg);
        return true;
    }
}

export function checkPassword(input, msg) {
    input.value = input.value.replace(/\s/g, "");
    
    if (input.value.length === 0) {
        setInvalidInput(input);
        setInvalidMessage(msg, "Password is required");
        return false;
    }
    else if (!isValidPassword(input.value)) {
        setInvalidInput(input);
        setInvalidMessage(msg, "Invalid password format");
        return false;
    }
    else {
        setValidInput(input)
        setValidMessage(msg);
        return true;
    }
}

export function checkPasswordConditions(value) {
    // /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&]{8,}$/
    const numRegex = /[0-9]/g;
    const minLength = 8
    const lowercaseAlphaRegex = /[a-z]/g;
    const uppercaseAlphaRegex = /[A-Z]/g;
    const specialCharRegex = /\W/g;

    numRegex.test(value) ? setSatisfied(num) : setNotSatisfied(num);

    value.length >= minLength ? setSatisfied(char) : setNotSatisfied(char);

    lowercaseAlphaRegex.test(value) ? setSatisfied(lower) : setNotSatisfied(lower);

    uppercaseAlphaRegex.test(value) ? setSatisfied(upper) : setNotSatisfied(upper);

    specialCharRegex.test(value) ? setSatisfied(special) : setNotSatisfied(special);
}

export function checkConfirmPassword(pass, confirm, msg) {
    if (confirm.value.length === 0) {
        setInvalidInput(confirm);
        setInvalidMessage(msg, "Confirmation is required");
        return false;
    }
    else if (!isValidConfirm(pass.value, confirm.value)) {
        setInvalidInput(confirm);
        setInvalidMessage(msg, "Passwords don't match");
        return false;
    }
    else {
        setValidInput(confirm)
        setValidMessage(msg);
        return true;
    }
}

export function checkDOB(target, msg, allowFuture = false, minAge = NaN) {
    if (target.value.length != 10) {
        setInvalidInput(target);
        setInvalidMessage(msg, "Please select your birthdate");
        return false; // empty
    }
    // Check if the value is a valid date
    if (!isValidDate(target.value)) {
        setInvalidInput(target);
        setInvalidMessage(msg, "Invalid date");
        return false; // Invalid date
    }
    // Check if the date is in the future
    const today = new Date();
    const dob = new Date(target.value);
    if (!allowFuture && dob > today) {
        setInvalidInput(target);
        setInvalidMessage(msg, "Date cannot be in future");
        return false;
    }
    // Check the age
    if (!isNaN(minAge)) {
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        
        if (age <= minAge || (age === minAge && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            setInvalidInput(target);
            setInvalidMessage(msg, `Age cannot be less than ${minAge}`);
            return false; // Age less than minAge
        }
    }
    // All Good
    setValidInput(target);
    setValidMessage(msg);
    return true;
}

// Setters =====================================================================

export function setValidInput(target) {
    if (!target.classList.contains(validInputClass)) {
        target.classList.add(validInputClass);
    }
    target.classList.remove(invalidInputClass);
}

export function setInvalidInput(target) {
    if (!target.classList.contains(invalidInputClass)) {
        target.classList.add(invalidInputClass);
    }
    target.classList.remove(validInputClass);
}

export function setValidMessage(target, message = "Looks good!") {
    if (!target.classList.contains(successClass)) {
        target.classList.add(successClass);
        target.innerHTML = message;
    }
    target.classList.remove(dangerClass);
}

export function setInvalidMessage(target, message = "Invalid") {
    if (!target.classList.contains(dangerClass)) {
        target.classList.add(dangerClass);
    }
    target.innerHTML = message;
    target.classList.remove(successClass);
}

export function setMessage(target, message, isValid) {
    const addClass = isValid ? successClass : dangerClass;
    const removeClass = isValid ? dangerClass : successClass;
    if (!target.classList.contains(addClass)) {
        target.classList.add(addClass);
    }
    target.innerHTML = message;
    target.classList.remove(removeClass);
}

export function setSatisfied(target) {
    if (!target.classList.contains(satisfiedClass)) {
        target.classList.add(satisfiedClass);
    }
    target.classList.remove(notSatisfiedClass);
}

export function setNotSatisfied(target) {
    if (!target.classList.contains(notSatisfiedClass)) {
        target.classList.add(notSatisfiedClass);
    }
    target.classList.remove(satisfiedClass);
}

export function resetForm(form) {
    form.querySelectorAll("input").forEach(function(element) {
        element.classList.remove(validInputClass);
        element.classList.remove(invalidInputClass);
    });
    form.querySelectorAll(".form-message").forEach(function(element) {
        element.innerHTML = "";
        element.classList.remove(successClass);
        element.classList.remove(dangerClass);
    });
}

export function invalidSubmit(target) {
    // target.innerHTML = "Not Submitable";
    target.setAttribute("disabled", true);
}

export function validSubmit(target) {
    // target.innerHTML = "Submit";
    target.removeAttribute("disabled");
}