class Book {
    constructor (
        title = "Title",
        author = "Author",
        pages = 0,
        read = false,
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//Library constructor
function Library () {
    this.books = [];
}

//Pushes the information to the library
Library.prototype.addBook = function (book) {
    this.books.push(book);
}

Library.prototype.displayBooks = function () {
    const list = document.querySelector(".main-container");
    list.innerHTML = '';

    //FOR EACH book in the library
    this.books.forEach((book, index) => {
        //CHECK IF the book is read or not
        const bookStatus = book.read ? 'Read' : 'In progress';
        const bookInfo = `<h2>${book.title}</h2>
        <p>by ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <button id = 'status-btn'>${bookStatus}</button>
        <button class="delete" data-index="${index}">Delete</button>`;
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = bookInfo;
        list.appendChild(bookItem);
    });
};

//Clear the input fields
Library.prototype.clearBooks = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
};

Library.prototype.changeStatus = function () {
    this.read = !this.read;
    if (this.read === true) {
        //ADD classList 'read' if true
        //DISPLAY TEXT on the website
        this.status.textContent = "Read";
    } else {
        //ADD classList 'not-read' if false
        //DISPLAY TEXT on the website
        this.status.textContent = "In progress";
    }
};

//ADD books using event listener
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    //Enter the UI to form inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    //create new Book constructor
    const book = new Book(title, author, pages, read);
    library.addBook(book);
    library.displayBooks();
    library.clearBooks();
});

//Event listeners for deleting a book
const mainContainer = document.querySelector('.main-container');
mainContainer.addEventListener('click', function(e) {
    //IF the targeted class CONTAINS 'DELETE'
    if (e.target.classList.contains('delete')) {
        //GET ATTRIBUTE of the targeted class's index
        const index = e.target.getAttribute('data-index');
        //SPLICE the library starting from index and remove 1 element
        library.books.splice(index, 1);
        //CALL displayBooks()
        library.displayBooks();
    };
});

//Create new Library instance
const library = new Library;

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

//DOM Elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#add-book");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector('#submit');

//Event Listener to open and close modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
submitBtn.addEventListener('click', closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
}); //Closes the modal when 'Esc' key is clicked 