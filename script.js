let library = document.querySelector("#libraryContainer");
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
    container.style.backgroundColor = `rgb(${R},${G},${B})`;
    container.addEventListener("mouseover", () => {
      remove.style.display = "block";
    });
    container.addEventListener("mouseleave", () => {
      remove.style.display = "none";
    });
    let status = document.createElement("button");

    if (a.read == true) {
      status.classList.add("read");
      status.innerHTML = "Read";
    } else {
      status.classList.add("notRead");
      status.innerHTML = "Not Read";
    }
    status.classList.add("readIndicator");
    status.addEventListener("click", () => {
      status.classList.toggle("read");
      status.classList.toggle("notRead");
      if (status.classList.contains("read")) {
        a.read = true;
        status.innerHTML = "Read";
      } else if (status.classList.contains("notRead")) {
        a.read = false;
        status.innerHTML = "Not Read";
      }
    });
    container.appendChild(remove);
    container.appendChild(div);
    container.appendChild(status);
    remove.addEventListener("click", () => {
      // deleteBook();
      let data = remove.getAttribute("data");
      console.log(data);
      myLibrary = myLibrary.filter((boook) => boook.title != data);
      container.remove();
      console.log(myLibrary);
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
  let newReadStatus = document.forms["myForm"]["read"].value;
  let newRead = newReadStatus == "true";
  let babi = new Book(newBook, newAuthor, newLength, newRead);
  myLibrary.push(babi);
  document.forms["myForm"]["bookTitle"].value = "";
  document.forms["myForm"]["author"].value = "";
  document.forms["myForm"]["length"].value = "";
  document.forms["myForm"]["read"].value = "";
  createLibrary();
  //document.getElementByName("myForm").reset();
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function populateStorage() {
  localStorage.clear();
  let len = myLibrary.length;
  for (let i = 0; i < len; i++) {
    localStorage.setItem(`itemTitle ${i}`, myLibrary[i].title);
    localStorage.setItem(`itemAuthor ${i}`, myLibrary[i].author);
    localStorage.setItem(`itemLength ${i}`, myLibrary[i].pages);
    localStorage.setItem(`itemRead ${i}`, myLibrary[i].read);
  }
  alert("Saved!");
}
let myLibrary = [];
function obtainLocalStorage() {
  for (let i = 0; i < localStorage.length / 4; i++) {
    let x = new Book(
      localStorage.getItem(`itemTitle ${i}`),
      localStorage.getItem(`itemAuthor ${i}`),
      localStorage.getItem(`itemLength ${i}`),
      localStorage.getItem(`itemRead ${i}`)
    );
    myLibrary.push(x);
  }
}
if (localStorage.length == 0) {
  const Hobbit = new Book("The Hobbit", "J.R. Tolkien", "299 pages", true);
  const StarWars = new Book("Star Wars", "George Lucas", "3000 pages", false);
  myLibrary.push(Hobbit);
  myLibrary.push(StarWars);
} else {
  obtainLocalStorage();
}
createLibrary();
