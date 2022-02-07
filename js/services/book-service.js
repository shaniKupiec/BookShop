"use strict";

const STORAGE_KEY = "booksDB";
var gBooks;
const PAGE_SIZE = 2
var gPageIdx = 1
_createBooks();

function setNextPage(isForword) {
  isForword ? gPageIdx++ : gPageIdx--
  if ((gPageIdx - 1) * PAGE_SIZE >= gBooks.length) {
    console.log('cant move forword');
    console.log('turning red');
    var elNextBtn = document.querySelector('.next-page')
    elNextBtn.classList.add('disable-btn')
    gPageIdx--
    return
  } else if (!gPageIdx){
    console.log('second condtions');
    var elBackBtn = document.querySelector('.back-page')
    elBackBtn.classList.add('disable-btn')
    gPageIdx++
    return
  }
  var elBackBtn = document.querySelector('.back-page')
  elBackBtn.classList.remove('disable-btn')
  var elNextBtn = document.querySelector('.next-page')
  elNextBtn.classList.remove('disable-btn')
  console.log('gPageIdx',gPageIdx);
}

function _createBooks() {
  gBooks = loadFromStorage(STORAGE_KEY);
  if (!gBooks || !gBooks.length) {
    gBooks = [
      _createBook("harry Potter"),
      _createBook("Secret"),
      _createBook("The Way To The Moon"),
      _createBook("Sagi"),
      _createBook("about love"),
    ];
    _saveBooksToStorage();
  }
}

function _createBook(
  name,
  price = _makePrice(),
  imgUrl = "img/harryPotter.jpg"
) {
  return {
    id: _makeId(),
    name,
    price,
    imgUrl,
    rating: 0,
  };
}

function getBooksForDisplay() {
  console.log('gBooks',gBooks);
  var books = []
  var indexStart = (gPageIdx - 1) * PAGE_SIZE
  var indexEnd = gPageIdx * PAGE_SIZE
  console.log('indexStart',indexStart);
  console.log('indexEnd',indexEnd);
  for (var i = indexStart; i < indexEnd && i >= 0 && i < gBooks.length; i++) {
    console.log('i', i)
    books.push(gBooks[i])
  }
  console.log('books',books);
  return books
}

function getBookById(bookId) {
  return gBooks.find((book) => book.id === bookId);
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex((book) => book.id === bookId);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function addBook(name, price) {
  var newBook = _createBook(name, price);
  gBooks.push(newBook);
  _saveBooksToStorage();
}

function updateBook(bookId, bookPrice) {
  var book = getBookById(bookId);
  book.price = bookPrice;
  _saveBooksToStorage();
}

function updateRating(bookId, rating) {
  var book = getBookById(bookId);
  book.rating = rating;
  _saveBooksToStorage();
}

function setSort(sortBy, isDescending) {
  gBooks =
    sortBy === "txt" ? sortByText(isDescending) : sortByPrice(isDescending);
}

// function getTodosForDisplay() {
//     var todos = [];
//     console.log('todos', todos);
//     if (gFilterBy === 'ALL') todos = gTodos
//     else {
//         todos = gTodos.filter(todo =>
//             todo.isDone && gFilterBy === 'DONE' ||
//             !todo.isDone && gFilterBy === 'ACTIVE'
//         )
//     }
//     console.log('todos', todos);
//     if (!gSortBy || !todos.length) return todos
//     switch (gSortBy.category) {
//         case 'AB':
//             todos = sortByAB(todos, gSortBy.sortBy === 'A-Z')
//         case 'TIME':
//             todos = sortByTime(todos, gSortBy.sortBy === 'RECENT')
//         case 'IMP':
//             todos = sortByImp(todos, gSortBy.sortBy === 'IMPORTANT')
//     }
//     return todos
// }

function sortByText(isDec) {
  return gBooks.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if ((nameA < nameB && !isDec) || (nameA > nameB && isDec)) return -1;
    if ((nameA > nameB && !isDec) || (nameA < nameB && isDec)) return 1;
    return 0;
  });
}

function sortByPrice(isDec) {
  return gBooks.sort(function (a, b) {
    return isDec ? b.price - a.price : a.price - b.price;
  });
}

function _makeId(length = 3) {
  var txt = "";
  var possible = "0123456789";
  // var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _makePrice(min = 5, max = 40) {
  return getRandomInt(min, max);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}