function Book(title, author, page_count, have_read){
    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.have_read = have_read;
}
Book.prototype.info = function() {
    read_result = this.have_read ? "Have read this book." : "Have not read this book.";
    return `${this.title}, by ${this.author}, ${this.page_count} pages. ${read_result}`;
}

function loadDefaultBooks(){
    let b = new Book("Harry Potter", "J.K Rowling", 400, true);
    let x = new Book("The Art of War", "Sun Tzu", 100, false);
    let g = new Book("A Song of Ice and Fire", "George R.R. Martin", 800, true);
    let i = new Book("The Invisible Man", "H. G. Wells", 300, false);
    let s = new Book("The Song of Achilles", "Madeline Miller", 400, false);
    let book_arr = [b, x, g, i, s];
    loadBookStyling(book_arr);
}

function loadBookStyling(book_arr){
    book_arr.forEach(book => {
        let d = document.createElement("div")
        d.style.width = "50px";
        d.style.height = "100px";
        d.style.margin = "3px 1px 0px 1px"
        d.style.display = "flex";
        d.style.textAlign = "center";
        d.style.alignItems = "center";
        d.style.borderColor = "black";
        d.style.borderStyle = "solid";
        d.style.borderWidth = 1;
        d.style.fontSize = 11;
        d.textContent = book.title;
        document.getElementById("bookcase").appendChild(d);
    });
}

function openModal(modal){
    if (modal==null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal){
    if (modal==null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function newBook(){
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let length = document.querySelector("#book-length").value;
    let read = document.querySelector("#yes-btn").checked ? true : false;
    let d = document.createElement("div")
    d.style.width = "50px";
    d.style.height = "100px";
    d.style.margin = "3px 1px 0px 1px"
    d.style.display = "flex";
    d.style.textAlign = "center";
    d.style.alignItems = "center";
    d.style.borderColor = "black";
    d.style.borderStyle = "solid";
    d.style.borderWidth = 1;
    d.style.fontSize = 11;
    d.textContent = title;
    document.getElementById("bookcase").appendChild(d);
}

let openModalButtons = document.querySelectorAll('[data-modal-target]');
let closeModalButtons = document.querySelectorAll('[data-close-button]');
let overlay = document.getElementById('overlay');
let submit = document.querySelector("#book-submit");

submit.addEventListener('click', newBook());
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        let modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        let modal = button.closest(".modal");
        closeModal(modal);
    });
});

overlay.addEventListener('click', () => {
    let modals = document.querySelectorAll(".modal.active")
    modals.forEach(modal => {
        closeModal(modal);
    });
});
loadDefaultBooks();