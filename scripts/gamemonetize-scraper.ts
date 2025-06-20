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

class GameMonetizeScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
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
      await new Promise(resolve => setTimeout(resolve, 5000));

      // 获取页面上的游戏数据
      console.log('正在提取游戏数据...');
      
      const gameData = await this.page.evaluate(() => {
        const games: Array<{title: string, href: string, img: string, category: string}> = [];
        
        // 查找所有游戏卡片
        const gameCards = document.querySelectorAll('.game-item, .game-card, [class*="game"], .item, .card, a[href*="/game/"]');
        
        gameCards.forEach(card => {
          const link = card.tagName === 'A' ? card : card.querySelector('a');
          if (!link) return;
          
          const href = link.getAttribute('href');
          const title = link.textContent?.trim() || link.getAttribute('title') || '';
          const img = card.querySelector('img')?.getAttribute('src') || '';
          
          // 尝试确定分类
          let category = '休闲';
          const parentElement = card.closest('[class*="category"], [class*="section"]');
          if (parentElement) {
            const categoryText = parentElement.textContent?.toLowerCase() || '';
            if (categoryText.includes('action') || categoryText.includes('动作')) category = '动作';
            else if (categoryText.includes('puzzle') || categoryText.includes('益智')) category = '益智';
            else if (categoryText.includes('sport') || categoryText.includes('体育')) category = '体育';
            else if (categoryText.includes('adventure') || categoryText.includes('冒险')) category = '冒险';
            else if (categoryText.includes('strategy') || categoryText.includes('策略')) category = '策略';
            else if (categoryText.includes('shooting') || categoryText.includes('射击')) category = '射击';
            else if (categoryText.includes('racing') || categoryText.includes('赛车')) category = '赛车';
            else if (categoryText.includes('simulation') || categoryText.includes('模拟')) category = '模拟';
            else if (categoryText.includes('rpg') || categoryText.includes('角色')) category = '角色扮演';
          }
          
          if (href && title && !title.includes('Login') && !title.includes('Sign') && !title.includes('Games')) {
            games.push({ title, href, img, category });
          }
        });
        
        return games.slice(0, 20); // 限制数量
      });

      console.log(`找到 ${gameData.length} 个游戏`);

      // 处理每个游戏
      for (let i = 0; i < gameData.length; i++) {
        const game = gameData[i];
        console.log(`正在处理游戏 ${i + 1}: ${game.title}`);
        
        try {
          // 构建完整URL
          let fullUrl = game.href;
          if (!fullUrl.startsWith('http')) {
            fullUrl = `https://gamemonetize.com${fullUrl}`;
          }
          
          // 访问游戏页面
          await this.page.goto(fullUrl, { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // 获取游戏详情
          const gameDetails = await this.page.evaluate(() => {
            const title = document.querySelector('h1, .game-title, .title, [class*="title"]')?.textContent?.trim() || '';
            const desc = document.querySelector('.description, .desc, .game-description, [class*="description"]')?.textContent?.trim() || '';
            
            // 查找iframe
            const iframe = document.querySelector('iframe');
            const iframeUrl = iframe?.getAttribute('src') || '';
            
            // 查找游戏图片
            const img = document.querySelector('.game-image img, .cover img, img[src*="gamemonetize"], img[src*="512x512"]')?.getAttribute('src') || '';
            
            return { title, desc, iframeUrl, img };
          });
          
          // 生成slug
          const slug = (gameDetails.title || game.title)
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
          
          const gameDataItem: GameData = {
            title: gameDetails.title || game.title,
            slug,
            cover: gameDetails.img || game.img,
            category: game.category,
            desc: gameDetails.desc || '有趣的在线游戏',
            url: fullUrl,
            iframeUrl: gameDetails.iframeUrl
          };
          
          games.push(gameDataItem);
          console.log(`成功获取游戏: ${gameDataItem.title}`);
          console.log(`  Iframe URL: ${gameDataItem.iframeUrl || '未找到'}`);
          
        } catch (error) {
          console.error(`处理游戏 ${game.title} 时出错:`, error);
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
      console.log(`   Category: ${game.category}`);
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