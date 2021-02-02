// $(document).ready(function() {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.email);
//   });
//   $.get("https://www.googleapis.com/books/v1/volumes?q=search+terms").then(function(data) {
//     console.log(data)
//   });
// });
$(document).ready(function () {

  var books = [];
  // the bookContainer is grabbing the div where all the books will be listed on the read list
  var bookContainer = $(".book-container");




  $("#submit").on("click", function (event) {
    event.preventDefault();

    var newBook = {
      title: $("#book").val(),
    };

    console.log(newBook.title);
    // after clicking, this should book should be added to the readlist

    var bookVal = newBook.title
    var openLibraryUrl = `http://openlibrary.org/search.json?title=${bookVal}&limit=10`

    // Send the POST request.
    $.ajax({
      url: openLibraryUrl,
      method: "GET"
    }).then(
      function (e) {
        console.log(e);
        for (let i = 0; i < e.docs.length; i++) {
          // console.log(e.docs[i].title)
          let x = "'" + JSON.stringify(e.docs[i]) + "'";
          // let x = `${JSON.stringify(e.docs[i])}`
          let a = `
            <li>
              <div>
                <h3>${e.docs[i].title}</h3>
                <h6>${e.docs[i].isbn[0]}</h6>
              </div>
              <button type="button" value=${x} class="readButton">Save to Reading List</button>
            </li>
          `
          $('.list-books').append(a)
        }
      }

    );

  });

  getBooks();

  // This function resets the books displayed with new books from the database
  function initializeRows() {
    // bookContainer.empty();
    // var rowsToAdd = [];
    // for (var i = 0; i < books.length; i++) {
    //   rowsToAdd.push(createNewRow(books[i]));
    // }
    // bookContainer.prepend(rowsToAdd);
  }

  $(document).on('click', '.readButton', function (req, res) {
    let b = $(this).val();
    var bookObj = JSON.parse(b)

    let newBook = {
      title: bookObj.title,
      author: bookObj.autor_name,
      isdn: bookObj.isbn
    }
    
    $.post("/api/add_book_readlist", newBook, () => res.status(200))
    // variables for title, auther, isbn
    // you get all information about the book user wants to save
    // use information to save data in MySQL
    // once book saved -- when you go to reading my book -- you see this book

  })

  // This function grabs books from the database and updates the view
  function getBooks() {
    $.get("/api/books", function (data) {
      books = data;
      initializeRows();
    });
  }

});




// Leave this alone... Its Materialize initiation code
$(document).ready(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function () {
    $('.sidenav').sidenav({
      edge: "right"
    });
    $('.parallax').parallax();
  })
  $.get("https://www.googleapis.com/books/v1/volumes?q=Robin+intitle").then(function (data) {
    console.log(data)
  });


});