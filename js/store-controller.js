"use strict";

$(document).ready(onInit);
var gSort = { txt: false, price: false, rating: false };
var gCurrBookId;

function onInit() {
  renderBooks();

  // createTodos();
  doTrans();
  // render();
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTMLs = `<tbody id="render-here">`;
  var middleHtml = books.map(
    (book) =>
      `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price} <span data-trans="currency"></span></td>
        <td>${book.rating}</td>
        <td> <button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')" data-trans="read">Read</button> </td>
        <td> <button type="button" class="btn btn-warning" onclick="openInputPrice('${book.id}')" data-trans="update">Update</button> </td>
        <td> <button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')" data-trans="delete">Delete</button> </td>
      </tr>`
  );
  strHTMLs += middleHtml.join("");
  strHTMLs += `</tbody>`;

  document.querySelector("#render-here").innerHTML = strHTMLs;
  doTrans();
}

function onDeleteBook(bookId) {
  // add sure part
  removeBook(bookId);
  renderBooks();
}

function openInputBook() {
  var elInputs = document.querySelector("#add-book-area");
  elInputs.classList.toggle("position-absolute");
}

function onAddBook() {
  var elName = document.querySelector("[name=book-name]");
  var elPrice = document.querySelector("[name=price]");
  var name = elName.value;
  var price = elPrice.value;
  elName.value = "";
  elPrice.value = "";
  if (!name || !price || price.match(/^[0-9]+$/) === null) return;

  var elInputs = document.querySelector("#add-book-area");
  elInputs.classList.remove("position-absolute");

  addBook(name, price);
  renderBooks();
}

function openInputPrice(bookId) {
  gCurrBookId = bookId;
  var elInputs = document.querySelector("#add-price-area");
  elInputs.classList.toggle("position-absolute");
}

function onUpdateBook() {
  var elNewPrice = document.querySelector("[name=book-new-price]");
  var newPrice = elNewPrice.value;
  elNewPrice.value = "";
  if (newPrice.match(/^[0-9]+$/) === null) return;
  updateBook(gCurrBookId, newPrice);
  renderBooks();
  var elInputs = document.querySelector("#add-price-area");
  elInputs.classList.remove("position-absolute");
}

function onSetLang(lang) {
  console.log("lang", lang);
  setLang(lang);
  if (lang === "he") document.body.classList.add("rtl");
  else document.body.classList.remove("rtl");
  doTrans();
  // render();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  renderModal(book);
  // var elModal = document.querySelector("#modal");
  // elModal.classList.toggle("position-absolute");
}

function closeModal() {
  var elModal = document.querySelector("#modal");
  elModal.innerHTML = `<section id="modal"> </section> `
  renderBooks()
}

function renderModal(book) {
  var strHTMLs = ` <section class="container position-absolute w-75 p-3 d-flex flex-column" id="modal" style="right:20%; top:15%;background-color: bisque;">
  <div class="p-1 flex-grow-1 d-flex flex-row justify-content-between">
    <span></span>
    <span> ${book.name} </span>
    <button class="" onclick="closeModal()">X</button>
  </div>
  <div class="flex-grow-5 d-flex flex-row justify-content-center align-items-center">
    <img class="flex-grow-1 col-sm-5" src="img/harryPotter.jpg" style="object-fit: contain;"/>
    <p class="flex-grow-1 col-sm-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aut
    dignissimos voluptatum, minima qui est. Adipisci dolores quas
    quisquam! Nostrum dicta adipisci culpa excepturi atque veniam error.
    Amet, quia eos. Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Mollitia aut dignissimos voluptatum, minima qui est. Adipisci
    dolores quas quisquam! Nostrum dicta adipisci culpa excepturi atque
    veniam error. Amet, quia eos. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Mollitia aut dignissimos voluptatum, minima qui est.
    Adipisci dolores quas quisquam! Nostrum dicta adipisci culpa excepturi
    atque veniam error. Amet, quia eos. </p>
  </div>
  <section class="p-1 flex-grow-1 d-flex justify-content-center">
    <button class="" onclick="changeRating(-1, '${book.id}')">-</button>
    <span id="show-rating">${book.rating}</span>
    <button class="" onclick="changeRating(1, '${book.id}')">+</button>
  </section>
</section>`;
  document.querySelector("#modal").innerHTML = strHTMLs;
}

function changeRating(value, bookId) {
  var elRating = document.querySelector("#show-rating");
  var newRating = +elRating.innerText + value;
  if (newRating === -1 || newRating === 11) return;
  elRating.innerText = newRating;
  updateRating(bookId, newRating);
}

function onSort(sortBy) {
  console.log("Sorting By:", sortBy);
  setSort(sortBy, gSort[sortBy]);
  renderBooks();
  gSort[sortBy] = !gSort[sortBy];
}

function onNextPage(isForword) {
  setNextPage(isForword);
  renderBooks();
}
