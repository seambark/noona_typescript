import React from 'react';
import { SimplifiedPlaylist } from '../../models/playlist';
import { styled } from '@mui/material';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

// const UserPlaylist = styled("div") ({
//   listStyle: "none",
//   margin: 0,
//   padding: 0,
// })


const Playlist = ({playlists}: PlaylistProps) => {
  return (
    <>
      { playlists.map((item) => (
            <PlaylistItem 
                name={item.name || ""}
                image={(item.images && item.images[0]?.url) || null}
                id={item.id || ""}
                key={item.id}
                artistName={item.owner?.display_name}
              />
        ))}
    </>
  )
}

export default Playlist