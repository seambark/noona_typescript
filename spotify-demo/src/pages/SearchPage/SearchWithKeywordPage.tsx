import React, { useEffect } from 'react'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import NoData from '../../common/components/NoData';
import SearchListItem from '../../common/components/SearchListItem';
import { Grid, styled, Typography } from '@mui/material';
import Card from '../../common/components/Card';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useParams } from 'react-router';
import { Track } from '../../models/track';
import { SimplifiedAlbum } from '../../models/album';
import { Artist } from '../../models/artist';


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
  "&.type01": {
    "@media (max-width:750px)" : {
        flexDirection:"column",
      }, 
  }
})

const BoxItem = styled("div") ({
  flex: "1 1 48%",
});

interface SearchResultListProps {
  keyword: string;
}

const SearchWithKeywordPage = ({keyword}:SearchResultListProps) => {
  if (!keyword || keyword.trim() === "") return null;

  const { 
        data: searchKeywordList, 
        error: searchKeywordListError, 
        isLoading: isSearchKeywordListLoading,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
        limit: 6,
    });

    const tracks = searchKeywordList?.pages.flatMap(p => p.tracks?.items ?? []).filter(Boolean) ?? [];
    const albums = searchKeywordList?.pages.flatMap(p => p.albums?.items ?? []).filter(Boolean) ?? [];
    const artists = searchKeywordList?.pages.flatMap(p => p.artists?.items ?? []).filter(Boolean) ?? [];

  useEffect(() => {
    console.log("🔍 검색어:", keyword);
    console.log("📦 API 응답 데이터:", searchKeywordList);
    // if (error) console.error("❌ 검색 오류:", error);
  }, [searchKeywordList, searchKeywordListError, keyword]);

    if(isSearchKeywordListLoading) return <Loading />;
    if(searchKeywordListError) {
    return <Typography>검색 중 오류가 생겼습니다. 다시 검색해주세요.</Typography>;
  }
    
  return (
    <>
    {searchKeywordList  && (
    <SearchContent>
      <ContentBox className='type01'>
        <BoxItem>
          <Typography variant='h2' mb="15px">Top result</Typography>
          {(tracks.length > 0 ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
              <Grid size={{xs:6, sm:4, md:2}}>
                  <Card 
                    image={tracks[0].album?.images[0].url}
                    name={tracks[0].name}
                    artistName={tracks[0].artists[0].name} 
                  />
                </Grid>
            </Grid>) : <NoData text='검색결과 없음'/>
          )}
        </BoxItem>
        <BoxItem>
          <Typography variant='h2' mb="15px">Songs</Typography>
          {tracks.length > 0 && 
          <SearchListItem 
            list={tracks}
          />}
        </BoxItem>
      </ContentBox>
      <ContentBox>
        <BoxItem>
          <Typography variant='h2' mb="15px">Artists</Typography>
          {keyword && ((artists.length !== 0) ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {
              artists.map((artist)=> (
                <Grid size={{xs:6, sm:4, md:2}} key={artist.id}>
                  <Card
                    image={artist.images?.[0]?.url}
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
          {keyword && (albums.length > 0 ? (
            <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {
              albums.map((album)=> (
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