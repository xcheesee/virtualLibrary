let myLibrary = [];
let bookIndex = 0;

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function handleFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let addedBook = new Book(formProps.title, formProps.author, formProps.pages);
    while(true) {
        if(addedBook.title.length > 1) {
            break;
        }
        return;
    }
    addedBook.read = formProps.status == 'read' ? true : false;
    addBookToLibrary(addedBook);
    addToHTML(addedBook)
    form.classList.remove('showEle');
    //clear form data at submit
    e.target.reset();
}

function translateToCard(book, card) {
    //created object to go through later
    let info = {}

    info.title = document.createElement('p')
    info.author = document.createElement('p')
    info.pages = document.createElement('p')
    info.readStatus = document.createElement('p')
    info.deleteBtn = document.createElement('button')
    info.deleteBtn.addEventListener('click', deleteEntry)
    info.readStatus.addEventListener('click', setReadState)

    info.title.innerHTML = `${book.title}`
    info.author.innerHTML = `Author: ${book.author}`
    info.pages.innerHTML = `${book.pages} pages`
    info.readStatus.innerHTML = book.read? 'read' : 'not read'
    info.deleteBtn.innerHTML = 'Delete entry'

    for(key in info) {
        //adds key name as class
        info[key].classList.add(key)
        //adds all created elements to card
        card.appendChild(info[key])
    }

    info.readStatus.classList.add(book.read? 'read' : 'notRead')

}



function addToHTML (book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add("columnFlex", "card", book.index)
    translateToCard(book, bookCard);
    container.appendChild(bookCard)
}

function deleteEntry(e) {
    parentVal = e.composedPath()[1]
    currBook = myLibrary.findIndex(i => i.index === parentVal.classList[2]);
    container.removeChild(parentVal)
    myLibrary.splice(currBook, 1);
}

function setReadState(e) {
    directParentDiv = e.composedPath()[1];
    currBook = myLibrary[myLibrary.findIndex(i => i.index === directParentDiv.classList[2])];
    currBook.toggleRead();
    readStatusDiv = e.composedPath()[0];
    //if is (not)read, remove (read)not
    readStatusDiv.classList.remove(currBook.read? 'notRead' : 'read')
    //changes text and style based on current status
    readStatusDiv.innerHTML = currBook.read? 'read' : 'not read';
    readStatusDiv.classList.add(currBook.read? 'read' : 'notRead')
}

// class Book {
//     constructor(title, author, pages) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = false;
//         //distinct book id
//         bookIndex += 1;
//         this.index = `book${bookIndex}`;
//     }
//     info() {
//         return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
//     }
//     toggleRead() {
//         this.read ? this.read = false : this.read = true;
//     }
// }

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
        bookIndex++
        this.index = `book${bookIndex}`;
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? 'read': 'not read yet'}`
    }

    toggleRead() {
        this.read? this.read = false : this.read = true;
    }
}



    
const container = document.querySelector(".container")
const form = document.querySelector(".formWrapper")
const displayForm = document.getElementById("addBook")
let bookForm = document.getElementById('bookForm')

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
theHobbit.read = true;

const nameOfWind = new Book('The Name of Wind', 'Patrick Rothfuss', 506)
nameOfWind.read = false


addBookToLibrary(theHobbit)
addBookToLibrary(nameOfWind)

for(book of myLibrary) {
    addToHTML(book)
}

bookForm.addEventListener('submit', handleFormData)
displayForm.addEventListener('click', () => form.classList.add('showEle'))
