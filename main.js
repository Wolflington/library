class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

Book.prototype.changeStatus = function () {
    this.read = !this.read;
};

//Library constructor
function Library () {
    this.books = [];
}

//Pushes the information to the library
Library.prototype.addBook = function (book) {
    this.books.push(book);
};

Library.prototype.displayBooks = function () {
    const list = document.querySelector(".main-container");
    list.innerHTML = '';
    let bookStatus = '';

    //FOR EACH book in the library
    this.books.forEach((book, index) => {
        //CHECK IF the book is read or not
        let bookStatus = '';
        const statusBtn = document.createElement('button');

        function setBookStatus() {
            if (book.read === true) {
                bookStatus = 'Read';
                statusBtn.classList.add('read-color');
                statusBtn.classList.remove('progress-color');
            } else {
                bookStatus = 'In progress';
                statusBtn.classList.add('progress-color');
                statusBtn.classList.remove('read-color');
            }
            statusBtn.textContent = bookStatus;
        }
        setBookStatus();
        //Event Listener for status button
        statusBtn.addEventListener('click', () => {
            book.changeStatus();
            setBookStatus();
        });

        const bookInfo = `<h2>${book.title}</h2>
        <p>by ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <button class="delete" data-index="${index}">Delete</button>`;
        const bookItem = document.createElement('div');
        
        

        //book-item card
        bookItem.classList.add('book-item');
        //class for status button
        statusBtn.classList.add('status-btn');
        
        //Append all the contents to book-item card
        bookItem.innerHTML = bookInfo;
        list.appendChild(bookItem);
        bookItem.appendChild(statusBtn);
    });
};

//Clear the input fields
Library.prototype.clearBooks = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
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
const inputTitle = document.querySelector("#title");
const errorTitle = document.querySelector(".error-title");
const inputAuthor = document.querySelector("#author");
const errorAuthor = document.querySelector(".error-author");
const inputPages = document.querySelector("#pages");
const errorPage = document.querySelector(".error-page");
const form = document.querySelector("form");

//Event Listener to open and close modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
submitBtn.addEventListener('click', (e) => {
    let isValid = form.reportValidity();

    if (isValid) {
        closeModal();
    }
});
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
}); //Closes the modal when 'Esc' key is clicked 