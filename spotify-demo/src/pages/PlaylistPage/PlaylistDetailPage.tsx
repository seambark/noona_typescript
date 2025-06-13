import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Container, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import useGetPlaylistItem from '../../hooks/useGetPlaylistItem';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';

const DetailContainer = styled("div")({
  display: "flex",
  gap: "30px",
  flexDirection: "column",
  height: "calc(100% - 25px)",
  paddingBottom: "25px",
});

const DetailHeader = styled("div")({
  display: "flex",
  letterSpacing: "0.03em",
  gap: "30px",
  minHeight: "200px",
  "@media (max-width:900px)" : {
      flexDirection: "column",
      minHight: "320px",
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
  const { ref, inView } = useInView();
  const { id } = useParams<{id: string}>();
   const accessToken = localStorage.getItem("access_token");

   if (!accessToken) {
        return (
            <Container sx={{ mt: 8 }}>
                <Typography variant="body1" align="center" color="text.secondary">
                    로그인 후 확인 가능한 페이지입니다.<br/>
                    페이지 상단 우측의 Login 버튼을 눌러 로그인 후 확인해주세요!
                </Typography>
            </Container>
        )
    }

  if(id === undefined) return <Navigate to="/"/>;

  const { 
    data:playlist,
    isLoading: isPlaylisLoading,
    error: playlistError,
  } = useGetPlaylist({playlist_id: id});

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItem({playlist_id: id, limit: PAGE_LIMIT});
  
  console.log(playlistItems)

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  },[inView])

  if (isPlaylisLoading) {
    return <Loading />;
  }

  if (playlistItemsError) {
    return <ErrorMessage errorMessage={playlistItemsError.message} />;
  }

  return (
    <DetailContainer>
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
      { playlist?.tracks?.total === 0 ? "검색" :
      <Paper style={{width: "100%", overflowY: "auto", scrollbarWidth: "none"}}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) => 
              page.items.map((item, itemIndex) => {
                return (
                <DesktopPlaylistItem 
                  item={item} 
                  key={(pageIndex * PAGE_LIMIT) + itemIndex + 1} 
                  index={(pageIndex * PAGE_LIMIT) + itemIndex + 1}
                  />
                );
              }))}
              <TableRow ref={ref}>
                <TableCell colSpan={5} align="center" style={{height:0, padding: 0}}>
                  {isFetchingNextPage && <Loading />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        }
    </DetailContainer>
  )
}

export default PlaylistDetailPage;