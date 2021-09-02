const searchBook  = () =>{

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

//Error Handle function
    const errorShow = () =>{
      const errorMsg = document.getElementById('error-handle');
      errorMsg.innerHTML = `<h2 class="d-flex justify-content-center">please input a valid name</h2>`;
    }

    const noError = () => {
      const noErrorMsg = document.getElementById('error-handle');
      noErrorMsg.textContent = '';
    }
// Error checking
    
    if(searchText === ''){
      errorShow();
    }

    else{
      const url = `http://openlibrary.org/search.json?q=${searchText}`;
      fetch(url)
      .then(res => res.json())
      .then (data => displaySearchResult(data));
      noError();
    }

}
// Show result area
const displaySearchResult = (docs) =>{

    const searchResult = document.getElementById('book-search-result');
    searchResult.textContent = '';
    const booklist = docs.docs;

    booklist.forEach (doc =>{
      // const arrayLength = doc.length;
      const howManySearch = document.getElementById('show-search-result');
      howManySearch.innerHTML = `<h2 class="d-flex justify-content-center">your search result ${doc.length}</h2>`

        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = ` <div class="card d-flex align-items-center justify-content-center">
        <img class="d-flex align-items-center justify-content-center p-5 " src="http://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book Name :"${doc.title}"</h5>
          <p class="card-text"><small>Author:<b> ${doc.author_name}</b></small></p>
          <p class="card-text">First Publish : <b>${doc.publish_date[0]}</b></p>
          <p class="card-text">Publisher : <b>${doc.publisher[0]}</b></p>
         
        </div>
        
      </div>`;
      searchResult.appendChild(div);
    })
}