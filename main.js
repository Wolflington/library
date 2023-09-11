const myLibrary = [];

function Book (title, author, numOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.readStatus}.`
}

function addBooksToLibrary () {
    //Get user input and print the content on the document
    //Push every THIS into myLibrary
    //Return the output
    myLibrary.push(theHobbit.title, theHobbit.author, theHobbit.numOfPages, theHobbit.readStatus); // Make sure that the objects are connected to the user input later
}

function displayBooks () {
    //FOR each objects in myLibrary
    myLibrary.forEach((books) => {
        //Target DOM element where the objects should be printed
        const display = document.querySelector(".display-books");
        //Print the objects with innerText
        console.log(books);
        display.innerText = myLibrary;
    });
}

const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", "295", "not yet read");

const AtomicHabits = new Book ("Atomic Habits", "James Clear", "288", "finished")

addBooksToLibrary();
displayBooks();
