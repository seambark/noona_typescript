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

const getFormatDate = (addedDate: string | number) => {
    const date:Date = new Date(addedDate)
    const year:number = date.getFullYear();
    const month:number = (1 + date.getMonth());
    const day:number = date.getDate();
    return `${year}-${month}-${day}`;
}

const getTime = (difference:number):string => {
    const secInMs = Math.floor(difference / 1000),
    minInMs = Math.floor(secInMs / 60),
    hourInMs = Math.floor(minInMs / 60),
    seconds = secInMs % 60,
    minutes = minInMs % 60,
    hours = minutes % 24;

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