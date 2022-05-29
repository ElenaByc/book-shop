document.addEventListener("DOMContentLoaded", validateForm());

function validateForm() {
	const date = document.getElementById("date");
	date.min = getCurrentDate();
}

function getCurrentDate() {
	let date = new Date();
	// Add a day
	date.setDate(date.getDate() + 1);
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
	].join("-");
}

function padTo2Digits(num) {
	return num.toString().padStart(2, "0");
}
