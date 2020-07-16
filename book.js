function Book(title, author, page_count, have_read, book_index){
    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.have_read = have_read;
    this.book_index = book_index;
}
Book.prototype.info = function() {
    read_result = this.have_read ? "Have read this book." : "Have not read this book.";
    return `${this.title}, by ${this.author}, ${this.page_count} pages. ${read_result}`;
}

function Library(book_arr, book_index){
    this.book_arr = book_arr;
    this.book_index = book_index;
}
Library.prototype.bookReadout = function(){
    this.book_arr.forEach(book => {
        console.log(book.info());
    });
}
Library.prototype.addBook = function(book){
    this.book_arr.push(book);
}
function loadDefaultBooks(){
    let b = new Book("Harry Potter", "J.K Rowling", 400, true, 0);
    let x = new Book("The Art of War", "Sun Tzu", 100, false, 1);
    let g = new Book("A Song of Ice and Fire", "George R.R. Martin", 800, true, 2);
    main_lib.addBook(b);
    main_lib.addBook(x);
    main_lib.addBook(g);
    main_lib.book_arr.forEach(book => {
        let d = document.createElement("div");
        d.textContent = `Title: ${book.title}
                         Author: ${book.author}
                         Length: ${book.page_count}`;
        d.classList.add("book");
        d.id = "book" + book.book_index;
        main_lib.book_index++;
        d.addEventListener('contextmenu', function(ev) {
            ev.preventDefault();
            document.getElementById("bookcase").removeChild(d);
            let idx = book.book_index;
            main_lib.book_arr.splice(idx, 1);
            main_lib.book_index--;
            console.log(main_lib.book_arr);
            return false;
        });
        let b = document.createElement("button");
        if(book.have_read){b.textContent = "Read";}
        else{b.textContent = "Not read";}
        b.addEventListener('click', () => {
            if(b.textContent == "Read"){
                b.textContent = "Not read";
            }
            else if(b.textContent == "Not read"){
                b.textContent = "Read";
            }
        });
        d.appendChild(b);
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
    main_lib.addBook(new Book(title, author, length, read, main_lib.book_index));
    let d = document.createElement("div");
    d.textContent = `Title: ${title}
    Author: ${author}
    Length: ${length}`;
    d.classList.add("book");
    d.id = "book" + main_lib.book_index;
    main_lib.book_index++;
    d.addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
        document.getElementById("bookcase").removeChild(d);
        let idx = book.book_index;
        main_lib.book_arr.splice(idx, 1);
        main_lib.book_index--;
        console.log(main_lib.book_arr);
        return false;
    });
    let button = document.createElement("button");
    if(read){button.textContent = "Read";}
    else{button.textContent = "Not read";}
    button.addEventListener('click', () => {
        if(button.textContent == "Read"){
            button.textContent = "Not read";
        }
        else if(button.textContent == "Not read"){
            button.textContent = "Read";
        }
    });

    d.appendChild(button);
    document.getElementById("bookcase").appendChild(d);
    let modal = document.querySelector("#book-submit").closest('.modal');
    closeModal(modal);
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-length").value = "";
}

let openModalButtons = document.querySelectorAll('[data-modal-target]');
let closeModalButtons = document.querySelectorAll('[data-close-button]');
let overlay = document.getElementById('overlay');
let submit = document.querySelector("#book-submit");
let main_lib = new Library([], 0);
submit.addEventListener('click', newBook);

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