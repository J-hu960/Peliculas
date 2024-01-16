import results from '../mocks/results.json'
import searchMovies from '../services/movies'
import { useRef, useState,useCallback  } from 'react'
//useCalback utiliza useMemo, sirven para lo mismo pero con sintaxis simplificada.
export  function useMovies({search}){
  const [responseMovies,setResponseMovies] = useState()
  const [loading,setLoading] = useState(false)
  const [errorSearch,setErrorSearch] = useState(false)
  const previousSearch = useRef(search)
  const getMovies = useCallback(async ({search}) => { 
    if (search === previousSearch.current) return;
  
    try {
      previousSearch.current = search;
      const newMovies = await searchMovies({search});
      setResponseMovies(newMovies);
    } catch (error) {
      setErrorSearch(error.message);
    } finally {
      setErrorSearch(false);
    }
  }, []);  
  
    return {responseMovies,getMovies,loading,errorSearch}
  
  }