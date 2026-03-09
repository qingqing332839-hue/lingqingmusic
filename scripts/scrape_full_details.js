const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.33ve.com';

// Helper for delays to mimic human behavior
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeDetailedTop() {
  console.log('Fetching TOP list for detailed scraping...');
  try {
    const response = await axios.get(`${BASE_URL}/list/top.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': BASE_URL,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const songs = [];

    $('.play_list ul li').each((i, el) => {
      // Extract Metadata
      const titleLink = $(el).find('.list_r .name a');
      const singerLink = $(el).find('.list_r .singer');
      const imgLink = $(el).find('.pic img');
      const pageLink = $(el).find('.pic a').attr('href'); // e.g. /mp3/ID.html

      const title = titleLink.text().trim();
      const artist = singerLink.text().trim();
      let cover = imgLink.attr('src');
      
      // Fix relative cover paths if any
      if (cover && !cover.startsWith('http')) {
        cover = `${BASE_URL}${cover}`;
      }

      // Extract ID for audio resolving
      let id = '';
      if (pageLink) {
        const match = pageLink.match(/\/mp3\/(\w+)\.html/);
        if (match) id = match[1];
      }

      if (id && title) {
        songs.push({
          id,
          title,
          artist,
          cover,
          pageUrl: pageLink,
          src: '' // Audio source to be resolved
        });
      }
    });

    console.log(`Found ${songs.length} songs. Starting audio resolution...`);

    // --- Audio Resolution ---
    // We will try to resolve audio for ALL songs, but slowly.
    // If a request fails, we'll mark it as null but keep the metadata.
    
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      console.log(`[${i+1}/${songs.length}] Resolving audio for: ${song.title} (${song.id})...`);
      
      try {
        // The download link pattern seems to be: /plug/down.php?ac=music&id=ID
        const downUrl = `${BASE_URL}/plug/down.php?ac=music&id=${song.id}`;
        
        const audioRes = await axios.get(downUrl, {
          maxRedirects: 0, // Catch the 302 redirect location
          validateStatus: (status) => status >= 200 && status < 400,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': `${BASE_URL}/mp3/${song.id}.html`
          },
          timeout: 8000
        });

        if (audioRes.headers.location) {
          song.src = audioRes.headers.location;
          console.log(`  -> Success: ${song.src.substring(0, 50)}...`);
        } else {
          console.log(`  -> Failed: No location header.`);
        }
      } catch (err) {
        console.log(`  -> Error resolving audio: ${err.message}`);
      }
      
      // Random delay between 1s and 3s to be gentle
      const waitTime = 1000 + Math.random() * 2000;
      await delay(waitTime);
    }

    // Save final result
    const outputPath = path.join(__dirname, 'real_top_full.json');
    fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
    console.log(`\nSaved full detailed list to ${outputPath}`);

  } catch (error) {
    console.error('Fatal Scrape Error:', error.message);
  }
}

scrapeDetailedTop();
