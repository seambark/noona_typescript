import { IconButton, InputBase, Paper, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import { SearchResultList } from './SearchResultList';
import Loading from '../../../common/components/Loading';
import NoData from '../../../common/components/NoData';
import SearchIcon from '@mui/icons-material/Search';

const SearchContent = styled("div")({
    position: "relative",
    height: "100%",
    overflow:"hidden",
    display:" flex",
    flexDirection: "column",
    "& .SearchInput": {
        "@media (max-width:900px)" : {
            width: "100%",
        },
    }
})

const ListContent = styled("div")({
    position: "relative",
    // height: "78%",
    overflowY: "auto",
    height: "100%",
    scrollbarWidth: "none",
})

const EmptyPlaylistWithSearch = () => {
    const [ keyword, setKeyword ] = useState<string>("");
    const { 
        data, 
        error, 
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    });

    // if(isLoading) return <Loading />;
    // const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? [];

    const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }

  return (
    <SearchContent>
        <Typography variant='h2' m="15px 0 15px" >원하는 노래를 찾아 추가해 보세요!</Typography>
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '30px' }}
            className='SearchInput'
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색어를 입력해 주세요."
            inputProps={{ 'aria-label': '노래검색' }}
            value={keyword} 
            onChange={handleSearchKeyword}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        </Paper>
        <ListContent>
        {!isLoading ?  
            (keyword === "" ? <NoData icoAddList/> :
                data?.pages.map((item, index) => {
                    if(!item.tracks) return false;
                    return <SearchResultList
                                key={index}
                                list={item.tracks?.items}
                                keyword={keyword}
                                hasNextPage={hasNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                                fetchNextPage={fetchNextPage}
                            />})
            ) 
            :<Loading />
        }
        </ListContent>
    </SearchContent>
  )
}

export default EmptyPlaylistWithSearch;