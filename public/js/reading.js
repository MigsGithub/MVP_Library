$(document).ready(function () {

    const reading_List = [
        {
            title: "Money",
            author_name: "Robin Williams",
            isbn: 3824981481730894,
            read: false
        },
        {
            title: "Mario",
            author_name: "Tobin Tilliams",
            isbn: 3423534563425325,
            read: true
        }
    ]

    $()

    // reading_List.map((data) => {
    //     let a = `
    //     <li>
    //       <div>
    //         <h3>${data.title}</h3>
    //         <h6>${data.author_name}</h6>
    //         <h6>${data.isbn}</h6>
    //       </div>
    //       <button type="button" class="removeButton">Remove</button>
    //     </li>
    //   `

    //   $("ul").append(a);

    // })
    
    reading_List.map((data) => {
      let a = `
      <div class="book__details">

<div class="book-details">
    <div class="book-details__left">
        <div class="book-details__cover">
            <img
                src="data:image/jpeg;base64,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">
        </div>
    </div>
    <div class="book-details__right">
        <h1 class="book-details__title readTitle ">${data.title}</h1>
        <h2 class="book-details__author readAuthor">${data.author_name}</h2>
        <div class="book-details__actions">
            <button>Add to list</button>
        </div>
    </div>
</div>

</div>
    `

    $("article").append(a);

  })







})