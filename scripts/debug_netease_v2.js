const axios = require('axios');

async function debugSong(title, artist) {
    console.log(`Debugging: ${title} - ${artist}`);
    
    // 1. Search Netease (Try broader search)
    try {
        // Just title
        const res = await axios.get('http://music.163.com/api/search/get/web', {
            params: { s: title, type: 1, offset: 0, total: true, limit: 5 },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                'Referer': 'https://music.163.com/'
            }
        });

        if (res.data?.result?.songs) {
            console.log(`Found ${res.data.result.songs.length} results for "${title}"`);
            
            // Find correct artist
            const match = res.data.result.songs.find(s => 
                s.artists.some(a => a.name.includes(artist)) || 
                artist.includes(s.artists[0].name)
            );
            
            if (match) {
                const id = match.id;
                const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
                console.log(`Found MATCH: ${match.name} - ${match.artists[0].name} (ID: ${id})`);
                
                // 2. Validate
                console.log('Testing validation...');
                try {
                    const valRes = await axios.get(url, {
                        headers: { 
                            'Range': 'bytes=0-1024',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
                        },
                        maxRedirects: 5
                    });
                    console.log(`Validation Status: ${valRes.status}`);
                    console.log(`Content Type: ${valRes.headers['content-type']}`);
                } catch (valErr) {
                    console.log(`Validation Failed: ${valErr.message}`);
                }
            } else {
                console.log('No artist match found in top 5');
                res.data.result.songs.forEach(s => console.log(`  - ${s.name} by ${s.artists[0].name}`));
            }
        } else {
            console.log('Search returned no results');
        }
    } catch (e) {
        console.error('Search Error:', e.message);
    }
}

debugSong('一直很安静', '阿桑');
