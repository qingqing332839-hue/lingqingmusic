import axios from 'axios';
import { MIGU_PLAYLISTS } from './migu-config';

const MIGU_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Referer': 'https://m.music.migu.cn/'
};

export interface MiguSong {
  songId: string;
  songName: string;
  singerId: string;
  singerName: string;
  albumId: string;
  albumName: string;
  picM: string; // Cover
  picL: string;
  listenUrl: string; // Often empty or needs processing
  copyrightId: string;
}

export async function fetchMiguPlaylistSongs(playlistId: string) {
  // 1. Check if we have a static configuration for this ID (The "Cyber-Sifu" way)
  const staticPlaylist = MIGU_PLAYLISTS[playlistId];
  if (staticPlaylist && staticPlaylist.songs.length > 0) {
      console.log(`[MiguService] Serving static content for playlist: ${playlistId} (${staticPlaylist.title})`);
      const seen = new Set<string>();
      return staticPlaylist.songs.filter((s) => {
        const key = `${s.title}__${s.artist}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  // 2. If no static config, try the real API (Good luck with that 403)
  // If the ID is a small number (old fallback data), ignore it.
  if (playlistId.length < 5) {
      return [];
  }

  const url = `https://m.music.migu.cn/migu/remoting/playlist_by_id_tag?onLine=1&queryChannel=0&createUserId=MC&contentId=${playlistId}&playListType=2`;
  
  try {
    const { data } = await axios.get(url, { headers: MIGU_HEADERS });
    
    if (data && data.content && data.content.length > 0) {
        return data.content.map((item: any) => ({
            id: `migu_${item.songId}`,
            title: item.songName,
            artist: item.singerName,
            // Use high res cover if available
            cover: item.picL || item.picM || '',
            // Migu doesn't give direct src usually, or it expires.
            src: item.listenUrl || '', 
            duration: '00:00' // Migu might provide duration? item.duration is usually not in this endpoint
        }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching Migu playlist ${playlistId}:`, error);
    return [];
  }
}
