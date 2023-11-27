document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    bookSearchtool(searchTerm);
});
// Listener for the press of the search button

// GPT PROMT: Create a JavaScript function to execute a search using an external API, handling both success and failure cases.

// Search for books using the Google Books API.
function bookSearchtool(searchTerm) {
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            booksDisplay(data.items);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            alert('Error fetching data');
        });
}
// GPT Prompt: Make a JavaScript function that accepts an array of book objects and renders them in the DOM, including picture links and author information.
// A helper function for making a book element.
function booksDisplay(books) {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';

    books.forEach(book => {
        const bookInfo = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publisher: book.volumeInfo.publisher,
            publishedDate: book.volumeInfo.publishedDate,
            imageLinks: book.volumeInfo.imageLinks
        };

        const thumbnail = bookInfo.imageLinks?.thumbnail || 'path/to/default/image.jpg'; // Fallback to default image

        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="${bookInfo.title}" class="book-cover">
            <h3 class="book-title">${bookInfo.title}</h3>
            <p class="book-author">Author: ${bookInfo.authors?.join(', ')}</p>
            <button class="details-button" onclick="toggleDetails(this)">Show Details</button>
            <button class="add-button" onclick='addToBookshelf(${JSON.stringify(bookInfo)})'>Add to Bookshelf</button>
            <div class="details">
                <p>Publisher: ${bookInfo.publisher}</p>
                <p>Published Date: ${bookInfo.publishedDate}</p>
            </div>
        `;
        booksList.appendChild(bookElement);
    });
}

// GPT Prompt: Demonstrate how to write a JavaScript function that toggles the visibility of an element's information in an HTML page.
// Toggles the visibility of book information.

function toggleDetails(button) {
    // Find the nearest parent element with the 'book-item' class.
    const bookItem = button.closest('.book-item');

    // Find the details div within this book item.
    const details = bookItem.querySelector('.details');

    // Toggle the information display.
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'Show Details';
    }
}

// GPT Prompt: Describe a JavaScript function that adds a selected item to a list based on local storage and adjusts the display accordingly.
// Adds a book to the bookshelf and stores it in local storage.
function addToBookshelf(book) {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    displayBookshelf();
}
// GPT Prompt: How can I create a JavaScript function that removes an item from a list in local storage and then updates the display?
// This function is used to remove a book from the bookshelf.
function removeFromBookshelf(index) {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.splice(index, 1);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    displayBookshelf();
}
// A function that displays books in search results.
function displayBookshelf() {
    const bookshelfList = document.getElementById('bookshelfList');
    bookshelfList.innerHTML = '';
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
// A helper method for adding a book element to the bookshelf.
    bookshelf.forEach((book, index) => {
        const thumbnail = book.imageLinks?.thumbnail || 'path/to/default/image.jpg'; 
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="${book.title}" class="book-cover">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Author: ${book.authors?.join(', ')}</p>
            <button class="details-button" onclick="toggleDetails(this)">Show Details</button>
            <button class="remove-button" onclick="removeFromBookshelf(${index})">Remove from Bookshelf</button>
            <div class="details">
                <p>Publisher: ${book.publisher}</p>
                <p>Published Date: ${book.publishedDate}</p>
            </div>
        `;
        bookshelfList.appendChild(bookElement);
    });
}
// GPT Prompt: Give an example of a JavaScript function that loads and displays data from local storage on page load.
// On page load, this function loads and displays the bookshelf.
function loadBookshelf() {
    displayBookshelf();
}

document.addEventListener('DOMContentLoaded', loadBookshelf);
