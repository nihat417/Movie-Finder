let searchBox = document.getElementById("searchinpt");
        let btn = document.getElementById("srchbtn");
        const wrapper = document.getElementById("wrapper");
        const pagination = document.getElementById("pagination");
        const field = ["Title", "Type", "Year", "imdbID"];


        let currentPage = 1;
        let totalPages = 0;

        function loadMovies(searchTerm,page) {
            const apikey = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=abfc33ca`;
            fetch(apikey)
                .then(resp => resp.json())
                .then(data => {
                    if (data.Response === "True") {
                        displayMovie(data.Search);
                        totalPages = Math.ceil(data.totalResults / 10);
                        displayPagination();
                    } else {
                        console.log(data.Error);
                    }
                })
        }

        function findMovie() {
            let searchWord = searchBox.value;
            loadMovies(searchWord);
        }

        //cedvel formasi

        //function displayMovie(movies) {
        //    let kod = '';
        //    kod += `<tr>${field.reduce((k, f) => k += `<th>${f}</th>`, '')}</tr>`;
        //    movies.forEach(movie => {
        //        kod += `<tr>${field.reduce((k, f) => k += `<td>${movie[f]}</td>`, '')}</tr>`;
        //    });
        //    wrapper.innerHTML = `<table class="table table-hover">${kod}</table>`;
        //}


        function displayMovie(movies) {
            let kod = '';
           movies.forEach(movie=> {
                kod +=`<div class="card m-1" style="width: 18rem;">
                            <img src="${movie.Poster}" class="card-img-top" alt="no photo">
                            <div class="card-body">
                              <h5 class="card-title">${movie.Title}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                ${field.slice(1).reduce((k, f) => k += `<li class="list-group-item"><b>${f}: </b>${movie[f]}</li>`, '')}
                                <button class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#modal-${movie.imdbID}">Show Details</button>
                            </ul>
                        </div>`,
                
                kod += `<div class="modal fade" id="modal-${movie.imdbID}" tabindex="-1" aria-labelledby="modal-${movie.imdbID}-label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal-${movie.imdbID}-label">${movie.Title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img src="${movie.Poster}" class="img-fluid mb-3" alt="no photo">
                                <ul>
                                    ${field.reduce((k, f) => k += `<li><b>${f}: </b>${movie[f]}</li>`, '')}
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`;
           })
           wrapper.innerHTML = `<div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center mx-2">${kod}</div>`
        }

        function displayPagination() {
            let kod = '';
            for (let i = 1; i <= totalPages; i++) {
                kod += `<button class="btn btn-dark mx-1" onclick="goToPage(${i})">${i}</button>`;
            }
            pagination.innerHTML = kod;
        }

        function goToPage(page) {
            currentPage = page;
            let searchWord = searchBox.value;
            loadMovies(searchWord, currentPage);
        }