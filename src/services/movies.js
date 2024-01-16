
const searchMovies = async({search}) => {
  if(search==='') return 

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=9fb05f66&s=${search}`);
    const json = await response.json();

    if (json.Response === 'False') {
      // The API responded with an error, handle it accordingly
      throw new Error(json.Error || 'No movies found');
      
    }

    const movies = json.Search || [];
    const mappedMovies = movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
    mappedMovies.sort((a,b)=>b.year-a.year)
    return mappedMovies
  } catch (error) {
    throw new Error('Error fetching movies from OMDB API: ' + error.message);
  }


    

  
}

export default searchMovies