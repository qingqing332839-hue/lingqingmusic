const http = require('http');

const ids = [
    '233455243', 
    '233454776', 
    '233454782', 
    '233455429', 
    '233455590', 
    '233454801'
];

function fetchMetadata(id) {
    return new Promise((resolve) => {
        const url = `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/resourceinfo.do?resourceId=${id}&resourceType=2021`;
        http.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if(json.resource && json.resource[0]) {
                        resolve(json.resource[0].musicListId);
                    } else {
                        resolve(null);
                    }
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function fetchSongs(musicListId) {
    return new Promise((resolve) => {
        const url = `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/query_content_by_columnId.do?columnId=${musicListId}&pageNo=1&pageSize=50`;
        http.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if(json.objectInfo) {
                        const songs = json.objectInfo.map(item => ({
                            id: `migu_${item.miguMusicId || item.copyrightId}`,
                            title: item.songName,
                            artist: item.singer,
                            // Use album pic if available, or fallback
                            cover: item.albumPicM || '', 
                            src: '', // No audio src
                            duration: '00:00' // item.length might be duration string?
                        }));
                        resolve(songs);
                    } else {
                        resolve([]);
                    }
                } catch(e) { resolve([]); }
            });
        }).on('error', () => resolve([]));
    });
}

async function run() {
    const results = {};
    
    for(const id of ids) {
        console.log(`Processing Playlist ID: ${id}`);
        const musicListId = await fetchMetadata(id);
        if(musicListId) {
            console.log(`  > Found musicListId: ${musicListId}`);
            const songs = await fetchSongs(musicListId);
            console.log(`  > Fetched ${songs.length} songs`);
            results[id] = songs;
        } else {
            console.log('  > Failed to get musicListId');
        }
    }
    
    console.log('---JSON START---');
    console.log(JSON.stringify(results, null, 2));
    console.log('---JSON END---');
}

run();
