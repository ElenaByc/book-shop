import { createElement, addNewElement, addNewImageElement } from "./elements-utils.js";

document.addEventListener("DOMContentLoaded", createBooksCatalogPage());
document.addEventListener("DOMContentLoaded", alertMsg());

function alertMsg() {
	const msg =
		"Hi! \nI am really sorry I was not able to finish this task on time. \nI had exams at my college past two weeks. \nCould you please check my work later? I would highly appreciate that! Thank you for understanding! \nRegards, \nElena";
	alert(msg);
}

function createBooksCatalogPage() {
	const body = document.getElementsByTagName("body")[0];
	const docFragment = document.createDocumentFragment();
	const contentWrapper = createElement("div", "content-wrapper");
	const header = createHeader();
	const main = createMain();
	const footer = createFooter();
	contentWrapper.appendChild(header);
	contentWrapper.appendChild(main);
	contentWrapper.appendChild(footer);
	docFragment.appendChild(contentWrapper);
	body.appendChild(docFragment);
}

function createHeader() {
	const header = createElement("header", "header");
	const div = createElement("div", "header__logo");
	const logo = createElement("div", "header__logo-img");
	const title = createElement("div", "header__title");
	addNewElement(title, "h1", [], "Books\u00A0Shop");
	addNewElement(title, "h3", [], "Read... So you never feel alone");
	div.appendChild(logo);
	div.appendChild(title);
	const bag = createElement("div", "header__bag");
	header.appendChild(div);
	header.appendChild(bag);
	return header;
}

function createMain() {
	const main = createElement("main", "main");
	const shoppingBag = createShoppingBag();
	const catalogSection = createCatalogSection();
	main.appendChild(shoppingBag);
	main.appendChild(catalogSection);
	return main;
}

function createShoppingBag() {
	//TODO: get current shopping bag from localStorage?
	const bag = createElement("aside", "shopping-bag");
	addNewElement(bag, "h3", [], "Your bag is empty");
	addNewElement(bag, "p", [], "Drop books here\nor add them by clicking\n'Add to Bag` button");
	return bag;
}

function createCatalogSection() {
	const section = createElement("section", "catalog");
	addNewElement(section, "h2", "catalog-header", "Books Catalog");
	addNewElement(section, "div", "title-line");
	section.appendChild(createBooksCards());
	return section;
}

function createBooksCards() {
	const container = createElement("div", "books-container");
	fetch("./scripts/books.json")
		.then((response) => {
			return response.json();
		})
		.then((books) => {
			books.forEach((book) => addBookCard(book, container));
		});
	return container;
}

function addBookCard(book, container) {
	const card = createElement("div", "book-card");
	addNewImageElement(card, "book-cover", book.image, book.title);
	addNewElement(card, "h4", "book-title", book.title);
	addNewElement(card, "h4", "book-author", book.author);
	addNewElement(card, "h4", "book-price", `Price: $${book.price}`);
	addNewElement(card, "div", "button", "Show more");
	addNewElement(card, "div", "button", "Add to bag");
	container.appendChild(card);
}

function createFooter() {
	const footer = createElement("footer", "footer");
	return footer;
}
