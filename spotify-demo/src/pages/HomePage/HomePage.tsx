import React from 'react'
import NewReleases from './components/NewReleases'
import Albums from './components/Albums'
import { SEARCH_TYPE } from '../../models/search'
import RecommendPlaylist from './components/RecommendPlaylist'

const HomePage = () => {
  return (
    <div style={{position:"relative",height:"calc(100% - 59px)", overflowY:"auto", scrollbarWidth: "none"}}>
        <NewReleases />
        <Albums keyword={"아이유"} type={[SEARCH_TYPE.Album]} limit={6} />
        <RecommendPlaylist keyword={"바다"} type={[SEARCH_TYPE.Playlist]} limit={6} />
    </div>
  )
}

export default HomePage