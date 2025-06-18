import React, { useEffect, useState } from 'react'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import NoData from '../../common/components/NoData';
import SearchListItem from '../../common/components/SearchListItem';
import { Grid, styled, Typography } from '@mui/material';
import Card from '../../common/components/Card';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useParams } from 'react-router';


// interface SearchProps {
//    keywordVal: string;
//    list: Track[];
//    hasNextPage: boolean;
//    isFetchingNextPage: boolean;
//    fetchNextPage: () => void;
// }

const SearchContent = styled("div") ({
  height: "calc(100% - 78px)",
  overflowY: "auto",
  display: "flex",
  flexDirection:"column",
  gap: "15px",
  scrollbarWidth: "none",
})

const ContentBox = styled("div") ({
  display: "flex",
  gap: "15px",
})

const BoxItem = styled("div") ({
  flex: "1 1 48%",
});

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { 
        data: searchKeywordList, 
        error: searchKeywordListError, 
        isLoading: isSearchKeywordListLoading,
        // hasNextPage,
        // isFetchingNextPage,
        // fetchNextPage,
    } = useSearchItemsByKeyword({
        q: keyword as string,
        type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
        limit: 6,
    });

    if(isSearchKeywordListLoading) return <Loading />;
    if(searchKeywordListError) {
    return <ErrorMessage errorMessage={searchKeywordListError.message} />;
  }

    const handleClick = (id:string) => {
    // navigate(`/playlist/${id}`);
  }
    
  return (
    <>
    {searchKeywordList  &&(
    <SearchContent>
      <ContentBox>
        <BoxItem>
          <Typography variant='h2' mb="15px">Top result</Typography>
          {(keyword && (searchKeywordList?.pages[0].tracks?.items.length !== 0 ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
              <Grid size={{xs:6, sm:4, md:2}}>
                  <Card 
                    image={searchKeywordList?.pages[0].tracks?.items[0].album?.images[0].url}
                    name={searchKeywordList?.pages[0].tracks?.items[0].name}
                    artistName={searchKeywordList?.pages[0].tracks?.items[0].artists[0].name} 
                  />
                </Grid>
            </Grid>) : <NoData text='검색결과 없음'/>)
          )}
        </BoxItem>
        <BoxItem>
          <Typography variant='h2' mb="15px">Songs</Typography>
          {(keyword && searchKeywordList?.pages[0].tracks) && <SearchListItem list={searchKeywordList?.pages[0].tracks?.items}/>}
        </BoxItem>
      </ContentBox>
      <ContentBox>
        <BoxItem>
          <Typography variant='h2' mb="15px">Artists</Typography>
          {keyword && ((searchKeywordList?.pages[0].artists.items.length !== 0) ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {
              searchKeywordList?.pages[0].artists.items.map((artist)=> (
                <Grid size={{xs:6, sm:4, md:2}} key={artist.id}>
                  <Card
                    image={artist.images[0].url}
                    name={artist.name}
                    artistName={artist.type}
                  />
                </Grid>
              ))}
            </Grid>)
            : <NoData text='검색결과 없음'/>)
          }
        </BoxItem>
      </ContentBox>
      <ContentBox>
        <BoxItem>
          <Typography variant='h2' mb="15px">Albums</Typography>
          {keyword && (searchKeywordList?.pages[0].albums.items.length !== 0 ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {
              searchKeywordList?.pages[0].albums.items.map((album)=> (
                <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                  <Card 
                    image={album.images[0].url} 
                    name={album.name} 
                    artistName={album.artists[0].name}
                  />
                </Grid>
              ))}
            </Grid>) 
            : <NoData text='검색결과 없음'/>)
          }
        </BoxItem>
      </ContentBox>
    </SearchContent>
    )}
    </>
  )
}

export default SearchWithKeywordPage