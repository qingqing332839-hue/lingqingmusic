const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.33ve.com';

async function scrapeHomepage() {
  console.log('Scraping Homepage for any songs...');
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const songs = [];

    // Look for any list of songs on homepage
    // Often in .song-list, .hot-list, etc.
    // Based on previous structure, maybe .play_list?
    $('.play_list li, .song_list li, .list li').each((i, el) => {
      const title = $(el).find('.name a, a.name').text().trim();
      const artist = $(el).find('.singer, .artist').text().trim();
      const link = $(el).find('a[href*="/mp3/"]').attr('href');
      
      if (title && link) {
        songs.push({ title, artist, link });
      }
    });

    console.log(`Found ${songs.length} songs on homepage.`);
    if (songs.length > 0) {
        console.log(JSON.stringify(songs.slice(0, 10), null, 2));
    }

  } catch (error) {
    console.error('Homepage scrape failed:', error.message);
  }
}

scrapeHomepage();
