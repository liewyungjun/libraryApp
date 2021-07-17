let library = document.querySelector("#libraryContainer");
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} long, ${read}`;
  };
}

function addBookToLibrary() {
  let bookTitle = prompt("Add a book title!");
  let bookAuthor = prompt("Add the book author!");
  let bookLength = prompt("Add a book length!");
  let bookRead = prompt("Have you read this book?");
  let newBook = new Book(bookTitle, bookAuthor, bookLength, bookRead);
  myLibrary.push(newBook);
  return newBook;
}

function createLibrary() {
  myLibrary.forEach((a) => {
    let div = document.createElement("div");
    div.textContent = a.title;
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);
    div.style.border = "solid";
    div.style.borderColor = `rgb(${R},${G},${B})`;
    div.style.padding = "20px";
    document.getElementById("libraryContainer").appendChild(div);
  });
}
const Hobbit = new Book(
  "The Hobbit",
  "J.R. Tolkien",
  "299 pages",
  "not read yet"
);
const StarWars = new Book(
  "Star Wars",
  "George Lucas",
  "3000 pages",
  "not read yet"
);
let addButton = document.querySelector("#addButton");
addButton.addEventListener("click", () => {
  addBookToLibrary();
  ///
});
myLibrary.push(Hobbit);
myLibrary.push(StarWars);
createLibrary();
