const imgPath = "https://image.tmdb.org/t/p/w500/";

let terndingMovies = document.getElementById("terndingMovies");
let li = Array.from(document.querySelectorAll('.page li'));
console.log(li)

let currentPage = 1;




li.forEach(page => {
    page.addEventListener("click", function(e) {
        let pageNum = +this.innerHTML;
        getMovies(pageNum);
        
    });
})


async function getMovies(currentPage = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=c77b42d8cc9b89827857b9a06db77511&page=${currentPage}`
  );
  const data = await res.json();
  showMovies(data.results);
}

getMovies();

function showMovies(movies) {
  let temp = "";
  movies.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;
    let vote = vote_average.toFixed(1);
    let overviewContent = overview.split(" ").slice(0, 30).join(" ");
    temp += `
        <div class="col-lg-3 mb-4">
          <div class="movie shadow-sm">
            <img
              src='${imgPath + poster_path}'
              alt=""
              class=" img-fluid"
            />
            <div class="movie-info">
              <h3 class="title h5">${title}</h3>
              <span class="${getClassByRate(vote)}">${vote}</span>
            </div>
            <div class="movie-overview">
              <h3>Overview</h3>
              ${overviewContent}
            </div>
          </div>
        </div>
        `;
  });

  terndingMovies.innerHTML = temp;
}


function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return `orange`;
  } else {
    return "red";
  }
}
