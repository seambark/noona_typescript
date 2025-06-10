import React from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const DetailHeader = styled("div")({
  display: "flex",
  letterSpacing: "0.03em",
  gap: "30px",
  "@media (max-width:900px)" : {
      flexDirection: "column",
  },
  "@media (max-width:750px)" : {
      alignItems: "center",
  },
});

const ImgBox = styled("div")({
  overflow: "hidden",
  position: "relative",
  width: "200px",
  height: "200px",
  flexShrink: 0,
  borderRadius: "7px",
  backgroundColor: "#2f2f2f",
  "& img": {
    width: "100%",
    Height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  },
  "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "110px",
  }
});

const TxtBox = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Title = styled("h2")({
  marginTop: 0,
  marginBottom: "5px",
  fontSize: "40px",
})

const SubTxt = styled("p") ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  gap: "7px",
})
const PlaylistDetailPage = () => {
  const { id } = useParams<{id: string}>();

  if(id === undefined) return <Navigate to="/"/>;

  const { data:playlist } = useGetPlaylist({playlist_id: id});
  console.log(playlist)

  return (
    <div>
      <DetailHeader>
      {playlist ?
        <>
        <ImgBox>
          {playlist.images ? 
            <img src={playlist.images[0].url} alt=''/>
          : <MusicNoteIcon /> }
        </ImgBox>
        <TxtBox>
          <Title>{playlist.name}</Title>
          <SubTxt>
            {/* <LibraryMusicIcon /> */}
            <QueueMusicIcon />
            <span>{playlist.owner?.display_name} | {playlist.tracks?.total} songs</span>
          </SubTxt>
        </TxtBox>
        </> 
        : "데이터 없음"}
      </DetailHeader>
    </div>
  )
}

export default PlaylistDetailPage;