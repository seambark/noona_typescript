import { Typography, Grid } from '@mui/material';
import React from 'react';
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  console.log(data)
  if(isLoading) {
    return <Loading />;
  }
  if(error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
        <Typography variant='h1' marginBottom="15px">새 앨범</Typography>
        {data && data.albums.items.length > 0 ? 
          <Grid container spacing={{ xs: 2, sm: 2, md: 1.5 }}>
            {data.albums.items.map((album) => (
              <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
              </Grid>
            ))}
          </Grid> 
          : <Typography variant='h2'>데이터 없음음</Typography>
        }
    </div>
  )
}

export default NewReleases