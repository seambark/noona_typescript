import React from 'react'
import Library from '../../layout/components/Library'
import LibraryHead from '../../layout/components/LibraryHead'
import { styled } from '@mui/material'

const PlaylistPageContent = styled("div") ({

})

const PlaylistPage = () => {
  return (
    <PlaylistPageContent>
      <LibraryHead />
      <Library />
    </PlaylistPageContent>
  )
}

export default PlaylistPage