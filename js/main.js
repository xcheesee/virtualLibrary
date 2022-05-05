let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function translateToCard(book, card) {
    let info = {}
    info.title = document.createElement('p')
    info.author = document.createElement('p')
    info.pages = document.createElement('p')
    info.readStatus = document.createElement('p')

    info.title.innerHTML = `Title: ${book.title}`
    info.author.innerHTML = `Author: ${book.author}`
    info.pages.innerHTML = `${book.pages} pages`
    info.readStatus.innerHTML = book.read? 'read' : 'not read'

    for(key in info) {
        //adds key name as class
        info[key].classList.add(key)
        card.appendChild(info[key])
    }

}

function addToHTML (book) {
  let bookCard = document.createElement('div');
  bookCard.classList.add("columnFlex", "card")
  translateToCard(book, bookCard);
  container.appendChild(bookCard)
}

function handleFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let addedBook = new Book(formProps.title, formProps.author, formProps.pages);
    addedBook.read = formProps.status == 'read' ? true : false;
    addBookToLibrary(addedBook);
    addToHTML(addedBook)
    form.classList.remove('showEle')
}

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false;
  }


  Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? 'read': 'not read yet'}`
  };

  const container = document.querySelector(".container")
  const form = document.querySelector(".formWrapper")
  const displayForm = document.getElementById("addBook")
  let bookForm = document.getElementById('bookForm')
  
  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
  theHobbit.read = true;

  const nameOfWind = new Book('The Name of Wind', 'Patrick Rothfuss', 506)
  nameOfWind.read = false

  bookForm.addEventListener('submit', handleFormData)
  displayForm.addEventListener('click', () => form.classList.add('showEle'))

  addBookToLibrary(theHobbit)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)
  addBookToLibrary(nameOfWind)

  for(book of myLibrary) {
    addToHTML(book)
  }