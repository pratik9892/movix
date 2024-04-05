import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/UseFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "./style.scss"

const HeroBanner = () => {

    const [backgorund,setBackgorund] = useState("")
    const [query,setQuery] = useState("")
    const navigate = useNavigate()
    const url = useSelector((state) => state.home.url)
    // console.log(url.backdrop);

    const {data,loading} = useFetch("/movie/popular")

    useEffect(() => {
        const bg = "https://image.tmdb.org/t/p/original" + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
        setBackgorund(bg)
    },[data])

    // console.log(backgorund);

    const searchQueryHandler = (e) => {
        if(query.length > 0){
            navigate(`/search/${query}`)
        }

    }

  return (
    <div className="heroBanner">
        {!loading && <div className="backdrop-img">
            <Img src={backgorund}/>
        </div>}
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome Mohit</span>
                <span className="subTitle">
                Millions of movies, TV shows and people to discover. Explore now.
                </span>
                <div className="searchInput">
                    <input 
                        type="text" 
                        placeholder='Search for a Movie or a TV Show.'
                        onChange={(e) => setQuery(e.target.value)}
                        // onKeyUp={searchQueryHandler}
                       
                        />
                    <button onClick={searchQueryHandler}>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner