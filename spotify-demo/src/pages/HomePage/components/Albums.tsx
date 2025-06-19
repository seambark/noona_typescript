import React from 'react'
import { SEARCH_TYPE } from '../../../models/search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Loading from '../../../common/components/Loading';
import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';

interface AlbumsProps {
    keyword: string;
    type: SEARCH_TYPE[];
    limit: number;
}

const Albums = ({keyword, type, limit}:AlbumsProps) => {

    const { data, isLoading, error } = useSearchItemsByKeyword({
        q: keyword,
        type,
        limit,
    });

    console.log(data?.pages[0].albums?.items)

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
        <Typography variant='h1' marginBottom="15px">오늘의 가수</Typography>
        {data  ? 
          <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {data?.pages[0].albums?.items.map((album) => (
              <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                <Card image={album.images?.[0]?.url} name={album.name} artistName={album.artists[0].name} />
              </Grid>
            ))}
          </Grid> 
          : <Typography variant='h2'>데이터 없음음</Typography>
        }
    </div>
  )
}

export default Albums