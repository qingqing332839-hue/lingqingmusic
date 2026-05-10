
import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    const response = await fetch('https://y.qq.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch QQ Music page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const recommendations: any[] = [];
    $('.playlist__item').each((i, el) => {
      if (i < 6) { // Limit to 6 items as in the original component
        const cover = $(el).find('.playlist__pic').attr('src');
        const title = $(el).find('.playlist__title').text().trim();
        const playCount = $(el).find('.playlist__listen').text().trim();
        recommendations.push({ 
            id: i + 1,
            cover: cover ? `https:${cover}` : '',
            title,
            playCount
        });
      }
    });

    return NextResponse.json(recommendations);

  } catch (error) {
    console.error('Error fetching QQ Music recommendations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
