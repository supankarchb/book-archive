const searchBook  = () =>{

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('search-counter').textContent ='';
    document.getElementById('book-search-result').textContent ='';

//Error Handle function
    const errorShow = () =>{
      const errorMsg = document.getElementById('error-handle');
      errorMsg.innerHTML = `<h2 class="d-flex justify-content-center">No Result Found! Please input a valid name</h2>`;
    }
    const noError = () => {
      const noErrorMsg = document.getElementById('error-handle');
      noErrorMsg.textContent = '';
    }
// Error checking
    if(searchText === ''){
      errorShow();
      displaySearchResult('block');
    }

    else{
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
      fetch(url)
      .then(res => res.json())
      .then (data => displaySearchResult(data));
      errorShow('block');
      noError();

      const displaySearchResult = (docs) =>{

        const searchResult = document.getElementById('book-search-result');
        searchResult.textContent = '';
        const booklist = docs.docs;
        const totalSearchResult = () =>{
          const bookLength = booklist.length;
          const howManySearch = document.getElementById('search-counter');
          howManySearch.innerHTML = `<h2 class="d-flex justify-content-center bg-info text-light m-3">Your Search Result ${bookLength}</h2>`}
    
          booklist?.forEach (doc =>{
    
            totalSearchResult();
  
              const div = document.createElement('div');
              div.classList.add('col')
              div.innerHTML = ` <div class="card d-flex align-items-center justify-content-center">
              <img class="d-flex align-items-center justify-content-center p-2 " src="https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg" class="card-img-top">
              <div class="card-body">
                <p class="card-title"> <b>${doc.title}</b></p>
                <p class="card-text">Author : <small><i class="text-danger">${doc.author_name}</i></small></p>
                <p class="card-text">First Published : <b>${doc.first_publish_year}</b></p>
                <p class="card-text">Publisher : <b>${doc.publisher}</b></p>
              </div>
            </div>`;
            searchResult.appendChild(div);
          })     
    }
}
}