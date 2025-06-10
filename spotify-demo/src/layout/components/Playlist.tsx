import React from 'react';
import { SimplifiedPlaylist } from '../../models/playlist';
import { styled } from '@mui/material';
import PlaylistItem from '../../common/components/PlaylistItem';
import { useNavigate } from 'react-router';

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({playlists}: PlaylistProps) => {
  const navigate = useNavigate();

  const handleClick = (id:string) => {
    navigate(`/playlist/${id}`);
  }

  return (
    <>
      { playlists.map((item) => (
            <PlaylistItem
                handleClick={handleClick}
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