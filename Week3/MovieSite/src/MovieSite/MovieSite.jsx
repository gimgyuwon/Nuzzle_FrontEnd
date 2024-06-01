import { useEffect, useState } from 'react'
// import './MovieSite.css'
import NavBar from './NavBar.jsx'
import MainPage from '../Pages/MainPage.jsx'
import NowPlayingPage from '../Pages/NowPlayingPage.jsx'
import PopularPage from '../Pages/PopularPage.jsx'
import TopRatedPage from '../Pages/TopRatedPage.jsx'
import UpComing from '../Pages/UpComing.jsx'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import MovieDetailPage from '../Pages/MovieDetailPage.jsx'
import NotFoundPage from '../Pages/NotFoundPage.jsx'
import Signup from '../Pages/Signup.jsx'
import Login from '../Pages/Login.jsx'

let MovieSiteContainer = styled.div`
    height: 80%;
`


function MovieSite() {

    return (
        <>
            <NavBar></NavBar>
            {/* <div className='App'> */}
            <MovieSiteContainer>
                <Routes>
                    <Route path='/' element={<MainPage />}/>
                    <Route path='/signup' element={<Signup />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/nowplaying' element={<NowPlayingPage />} />
                    <Route path='/popular' element={<PopularPage />} />
                    <Route path='/toprated' element={<TopRatedPage />} />
                    <Route path='/upcoming' element={<UpComing />} />
                    <Route path='/movie/:title' element={<MovieDetailPage />} />
                    <Route path='*' element = {<NotFoundPage/>}/>
                </Routes>
            </MovieSiteContainer>
            {/* </div> */}
        </>
    )
}

export default MovieSite;