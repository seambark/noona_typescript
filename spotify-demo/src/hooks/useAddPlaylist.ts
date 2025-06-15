import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlaylist } from "../apis/playlistApi";
import { AddPlaylistRequest } from "../models/playlist";


const useAddPlaylist = (playlist_id: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (params:AddPlaylistRequest) => {
            if(playlist_id) {
                return addPlaylist(playlist_id, params)
            }

            return Promise.reject(new Error("playlist id ist not defined"))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["playlist-detail", playlist_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["playlist-items"],
            });
            queryClient.invalidateQueries({
                queryKey:["current-user-playlists"],
            });
            console.log("성공")
        }
    });
}

export default useAddPlaylist;