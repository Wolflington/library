const myLibrary = [];

function Book (title, author, numOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
}

//Pushes the information to the library
Book.prototype.add = function () {
    myLibrary.push(this.title, this.author, this.numOfPages, this.readStatus);
}


function addBooksToLibrary () {
    // //Get user input and print the content on the document
    // //Push every input into myLibrary
    // const getTitle = prompt("Book Title", '');
    // const getAuthor = prompt("Author of the Book", '');
    // const getNumOfPages = prompt('Number of Pages', '');
    // const getReadStatus = prompt('Read/Not Yet Read', '');

    // myLibrary.push(getTitle, getAuthor, getNumOfPages, getReadStatus);
    // console.log(myLibrary);

    // console.log(typeof myLibrary === 'object');

    // myLibrary.push(theHobbit.title, theHobbit.author, theHobbit.numOfPages, theHobbit.readStatus);

}

const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", "295", "not yet read");

const AtomicHabits = new Book ("Atomic Habits", "James Clear", "288", "finished")

theHobbit.add();
AtomicHabits.add();

console.log(myLibrary);

function displayBooks () {
    //FOR each objects in myLibrary
    for (i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
        //Target the DOM Element where the library will be printed
        const displayTitle = document.querySelector(".title");
        //Print the objects with innerText
        displayTitle.textContent = myLibrary;
    }
    
}

addBooksToLibrary();
displayBooks();