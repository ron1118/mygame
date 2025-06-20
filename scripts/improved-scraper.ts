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

class ImprovedGameScraper {
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

  // 根据游戏标题智能判断分类
  private getCategoryFromTitle(title: string): string {
    const lowerTitle = title.toLowerCase();
    
    // 赛车类游戏
    if (lowerTitle.includes('motocross') || lowerTitle.includes('racing') || 
        lowerTitle.includes('driving') || lowerTitle.includes('truck') || 
        lowerTitle.includes('vehicle') || lowerTitle.includes('car')) {
      return '赛车';
    }
    
    // 射击类游戏
    if (lowerTitle.includes('shooter') || lowerTitle.includes('shooting') || 
        lowerTitle.includes('gun') || lowerTitle.includes('zombie')) {
      return '射击';
    }
    
    // 动作类游戏
    if (lowerTitle.includes('action') || lowerTitle.includes('fight') || 
        lowerTitle.includes('battle') || lowerTitle.includes('combat')) {
      return '动作';
    }
    
    // 益智类游戏
    if (lowerTitle.includes('puzzle') || lowerTitle.includes('block') || 
        lowerTitle.includes('match') || lowerTitle.includes('brain') ||
        lowerTitle.includes('logic') || lowerTitle.includes('mind')) {
      return '益智';
    }
    
    // 体育类游戏
    if (lowerTitle.includes('sport') || lowerTitle.includes('ball') || 
        lowerTitle.includes('football') || lowerTitle.includes('basketball')) {
      return '体育';
    }
    
    // 冒险类游戏
    if (lowerTitle.includes('adventure') || lowerTitle.includes('escape') || 
        lowerTitle.includes('explore') || lowerTitle.includes('quest')) {
      return '冒险';
    }
    
    // 策略类游戏
    if (lowerTitle.includes('strategy') || lowerTitle.includes('tower') || 
        lowerTitle.includes('defense') || lowerTitle.includes('war')) {
      return '策略';
    }
    
    // 模拟类游戏
    if (lowerTitle.includes('simulator') || lowerTitle.includes('simulation') || 
        lowerTitle.includes('factory') || lowerTitle.includes('build')) {
      return '模拟';
    }
    
    // 角色扮演类游戏
    if (lowerTitle.includes('rpg') || lowerTitle.includes('role') || 
        lowerTitle.includes('character') || lowerTitle.includes('hero')) {
      return '角色扮演';
    }
    
    // 默认分类
    return '休闲';
  }

  // 生成游戏封面URL
  private generateCoverUrl(gameId: string): string {
    // 尝试不同的封面图片格式
    const coverFormats = [
      `https://img.gamemonetize.com/${gameId}/512x384.jpg`,
      `https://img.gamemonetize.com/${gameId}/512x512.jpg`,
      `https://img.gamemonetize.com/${gameId}/400x300.jpg`,
      `https://img.gamemonetize.com/${gameId}/300x200.jpg`
    ];
    return coverFormats[0]; // 返回第一个格式，如果不存在会显示默认图片
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
        
        // 查找所有可能的游戏链接
        const allLinks = document.querySelectorAll('a[href*="/game/"], a[href*="/games/"], a[href*=".html"]');
        
        allLinks.forEach(link => {
          const href = link.getAttribute('href');
          const title = link.textContent?.trim() || link.getAttribute('title') || '';
          const img = link.querySelector('img')?.getAttribute('src') || '';
          
          if (href && title && !title.includes('Login') && !title.includes('Sign') && !title.includes('Games')) {
            games.push({ title, href, img, category: '' });
          }
        });
        
        return games.slice(0, 30); // 限制数量
      });

      console.log(`找到 ${gameData.length} 个游戏链接`);

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
            
            // 查找游戏图片 - 尝试多种选择器
            let img = '';
            const imgSelectors = [
              '.game-image img',
              '.cover img', 
              'img[src*="gamemonetize"]',
              'img[src*="512x512"]',
              'img[src*="512x384"]',
              'img[src*="400x300"]',
              '.game-thumbnail img',
              '.thumbnail img'
            ];
            
            for (const selector of imgSelectors) {
              const imgElement = document.querySelector(selector);
              if (imgElement && imgElement.getAttribute('src')) {
                img = imgElement.getAttribute('src') || '';
                break;
              }
            }
            
            return { title, desc, iframeUrl, img };
          });
          
          // 生成slug
          const slug = (gameDetails.title || game.title)
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
          
          // 智能判断分类
          const category = this.getCategoryFromTitle(gameDetails.title || game.title);
          
          // 生成封面URL
          let coverUrl = gameDetails.img || game.img;
          if (!coverUrl || coverUrl.includes('gamemonetize-logo.png')) {
            // 从iframe URL中提取游戏ID
            const iframeUrl = gameDetails.iframeUrl;
            if (iframeUrl && iframeUrl.includes('gamemonetize.co/')) {
              const gameId = iframeUrl.split('/')[3]; // 提取游戏ID
              if (gameId) {
                coverUrl = this.generateCoverUrl(gameId);
              }
            }
          }
          
          // 如果还是没有封面，使用默认图片
          if (!coverUrl || coverUrl.includes('gamemonetize-logo.png')) {
            coverUrl = '/globe.svg'; // 使用本地默认图片
          }
          
          const gameDataItem: GameData = {
            title: gameDetails.title || game.title,
            slug,
            cover: coverUrl,
            category,
            desc: gameDetails.desc || '有趣的在线游戏',
            url: fullUrl,
            iframeUrl: gameDetails.iframeUrl
          };
          
          games.push(gameDataItem);
          console.log(`成功获取游戏: ${gameDataItem.title}`);
          console.log(`  分类: ${gameDataItem.category}`);
          console.log(`  封面: ${gameDataItem.cover}`);
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
  const scraper = new ImprovedGameScraper();
  
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

export { ImprovedGameScraper }; 