import { fetchDataFromApi } from "./utils/api.js"
import { useEffect } from "react"
import {Route,BrowserRouter,Router, Routes} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { getAPIConfiguration , getGenres} from "./store/homeSlice.js"
import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import Home from "./pages/home/Home.jsx"
import SearchResult from "./pages/searchResult/SearchResult.jsx"
import PageNotFound from "./pages/404/PageNotFound.jsx"
import Details from "./pages/details/Details.jsx"
import Explore from "./pages/explore/Explore.jsx"

function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.home.url.total_results)

  useEffect(() => {
    apiTesting();
    genresCall()
  } , [])
  
  const apiTesting = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      // console.log(res);

      const url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }
      dispatch(getAPIConfiguration(url))
    })
    .catch((err) => {
      console.log(err);
    })
  }



  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};

  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App
