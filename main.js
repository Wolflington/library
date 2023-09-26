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

function updateBookStatus(element, book) {
    const statusElement = element.getElementById('status-span');
    statusElement.textContent = book.read;
}

// const toggleButton = document.querySelectorAll('.status-btn');
// toggleButton.forEach(function(button, index) {
//     const bookElement = button.parentElement;
//     const book = new Book(title, author, pages, read);

//     updateBookStatus(element, book);

//     button.addEventListener('click', function () {
//         book.changeStatus();
//         updateBookStatus(element, book);
//     });
// });

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

    //FOR EACH book in the library
    this.books.forEach((book, index) => {
        //CHECK IF the book is read or not
        let bookStatus = '';
            if (book.read === true) {
                bookStatus = 'Read';
            } else {
                bookStatus = 'In progress';
            }
        const bookInfo = `<h2>${book.title}</h2>
        <p>by ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Status: ${bookStatus}</p>
        <button class="delete" data-index="${index}">Delete</button>`;
        const bookItem = document.createElement('div');
        const statusBtn = document.createElement('button');
        statusBtn.textContent = bookStatus;
        statusBtn.addEventListener('click', () => {
            book.changeStatus();
            let bookStatus = '';
            if (book.read === true) {
                bookStatus = 'Read';
            } else {
                bookStatus = 'In progress';
            }
            statusBtn.textContent = bookStatus;
        });
        bookItem.classList.add('book-item');
        statusBtn.classList.add('status-btn');
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