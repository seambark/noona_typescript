import React, { useEffect } from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { styled } from '@mui/material';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import Playlist from './Playlist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';


const PlaylistContainer = styled("div") ({
  position: "relative",
  overflowY: "auto",
  height: "100%",
  margin: "10px -15px 0 -20px",
  paddingBottom: "30px",
  scrollbarWidth: "none",
})

const Library = () => {
  const { ref, inView } = useInView();
  const { 
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
   } = useGetCurrentUserPlaylists({limit:10, offset:0});

  const { data:user } = useGetCurrentUserProfile();

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  },[inView]);
  
  if(!user) return <EmptyPlaylist />;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <>
      { !data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ): (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
        </PlaylistContainer>
      )}
    </>
  )
}

export default Library;