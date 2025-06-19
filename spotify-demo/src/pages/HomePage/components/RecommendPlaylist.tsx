import React from 'react'
import { SEARCH_TYPE } from '../../../models/search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Loading from '../../../common/components/Loading';
import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';

interface RecommendPlaylistProps {
    keyword: string;
    type: SEARCH_TYPE[];
    limit: number;
}

const RecommendPlaylist = ({keyword, type, limit}:RecommendPlaylistProps) => {

    const { data, isLoading, error } = useSearchItemsByKeyword({
        q: keyword,
        type,
        limit,
    });

    if (!data?.pages[0]) {
    return null;
  }
    if(isLoading) {
        return <Loading />;
    }

    if(error) {
        return <ErrorMessage errorMessage={error.message} />
    }

  return (
    <div>
        <Typography variant='h1' marginBottom="15px">더위를 식혀줄 플레이리스트</Typography>
        {data  ? 
          <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {data?.pages[0].playlists?.items.map((list) => (
              <Grid size={{xs:6, sm:4, md:2}} key={list.id}>
                <Card image={list.images?.[0]?.url} name={list.name} artistName={list.owner?.display_name} />
              </Grid>
            ))}
          </Grid> 
          : <Typography variant='h2'>데이터 없음음</Typography>
        }
    </div>
  )
}

export default RecommendPlaylist