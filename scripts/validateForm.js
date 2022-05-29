"use strict";
var $ = function (id) {
	return document.getElementById(id);
};

function handleErrorMsg(input, message, type) {
	// get the element and set/remove the error message
	const msg = input.parentNode.getElementsByClassName("error")[0];
	msg.innerText = message;
	//update the class for the input
	if (type) {
		// no errors, remove 'red' class
		input.classList.remove("red");
	} else {
		// error, add 'red' class to the element
		input.classList.add("red");
	}
	return type;
}

function showErrorMsg(input, message) {
	return handleErrorMsg(input, message, false);
}

function clearErrorMsg(input) {
	return handleErrorMsg(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showErrorMsg(input, message);
	}
	return clearErrorMsg(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showErrorMsg(input, invalidMsg);
	}
	return true;
}

function validatePhone(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate phone format, should be in 123-45-6789 format
	const phoneRegex = /^\d{3}[\-]\d{3}[\-]\d{4}$/;
	// \d{3}[\-]\d{3}[\-]\d{4}

	const phone = input.value.trim();
	if (!phoneRegex.test(phone)) {
		return showErrorMsg(input, invalidMsg);
	}
	return true;
}

function isRadioChecked(radios, requiredMsg) {
	for (let el of radios) {
		if (el.checked) {
			return clearErrorMsg(el.parentNode.parentNode);
		}
	}
	return showErrorMsg(radios[0].parentNode.parentNode, requiredMsg);
}

const validateForm = () => {
	const registerForm = $("register__form");
	const message = document.getElementsByClassName("message")[0];
	const locations = document.getElementsByName("location");
	const fName = $("first_name");
	const lName = $("last_name");
	const pNumber = $("phone");
	const email = $("email");

	const FNAME_REQUIRED = "Please enter your first name";
	const LNAME_REQUIRED = "Please enter your last name";
	const EMAIL_REQUIRED = "Please enter your email";
	const PHONE_REQUIRED = "Please enter your phone number";
  const LOCATION_REQUIRED = "Please choose location";
	const PHONE_INVALID = "Please enter correct phone format 123-456-7890";
	const EMAIL_INVALID = "Please enter correct email address format";

	registerForm.addEventListener("reset", function (event) {
		// remove red border for input fields and remove error messages
		const inputElements = registerForm.getElementsByTagName("input");
		let msg;
		for (let el of inputElements) {
			if (el.classList.contains("red")) {
				el.classList.remove("red");
				msg = el.parentNode.getElementsByClassName("error")[0];
				msg.innerText = "";
			}
		}
    // remove error message for locations radios
    const location = document.getElementsByClassName("location")[0];
    msg = location.parentNode.getElementsByClassName("error")[0];
    msg.innerText = "";
	});

	registerForm.addEventListener("submit", function (event) {
		// stop form submission
		event.preventDefault();

		// validate the form
		let fNameValid = hasValue(fName, FNAME_REQUIRED);
		let lNameValid = hasValue(lName, LNAME_REQUIRED);
		let phoneValid = validatePhone(pNumber, PHONE_REQUIRED, PHONE_INVALID);
		let emailValid = validateEmail(email, EMAIL_REQUIRED, EMAIL_INVALID);
		let locationChecked = isRadioChecked(locations, LOCATION_REQUIRED);

		// if valid, submit the form
		if (
			fNameValid &&
			lNameValid &&
			phoneValid &&
			emailValid &&
			locationChecked
		) {
			registerForm.classList.add("hide");
			message.classList.remove("hide");
		}
	});
};
