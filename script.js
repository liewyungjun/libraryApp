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

// function addBookToLibrary() {
//   let bookTitle = prompt("Add a book title!");
//   let bookAuthor = prompt("Add the book author!");
//   let bookLength = prompt("Add a book length!");
//   let bookRead = prompt("Have you read this book?");
//   let newBook = new Book(bookTitle, bookAuthor, bookLength, bookRead);
//   myLibrary.push(newBook);
//   return newBook;
// }

function createLibrary() {
  myLibrary.forEach((a) => {
    if (document.getElementById(a.title)) {
      return;
    }
    let container = document.createElement("div");
    container.setAttribute("id", "bookContainer");
    // let remove = document.createElement("div");

    let remove = document.createElement("img");
    remove.src = "./outline_close_black_24dp.png";
    remove.classList.add("removeButton");
    remove.setAttribute("data", `${a.title}`);
    let div = document.createElement("div");
    div.textContent = a.title;
    div.classList.add("book");
    div.setAttribute("id", a.title);
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);
    container.style.borderColor = `rgb(${R},${G},${B})`;
    container.addEventListener("mouseover", () => {
      remove.style.display = "block";
    });
    container.addEventListener("mouseleave", () => {
      remove.style.display = "none";
    });
    container.appendChild(remove);
    container.appendChild(div);
    remove.addEventListener("click", () => {
      // deleteBook();
      let index = myLibrary.indexOf(a);
      myLibrary.splice(index, 1);
      console.log(myLibrary);
      container.remove();
    });
    document.getElementById("libraryContainer").appendChild(container);
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function added() {
  let alreadyAdded = false;
  document.getElementById("myForm").style.display = "none";
  let newBook = document.forms["myForm"]["bookTitle"].value;
  if (!newBook) {
    alert("You didn't enter a book !");
    return;
  }
  myLibrary.forEach((a) => {
    if (a.title == newBook) {
      alert("You already have this book!");
      alreadyAdded = true;
      return;
    }
  });
  if (alreadyAdded) {
    return;
  }
  let newAuthor = document.forms["myForm"]["author"].value;
  let newLength = document.forms["myForm"]["length"].value;
  let newRead = document.forms["myForm"]["read"].value;
  let babi = new Book(newBook, newAuthor, newLength, newRead);
  myLibrary.push(babi);
  document.forms["myForm"]["bookTitle"].value = "";
  document.forms["myForm"]["author"].value = "";
  document.forms["myForm"]["length"].value = "";
  document.forms["myForm"]["read"].value = "";
  console.log(myLibrary);
  createLibrary();
  //document.getElementByName("myForm").reset();
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function deleteBook() {
  console.log(this);
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
// addButton.addEventListener("click", () => {
//   addBookToLibrary();
//   createLibrary();
// });
myLibrary.push(Hobbit);
myLibrary.push(StarWars);
createLibrary();
