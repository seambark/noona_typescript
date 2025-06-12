import React from 'react'
import { PlaylistTrack } from '../../../models/playlist'
import { TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';

interface DesktopPlaylistItemProps {
    index: number;
    item: PlaylistTrack;
}

const DesktopPlaylistItem = ({item, index}:DesktopPlaylistItemProps) => {
    const isEpisode = (track: Track | Episode):track is Episode => {

        return "description" in track;
    };

const getFormatDate = (addedDate: string):string => {
    const date = new Date(addedDate);

    return date.toISOString().split("T")[0];
}

const getTime = (difference:number):string => {
    const totalSeconds = Math.floor(difference / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
}

  return (
    <TableRow hover>
        <TableCell style={{borderBottom:"none"}}>{index}</TableCell>
        <TableCell style={{borderBottom:"none"}}>{item.track.name || "no name"}</TableCell>
        <TableCell style={{borderBottom:"none"}}>{isEpisode(item.track) ? "N/A" : item.track.album?.name }</TableCell>
        <TableCell style={{borderBottom:"none"}}>{item.added_at ? getFormatDate(item.added_at)  : "Unknown"}</TableCell>
        <TableCell style={{borderBottom:"none"}}>{item.track.duration_ms ? getTime(item.track.duration_ms) : "Unknown"}</TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem