import { useState,useEffect,useRef ,useCallback} from 'react'
import {Movies} from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
//const api=`http://www.omdbapi.com/?apikey=9fb05f66&s=${search}`


function useSearch(){
  const [search,updateSearch]=useState('')
  const [error,setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current = search ===''
      return
    }
    if(search.length<3){
      setError(true)
      return
    }else{
      setError(false)
    }
   },[search])
   return {search,updateSearch,error}
}

function App() {
  const {search,updateSearch,error}=useSearch()
  const {responseMovies,getMovies,loading} = useMovies({search})
  
  const debouncedGetMovies = useCallback(
  debounce(search=>{
     getMovies({search})

 },300)
 ,[getMovies]
 )

 const handleChange =(e)=>{
   const newSearch = e.target.value
    updateSearch(e.target.value)
    debouncedGetMovies(newSearch)

 }
 const handleSubmit =e=>{
  e.preventDefault()
  getMovies({search});

 }


  return (
    <div>
       <header className="mt-2 flex flex-col items-center">
        <h1 className='font-bold text-4xl text-indigo-400'>¡Buscador de Películas!</h1>
          <form className="flex  gap-x-3" action=""  onSubmit={handleSubmit}>
             <input value={search} onChange={handleChange}   name='query'  className="border-2 border-x-slate-400 border-y-indigo-400 rounded p-2 " placeholder="The Avengers, Star Wars, The Matrix" type="text" />
             <button  className="bg-red-400 border-2  rounded h-8 mt-1 w-24">Buscar</button>
          </form>
          {error && <p className=' mt-2 text-red-700 font-medium w-full text-center  '>La búsqueda requiere almenos 3 letras</p>}
        </header>
        <main className=''>
          <Movies movies={responseMovies} />
        </main>
       
    </div>
  )
}


export default App
