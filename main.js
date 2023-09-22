class Book {
    constructor (
        title = "Title",
        author = "Author",
        pages = 0,
        read = false
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

    //FOR EACH books in the library
    this.books.forEach((book, index) => {
        //CHECK IF the book is read or not
        const bookStatus = book.read ? 'Yes' : 'In progress';
        const bookInfo = `<p class = "title-card">${book.title}</p>
        <p class = "author-card">by ${book.author}</p>
        <p class = "pages-card">Number of pages: ${book.pages}</p>
        <p class = "status-card">Completed: ${bookStatus}</p>
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

//ADD books using event listener
document.getElementById('book-form').addEventListener('submit', function(e) {
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
document.querySelector(".main-container").addEventListener('click', function(e) {
    //IF the targeted class CONTAINS 'DELETE'
    if (e.target.classList.contains('delete')) {
        //GET ATTRIBUTE of the targeted class
        const index = e.target.getAttribute('data-index');
        //SPLICE the library starting from index and remove 1 element
        library.books.splice(index, 1);
        //CALL displayBooks()
        library.displayBooks();
    };
});

//Create new Library instance
const library = new Library;

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#add-book");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector('#submit');

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

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