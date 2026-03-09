const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.33ve.com';

async function scrapeTop() {
  console.log('Scraping TOP List...');
  try {
    const response = await axios.get(`${BASE_URL}/list/top.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const songs = [];

    $('.play_list ul li').each((i, el) => {
      const titleLink = $(el).find('.list_r .name a');
      const singerLink = $(el).find('.list_r .singer');
      const imgLink = $(el).find('.pic img');
      const pageLink = $(el).find('.pic a').attr('href'); // /mp3/ID.html

      const title = titleLink.text().trim();
      const artist = singerLink.text().trim();
      const cover = imgLink.attr('src');
      
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
          pageUrl: pageLink
        });
      }
    });

    console.log(`Found ${songs.length} songs.`);
    
    // Write raw list to temp file
    fs.writeFileSync(
      path.join(__dirname, 'top_raw.json'), 
      JSON.stringify(songs, null, 2)
    );

  } catch (error) {
    console.error('Scrape failed:', error.message);
  }
}

scrapeTop();
