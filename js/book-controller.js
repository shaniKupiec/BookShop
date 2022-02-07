"use strict";

var gSort = { txt: false, price: false };

function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTMLs = `<table class="books-table">`;
  strHTMLs += `<tr>
                <th>Id</th>
                <th class="click-on" onclick="onSort('txt')">Title</th>
                <th class="click-on" onclick="onSort('price')">Price</th>
                <th colspan="3">Actions</th>
                </tr>`;
  var middleHtml = books.map(
    (book) =>
      `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$ </td>
        <td> <button class="btn readBookBtn" onclick="onReadBook('${book.id}')">Read</button> </td>
        <td> <button class="btn updateBookBtn" onclick="onUpdateBook('${book.id}')">Update</button> </td>
        <td> <button class="btn deleteBookBtn" onclick="onDeleteBook('${book.id}')">Delete</button> </td>
      </tr>`
  );
  strHTMLs += middleHtml.join("");
  strHTMLs += `</table>`;

  document.querySelector(".books-table").innerHTML = strHTMLs;
}

function onDeleteBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function openInput() {
  var elInput = document.querySelector(".add-book-area");
  elInput.style.display = "block";
}

function onAddBook() {
  var elName = document.querySelector("[name=book-name]");
  var elPrice = document.querySelector("[name=price]");
  var name = elName.value;
  var price = elPrice.value;
  elName.value = "";
  elPrice.value = "";
  if (!name || !price || price.match(/^[0-9]+$/) === null) return;

  var elInput = document.querySelector(".add-book-area");
  elInput.style.display = "none";

  addBook(name, price);
  renderBooks();
}

function onUpdateBook(bookId) {
  var newPrice = prompt("enter new price");
  if (newPrice.match(/^[0-9]+$/) === null) return;
  updateBook(bookId, newPrice);
  renderBooks();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  renderModal(book);
  var elModal = document.querySelector(".modal");
  elModal.classList.toggle("show");
}

function closeModal() {
  var elModal = document.querySelector(".modal");
  elModal.classList.toggle("show");
}

function renderModal(book) {
  var strHTMLs = ` <div class="book-name">${book.name}</div>
  <button class="close-modal" onclick="closeModal()">X</button>
  <div class="flex-container">
  <img src="${book.imgUrl}" />
  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aut
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
  <section class="btns">
    <button class="down" onclick="changeRating(-1, '${book.id}')">-</button>
    <span class="show-rating">${book.rating}</span>
    <button class="up" onclick="changeRating(1, '${book.id}')">+</button>
  </section>`;
  document.querySelector(".modal").innerHTML = strHTMLs;
}

function changeRating(value, bookId) {
  var elRating = document.querySelector(".show-rating");
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
  setNextPage(isForword)
  renderBooks()
}