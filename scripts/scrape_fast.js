const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.33ve.com';

async function scrapeFast() {
  console.log('Scraping Top List Metadata Only...');
  
  // Try HTTP first, then HTTPS
  const urls = [
    'http://www.33ve.com/list/top.html',
    'https://www.33ve.com/list/top.html'
  ];

  for (const url of urls) {
    try {
      console.log(`Trying ${url}...`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        },
        timeout: 8000
      });

      const $ = cheerio.load(response.data);
      const songs = [];

      $('.play_list ul li').each((i, el) => {
        const title = $(el).find('.list_r .name a').text().trim();
        const artist = $(el).find('.list_r .singer').text().trim();
        const cover = $(el).find('.pic img').attr('src');
        // If cover is relative, fix it? usually it's absolute http...
        
        // Try to get ID from link
        const link = $(el).find('.pic a').attr('href');
        let id = `top_${i}`;
        if (link) {
           const match = link.match(/\/mp3\/(\w+)\.html/);
           if (match) id = match[1];
        }

        if (title && artist) {
          songs.push({
            id,
            title,
            artist,
            cover: cover || '',
            src: '', // No audio yet
            duration: '03:30'
          });
        }
      });

      console.log(`Success! Found ${songs.length} songs.`);
      
      if (songs.length > 0) {
        // Save to file
        fs.writeFileSync(
          path.join(__dirname, 'top_songs_metadata.json'), 
          JSON.stringify(songs, null, 2)
        );
        return; // Stop if successful
      }

    } catch (error) {
      console.error(`Failed ${url}:`, error.message);
    }
  }
}

scrapeFast();
