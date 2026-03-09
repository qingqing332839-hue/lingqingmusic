const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.33ve.com';

async function scrapeRealTop() {
  console.log('Attempting to scrape TOP list metadata...');
  try {
    const response = await axios.get(`${BASE_URL}/list/top.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': BASE_URL
      },
      timeout: 15000 // Longer timeout
    });

    const $ = cheerio.load(response.data);
    const songs = [];

    $('.play_list ul li').each((i, el) => {
      const titleLink = $(el).find('.list_r .name a');
      const singerLink = $(el).find('.list_r .singer');
      const imgLink = $(el).find('.pic img');
      const pageLink = $(el).find('.pic a').attr('href');

      const title = titleLink.text().trim();
      const artist = singerLink.text().trim();
      const cover = imgLink.attr('src');
      
      let id = '';
      if (pageLink) {
        const match = pageLink.match(/\/mp3\/(\w+)\.html/);
        if (match) id = match[1];
      }

      if (title && artist) {
        songs.push({
          id: id || `top_${i}`,
          title,
          artist,
          cover: cover || '',
          src: '', // To be filled or mapped
          duration: '03:30'
        });
      }
    });

    console.log(`Successfully scraped ${songs.length} songs from TOP list.`);
    
    // Save to a temporary JSON file to avoid losing data if update fails
    fs.writeFileSync(
      path.join(__dirname, 'real_top_songs.json'), 
      JSON.stringify(songs, null, 2)
    );

  } catch (error) {
    console.error('Failed to scrape TOP list:', error.message);
  }
}

scrapeRealTop();
