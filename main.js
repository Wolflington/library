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
    const list = document.querySelector("#book-list");
    list.innerHTML = '';

    //FOR EACH books in the library
    this.books.forEach((book, index) => {
        //CHECK IF the book is read or not
        const bookStatus = book.read ? 'Read' : 'Not Read';
        const bookInfo = `<p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${bookStatus}</p>
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
document.getElementById('book-list').addEventListener('click', function(e) {
    //IF the targeted class
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