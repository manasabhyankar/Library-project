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
let b = new Book("Harry Potter", "J.K Rowling", 400, true);
console.log(b.info());