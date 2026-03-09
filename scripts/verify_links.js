const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 1. Read existing data.ts to extract songs
// Since data.ts is TypeScript, we need to extract the TOP_SONGS array manually
const dataPath = path.join(__dirname, '../src/lib/data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract JSON array
const match = content.match(/const TOP_SONGS: Song\[] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find TOP_SONGS array in data.ts');
  process.exit(1);
}

const songs = JSON.parse(match[1]);
console.log(`Checking ${songs.length} songs...`);

// 2. Check each URL
async function checkUrl(url) {
  try {
    const res = await axios.head(url, { timeout: 3000, validateStatus: () => true });
    return res.status >= 200 && res.status < 400;
  } catch (e) {
    return false;
  }
}

async function verify() {
  let brokenCount = 0;
  const brokenSongs = [];

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const isValid = await checkUrl(song.src);
    
    if (!isValid) {
      console.log(`[Broken] ${song.title} - ${song.artist} (${song.src})`);
      brokenSongs.push(song);
      brokenCount++;
    } else {
        // Also check if cover is valid
        if (song.cover && song.cover.startsWith('http')) {
             const coverValid = await checkUrl(song.cover);
             if (!coverValid) {
                 console.log(`[Broken Cover] ${song.title}`);
                 song.cover = ''; // Mark for fix
                 brokenSongs.push(song);
             }
        }
    }
    
    if (i % 5 === 0) process.stdout.write('.');
  }
  
  console.log(`\nFound ${brokenCount} broken audio links.`);
  
  // Save broken songs for re-matching
  fs.writeFileSync(path.join(__dirname, 'broken_songs.json'), JSON.stringify(brokenSongs, null, 2));
}

verify();
