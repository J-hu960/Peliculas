const ResultMovies = ({movies}) => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 mt-12 gap-4 mb-4">
    {movies.map(movie=>(
      <article className="flex flex-col items-center" key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.poster} alt="Poster de la pelicula" width={'250px'} />
      </article>
    ))}
  </div>

  )
}

const NoMovies = () => <h3 className="text-center mt-12 font-bold text-xl underline ">Empieza a Buscar Películas</h3>

export function Movies({movies}){
   

    return(
        movies ? ( 
           <ResultMovies movies={movies} />
         ):(
          <NoMovies />

         )
    )

}


//const hasMovies = movies.length>0
