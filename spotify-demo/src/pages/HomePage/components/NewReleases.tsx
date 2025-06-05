import { Typography } from '@mui/material'
import React from 'react'
import useGetNewReleases from '../../../hooks/useGetNewReleases'

const NewReleases = () => {
  const {data} = useGetNewReleases();
  // const {
  //   data: newReleasesData,
  //   error: newReleasesError,
  //   isLoading: isNewReleasesLoading,
  // } = useGetNewReleases();
  console.log(data)
  return (
    <div>
        <Typography variant='h1'>New Released Albums</Typography>
    </div>
  )
}

export default NewReleases