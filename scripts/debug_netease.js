const axios = require('axios');

async function debugSong(title, artist) {
    console.log(`Debugging: ${title} - ${artist}`);
    
    // 1. Search Netease
    try {
        const res = await axios.get('http://music.163.com/api/search/get/web', {
            params: { s: `${title} ${artist}`, type: 1, offset: 0, total: true, limit: 1 },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                'Referer': 'https://music.163.com/'
            }
        });

        if (res.data?.result?.songs?.[0]) {
            const match = res.data.result.songs[0];
            const id = match.id;
            const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
            console.log(`Found ID: ${id}`);
            console.log(`Generated URL: ${url}`);
            
            // 2. Validate
            console.log('Testing validation...');
            try {
                const valRes = await axios.get(url, {
                    headers: { 
                        'Range': 'bytes=0-1024',
                        // Netease links often fail if User-Agent is axios or empty, and Referer must be empty or specific
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
                    },
                    maxRedirects: 5,
                    validateStatus: status => status < 400
                });
                console.log(`Validation Status: ${valRes.status}`);
                console.log(`Content Type: ${valRes.headers['content-type']}`);
                console.log(`Data Length: ${valRes.data.length}`);
            } catch (valErr) {
                console.log(`Validation Failed: ${valErr.message}`);
                if (valErr.response) {
                    console.log(`Status: ${valErr.response.status}`);
                    console.log(`Headers: ${JSON.stringify(valErr.response.headers)}`);
                }
            }
        } else {
            console.log('Search returned no results');
        }
    } catch (e) {
        console.error('Search Error:', e.message);
    }
}

debugSong('一直很安静', '阿桑');
