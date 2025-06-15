import { IconButton, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Track } from '../../../models/track';
import NoData from '../../../common/components/NoData';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import useAddPlaylist from '../../../hooks/useAddPlaylist';
import { useParams } from 'react-router';

interface SearchResultListProps {
    keyword: string;
    list: Track[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

const SearchListItem = styled("div")({
    display: "flex",
    marginTop: "15px",
    "&:first-child": {
        marginTop: 0,
    },
    gap: "15px",
})
const ItemImg = styled("div")({
    overflow: "hidden",
    width: "50px",
    height: "50px",
    borderRadius: "3px",
    flexShrink: 0,
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
    fontSize: "20px",
  }
})
const ItemTxt = styled("div")({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    paddingRight: "30px",
    "& .itemName" : {
        fontSize: "15px",
    },
    "& .itemInfo" : {
        display: "flex",
        gap: "5px",
        color: "#ddd",
        fontSize: "11px",
        
        "& .itemArtistName" : {
        },
        "& .itemAlbumName" : {}
    },
    "& .btnAddList" : {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
    }
})
export const SearchResultList = ({
    keyword,
    list,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}:SearchResultListProps) => {
    const { ref, inView } = useInView();
    const { id } = useParams<{id: string}>();
    const { mutate: addPlaylist } = useAddPlaylist(id as string);

     const handleAddList = (uri:string | undefined) => {
        console.log("노래추가", id, uri)

        if(uri) {
                addPlaylist({
                uris: [uri], 
                position: 0,
            })
        }
        
        // createPlaylist({name: "나의 플레이 리스트"})
    }

    console.log(list)
    useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
        fetchNextPage();
    }
    },[inView])

  return (
    <>
        {list.length === 0 ? 
            <NoData text="검색 데이터가 없습니다." keyword={keyword}/> 
            : 
            <>
            {list.map((track, index) => (
                <SearchListItem key={index}>
                    <ItemImg>
                        { !track.album?.images ? <MusicNoteIcon className="imgIcon"/> : (<img src={track.album?.images[0].url} alt=''/>) }
                    </ItemImg>
                    <ItemTxt>
                        <Typography className='itemName'>{track.name}</Typography>
                        <Typography className='itemInfo'>
                            <span className='itemArtistName'>{track.artists && track.artists[0].name} |</span>
                            <span className='itemAlbumName'>{track.album?.name}</span>
                        </Typography>
                        <IconButton color="primary" aria-label="노래추가" className="btnAddList" onClick={(e) => {
                            handleAddList(track.uri)
                        }}>
                            <PlaylistAddIcon />
                        </IconButton>
                    </ItemTxt>
                </SearchListItem>
            ))}
            
            <div ref={ref} style={{ height: 1 }}>
                {isFetchingNextPage && <Loading />}
            </div>
            </>
            
        }
    </>
  )
}
