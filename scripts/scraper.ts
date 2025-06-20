import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface GameData {
  title: string;
  slug: string;
  cover: string;
  category: string;
  desc: string;
  url: string;
  iframeUrl?: string;
}

interface GameElement {
  title: string;
  cover: string;
  url: string;
}

class GameMonetizeScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init() {
    this.browser = await puppeteer.launch({
      headless: false, // 设置为false以便调试
      defaultViewport: { width: 1920, height: 1080 }
    });
    this.page = await this.browser.newPage();
    
    // 设置用户代理
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  }

  async scrapeGames(): Promise<GameData[]> {
    if (!this.page) throw new Error('Page not initialized');

    const games: GameData[] = [];
    
    try {
      // 访问GameMonetize主页
      console.log('正在访问 GameMonetize 主页...');
      await this.page.goto('https://gamemonetize.com/', { waitUntil: 'networkidle2' });
      
      // 等待页面加载
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 获取游戏列表
      console.log('正在提取游戏数据...');
      
      // 尝试不同的选择器来获取游戏
      const gameElements = await this.page.$$eval(
        '.game-item, .game-card, [class*="game"], .item, .card',
        (elements: Element[]): GameElement[] => {
          return elements.map((el: Element): GameElement => {
            const titleElement = el.querySelector('h3, h4, .title, [class*="title"]') || el;
            const title = titleElement.textContent?.trim() || '';
            
            const imgElement = el.querySelector('img');
            const cover = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src') || '';
            
            const linkElement = el.querySelector('a');
            const url = linkElement?.getAttribute('href') || '';
            
            return { title, cover, url };
          }).filter((item: GameElement) => item.title && item.cover);
        }
      );

      console.log(`找到 ${gameElements.length} 个游戏元素`);

      // 处理每个游戏
      for (let i = 0; i < Math.min(gameElements.length, 20); i++) {
        const gameElement = gameElements[i];
        console.log(`正在处理游戏 ${i + 1}: ${gameElement.title}`);
        
        try {
          // 访问游戏详情页
          if (gameElement.url && !gameElement.url.startsWith('http')) {
            gameElement.url = `https://gamemonetize.com${gameElement.url}`;
          }
          
          if (gameElement.url) {
            await this.page.goto(gameElement.url, { waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 获取游戏详情
            const gameDetails = await this.page.evaluate(() => {
              const title = document.querySelector('h1, .game-title, [class*="title"]')?.textContent?.trim() || '';
              const desc = document.querySelector('.description, .desc, [class*="description"]')?.textContent?.trim() || '';
              
              // 查找iframe
              const iframe = document.querySelector('iframe');
              const iframeUrl = iframe?.getAttribute('src') || '';
              
              return { title, desc, iframeUrl };
            });
            
            // 生成slug
            const slug = gameElement.title
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, '')
              .replace(/\s+/g, '-');
            
            const gameData: GameData = {
              title: gameDetails.title || gameElement.title,
              slug,
              cover: gameElement.cover,
              category: '休闲', // 默认分类
              desc: gameDetails.desc || '有趣的在线游戏',
              url: gameElement.url,
              iframeUrl: gameDetails.iframeUrl
            };
            
            games.push(gameData);
            console.log(`成功获取游戏: ${gameData.title}`);
          }
        } catch (error) {
          console.error(`处理游戏 ${gameElement.title} 时出错:`, error);
        }
      }
      
    } catch (error) {
      console.error('爬取过程中出错:', error);
    }

    return games;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// 主函数
async function main() {
  const scraper = new GameMonetizeScraper();
  
  try {
    await scraper.init();
    const games = await scraper.scrapeGames();
    
    console.log(`\n成功爬取到 ${games.length} 个游戏:`);
    games.forEach((game, index) => {
      console.log(`${index + 1}. ${game.title}`);
      console.log(`   Slug: ${game.slug}`);
      console.log(`   Cover: ${game.cover}`);
      console.log(`   URL: ${game.url}`);
      console.log(`   Iframe URL: ${game.iframeUrl || '未找到'}`);
      console.log('---');
    });
    
    // 保存到文件
    const outputPath = path.join(__dirname, '../data/scraped-games.json');
    fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), 'utf8');
    console.log(`\n游戏数据已保存到: ${outputPath}`);
    
    // 更新games.ts文件
    updateGamesFile(games);
    
  } catch (error) {
    console.error('爬取失败:', error);
  } finally {
    await scraper.close();
  }
}

function updateGamesFile(games: GameData[]) {
  const gamesTsPath = path.join(__dirname, '../data/games.ts');
  
  const gamesData = games.map(game => ({
    title: game.title,
    slug: game.slug,
    cover: game.cover,
    category: game.category,
    desc: game.desc,
    url: game.iframeUrl || game.url
  }));
  
  const content = `// 游戏数据类型定义
export interface Game {
  title: string;
  slug: string;
  cover: string;
  category: string;
  desc: string;
  url: string;
}

// 游戏数据列表
export const games: Game[] = ${JSON.stringify(gamesData, null, 2)};

// 游戏分类
export const categories = [
  "动作",
  "益智", 
  "体育",
  "冒险",
  "策略",
  "射击",
  "赛车",
  "模拟",
  "角色扮演",
  "休闲"
];

// 根据分类获取游戏
export function getGamesByCategory(category: string): Game[] {
  return games.filter(game => game.category === category);
}

// 根据slug获取单个游戏
export function getGameBySlug(slug: string): Game | undefined {
  return games.find(game => game.slug === slug);
}

// 搜索游戏
export function searchGames(query: string): Game[] {
  const lowercaseQuery = query.toLowerCase();
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.desc.toLowerCase().includes(lowercaseQuery) ||
    game.category.toLowerCase().includes(lowercaseQuery)
  );
}`;

  fs.writeFileSync(gamesTsPath, content, 'utf8');
  console.log(`\ngames.ts 文件已更新`);
}

// 运行爬虫
if (require.main === module) {
  main().catch(console.error);
}

export { GameMonetizeScraper }; 