import {
	createElement,
	createElementWithId,
	addNewElement,
	addNewImageElement,
	addNewButton,
	addNewElementWithAction,
} from "./elements-utils.js";

const booksArray = [];
const bagArray = [];
const countArray = [];
let id = 0;

document.addEventListener("DOMContentLoaded", createBooksCatalogPage());

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
	addNewElement(title, "h1", "", "Books\u00A0Shop");
	addNewElement(title, "h3", "", "Read... So you never feel alone");
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
	const popup = createPopupWindow();
	main.appendChild(shoppingBag);
	main.appendChild(catalogSection);
	addNewElementWithAction(main, "div", "popup-shadow", togglePopup);
	main.appendChild(popup);
	return main;
}

function createShoppingBag() {
	//TODO: get current shopping bag from localStorage?
	const bag = createElement("aside", "shopping-bag");
	addNewElement(bag, "h3", "", "Your bag is empty");
	addNewElement(bag, "p", "", "Drop books here\nor add them by clicking\n'Add to Bag` button");
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
	book.id = id;
	booksArray.push(book);
	const card = createElementWithId("div", "book-card", id);
	addNewImageElement(card, "book-cover", book.image, book.title);
	addNewElement(card, "h4", "book-title", book.title);
	addNewElement(card, "h4", "book-author", book.author);
	addNewElement(card, "h4", "book-price", `Price: <span>$${book.price}</span>`);
	addNewButton(card, "Show more", togglePopup);
	addNewButton(card, "Add to bag", addToBag);
	container.appendChild(card);
	id++;
}

function createPopupWindow() {
	const popup = createElement("div", "popup");
	addNewElement(popup, "div", "popup__img");
	const content = createElement("div", "popup__content");
	addNewElement(content, "h2", "popup__title", "Title");
	addNewElement(content, "h3", "popup__author", "Author");
	addNewElement(content, "p", "popup__description", "Description");
	addNewElement(content, "h3", "popup__price", "Price");
	popup.appendChild(content);
	addNewElementWithAction(popup, "div", "close", togglePopup);
	return popup;
}

function createFooter() {
	const footer = createElement("footer", "footer");
	return footer;
}

function togglePopup(event) {
	const clickedCard = event.target.closest(".book-card");
	const popup = document.getElementsByClassName("popup")[0];
	const popupShadow = document.getElementsByClassName("popup-shadow")[0];
	if (clickedCard) {
		let book = booksArray.find((el) => el.id === Number(clickedCard.id));
		let img = popup.getElementsByClassName("popup__img")[0];
		img.style.backgroundImage = `url(./assets/images/${book.image})`;
		let title = popup.getElementsByClassName("popup__title")[0];
		title.innerHTML = book.title;
		let author = popup.getElementsByClassName("popup__author")[0];
		author.innerHTML = book.author;
		let description = popup.getElementsByClassName("popup__description")[0];
		description.innerHTML = book.description;
		let price = popup.getElementsByClassName("popup__price")[0];
		price.innerHTML = `Price: <span>$${book.price}</span>`;
	}
	popup.classList.toggle("open");
	popupShadow.classList.toggle("active");
}

function addToBag(event) {
	const clickedCard = event.target.closest(".book-card");
	if (clickedCard) {
		let book = booksArray.find((el) => el.id === Number(clickedCard.id));
		bagArray.push(book);
		console.log(bagArray);
		displayShoppingBag();
	}
}

function displayShoppingBag() {
	const bag = document.getElementsByClassName("shopping-bag")[0];
	let total = 0;
	bag.innerHTML = "";
	bagArray.forEach((book) => {
    addItemToBag(book, bag);
    total += Number(book.price);
  });
	addNewElement(bag, "div", "line");
	let totalDiv = createElement("div", "total");
	addNewElement(totalDiv, "h4", "", "Order total:");
	addNewElement(totalDiv, "h4", "item__price", `$${total}.00`);
	bag.appendChild(totalDiv);
  const checkout_btn = createElement("a", "button", "Confirm order");
  checkout_btn.setAttribute("href", "./checkout.html");
  bag.appendChild(checkout_btn);
}

function addItemToBag(book, bag) {
	const bookDiv = createElement("div", "shopping-bag__item");
	addNewImageElement(bookDiv, "item__img", book.image, book.title);
  const titleAndAuthor = createElement("div", "item__title-author");
  addNewElement(titleAndAuthor, "h4", "item__title", book.title);
  addNewElement(titleAndAuthor, "h4", "item__author", book.author);
  bookDiv.appendChild(titleAndAuthor);
  addNewElement(bookDiv, "h4", "item__price", `$${book.price}`);
  addNewElement(bookDiv, "div", "remove");
	bag.appendChild(bookDiv);
}

