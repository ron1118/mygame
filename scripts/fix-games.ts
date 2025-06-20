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

// 根据游戏标题智能判断分类
function getCategoryFromTitle(title: string): string {
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
function generateCoverUrl(gameId: string): string {
  return `https://img.gamemonetize.com/${gameId}/512x384.jpg`;
}

// 从iframe URL中提取游戏ID
function extractGameId(iframeUrl: string): string | null {
  if (iframeUrl && iframeUrl.includes('gamemonetize.co/')) {
    const parts = iframeUrl.split('/');
    if (parts.length >= 4) {
      return parts[3];
    }
  }
  return null;
}

// 修复游戏数据
function fixGamesData(): GameData[] {
  const games: GameData[] = [
    {
      title: "Truck Transport Simulator",
      slug: "truck-transport-simulator",
      cover: "/globe.svg", // 使用默认图片
      category: "模拟",
      desc: "驾驶卡车运输货物，体验真实的驾驶模拟器。",
      url: "https://gamemonetize.com/games-editor-picks",
      iframeUrl: ""
    },
    {
      title: "Light It Rush",
      slug: "light-it-rush",
      cover: "/globe.svg",
      category: "休闲",
      desc: "快速点亮所有方块，挑战你的反应速度。",
      url: "https://gamemonetize.com/light-it-rush-game",
      iframeUrl: "?referer=original"
    },
    {
      title: "Super Motocross",
      slug: "super-motocross",
      cover: "https://img.gamemonetize.com/d8vjyjtwgj1c7opsa1e99ifmvnfvgvn8/512x384.jpg",
      category: "赛车",
      desc: "极限摩托竞速挑战，体验速度与激情。",
      url: "https://gamemonetize.com/super-motocross-game",
      iframeUrl: "https://uncached.gamemonetize.co/d8vjyjtwgj1c7opsa1e99ifmvnfvgvn8/?referer=original"
    },
    {
      title: "Hide And Seek Friends!",
      slug: "hide-and-seek-friends",
      cover: "/globe.svg",
      category: "休闲",
      desc: "和朋友一起玩捉迷藏，寻找隐藏的朋友。",
      url: "https://gamemonetize.com/hide-and-seek-friends-game",
      iframeUrl: "https://uncached.gamemonetize.co/c55i7d1tly2sovcobi9j3i13cpz0iekw/?referer=original"
    },
    {
      title: "DIY Ice Cream Roll Cone",
      slug: "diy-ice-cream-roll-cone",
      cover: "/globe.svg",
      category: "休闲",
      desc: "制作美味的冰淇淋卷筒，体验DIY的乐趣。",
      url: "https://gamemonetize.com/diy-ice-cream-roll-cone-game",
      iframeUrl: "https://uncached.gamemonetize.co/lp9qbdo722u21gngmsf02j1w1s1mfjfm/?referer=original"
    },
    {
      title: "VehicleFactory",
      slug: "vehiclefactory",
      cover: "/globe.svg",
      category: "模拟",
      desc: "在工厂中制造各种车辆，体验工业制造的乐趣。",
      url: "https://gamemonetize.com/vehiclefactory-game",
      iframeUrl: "https://uncached.gamemonetize.co/32n43ar75l12h5uru5qjr2djpqddupk2/?referer=original"
    },
    {
      title: "CircleLeap",
      slug: "circleleap",
      cover: "/globe.svg",
      category: "休闲",
      desc: "控制圆圈跳跃，避开障碍物到达终点。",
      url: "https://gamemonetize.com/circleleap-game",
      iframeUrl: "https://uncached.gamemonetize.co/3irb0wmjx8kc93fohm9j22rxpeim8j2d/?referer=original"
    },
    {
      title: "Wicked Whirl",
      slug: "wicked-whirl",
      cover: "/globe.svg",
      category: "休闲",
      desc: "旋转的漩涡挑战，测试你的平衡能力。",
      url: "https://gamemonetize.com/wicked-whirl-game",
      iframeUrl: "https://uncached.gamemonetize.co/tas23fch7g2lnzm58hw29479erg81bbw/?referer=original"
    },
    {
      title: "Sprunki Dead Rails",
      slug: "sprunki-dead-rails",
      cover: "/globe.svg",
      category: "动作",
      desc: "在废弃的铁轨上冒险，面对各种挑战。",
      url: "https://gamemonetize.com/sprunki-dead-rails-game",
      iframeUrl: "https://uncached.gamemonetize.co/iixpxl3s6ss7gqrvced5eaysnigvw0os/?referer=original"
    },
    {
      title: "Slime Smile",
      slug: "slime-smile",
      cover: "/globe.svg",
      category: "休闲",
      desc: "可爱的史莱姆冒险，收集笑脸获得高分。",
      url: "https://gamemonetize.com/slime-smile-game",
      iframeUrl: "https://uncached.gamemonetize.co/k5gebrkgqyvki7du6k1d8hk2bozpdlo8/?referer=original"
    },
    {
      title: "Pixel Path",
      slug: "pixel-path",
      cover: "/globe.svg",
      category: "益智",
      desc: "像素风格的路径解谜游戏，找到正确的路线。",
      url: "https://gamemonetize.com/pixel-path-game",
      iframeUrl: "https://uncached.gamemonetize.co/fcwz88fz1d52nffy0nemiduus7o8hahs/?referer=original"
    },
    {
      title: "Sauce Silk Spy",
      slug: "sauce-silk-spy",
      cover: "/globe.svg",
      category: "动作",
      desc: "扮演丝绸间谍，执行秘密任务。",
      url: "https://gamemonetize.com/sauce-silk-spy-game",
      iframeUrl: "https://uncached.gamemonetize.co/e294zypmnxmyfqliqwsdr8gac0o0v8a4/?referer=original"
    },
    {
      title: "Sprunki Ketchup Mod",
      slug: "sprunki-ketchup-mod",
      cover: "/globe.svg",
      category: "动作",
      desc: "番茄酱主题的冒险游戏，体验独特的玩法。",
      url: "https://gamemonetize.com/sprunki-ketchup-mod-game",
      iframeUrl: "https://uncached.gamemonetize.co/7tvjo8x6w1flu3fvadry5mz8qbhotkxo/?referer=original"
    },
    {
      title: "BlockPuzzleMagic",
      slug: "blockpuzzlemagic",
      cover: "/globe.svg",
      category: "益智",
      desc: "魔法方块拼图，挑战你的逻辑思维。",
      url: "https://gamemonetize.com/blockpuzzlemagic-game",
      iframeUrl: "https://uncached.gamemonetize.co/z6gxwxdgunqmjmhva7j5kszeya71ls9u/?referer=original"
    },
    {
      title: "Truck Driving Simulator offroad",
      slug: "truck-driving-simulator-offroad",
      cover: "/globe.svg",
      category: "模拟",
      desc: "越野卡车驾驶模拟器，体验极限驾驶。",
      url: "https://gamemonetize.com/truck-driving-simulator-offroad-game",
      iframeUrl: "https://uncached.gamemonetize.co/a6i1ot5d0scwphehyrsl0vned0ezjk8q/?referer=original"
    },
    {
      title: "Zombies vs. Sunflowers",
      slug: "zombies-vs-sunflowers",
      cover: "/globe.svg",
      category: "策略",
      desc: "植物大战僵尸风格的游戏，保护你的花园。",
      url: "https://gamemonetize.com/zombies-vs-sunflowers-game",
      iframeUrl: "https://uncached.gamemonetize.co/6kw2gj2vjs2uztzkl5xyrxrpreo5t6lo/?referer=original"
    },
    {
      title: "Sweet Beasts",
      slug: "sweet-beasts",
      cover: "/globe.svg",
      category: "休闲",
      desc: "可爱的甜点野兽，收集糖果获得高分。",
      url: "https://gamemonetize.com/sweet-beasts-game",
      iframeUrl: "https://uncached.gamemonetize.co/h9oc4gnpqgqndct23kpvys6qlgzlo7v4/?referer=original"
    },
    {
      title: "ThroneHold",
      slug: "thronehold",
      cover: "/globe.svg",
      category: "策略",
      desc: "保卫你的王座，抵御敌人的进攻。",
      url: "https://gamemonetize.com/thronehold-game",
      iframeUrl: "https://uncached.gamemonetize.co/rv7i4vp7fn46vjdgjs8el77c83twubly/?referer=original"
    },
    {
      title: "Thung Thung Sahur Playgrounds Escape",
      slug: "thung-thung-sahur-playgrounds-escape",
      cover: "/globe.svg",
      category: "冒险",
      desc: "从游乐场逃脱，解决各种谜题。",
      url: "https://gamemonetize.com/thung-thung-sahur-playgrounds-escape-game",
      iframeUrl: "https://uncached.gamemonetize.co/8tcibyn2omj8rnb6w52fca37crhmexjh/?referer=original"
    },
    {
      title: "Survival Shooter Game",
      slug: "survival-shooter-game",
      cover: "/globe.svg",
      category: "射击",
      desc: "生存射击游戏，在危险环境中求生。",
      url: "https://gamemonetize.com/survival-shooter-game-game",
      iframeUrl: "https://uncached.gamemonetize.co/j7cwr3eola0ddykquvywldrqi5umfm8l/?referer=original"
    }
  ];

  // 为有iframe URL的游戏生成封面
  games.forEach(game => {
    if (game.iframeUrl && game.iframeUrl !== "?referer=original") {
      const gameId = extractGameId(game.iframeUrl);
      if (gameId) {
        game.cover = generateCoverUrl(gameId);
      }
    }
  });

  return games;
}

// 主函数
function main() {
  console.log('正在修复游戏数据...');
  
  const games = fixGamesData();
  
  console.log(`\n修复了 ${games.length} 个游戏:`);
  games.forEach((game, index) => {
    console.log(`${index + 1}. ${game.title}`);
    console.log(`   分类: ${game.category}`);
    console.log(`   封面: ${game.cover}`);
    console.log('');
  });
  
  // 保存到文件
  const outputPath = path.join(__dirname, '../data/scraped-games.json');
  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), 'utf8');
  console.log(`游戏数据已保存到: ${outputPath}`);
  
  // 更新games.ts文件
  updateGamesFile(games);
  
  console.log('\n=== 分类统计 ===');
  const categoryStats: { [key: string]: number } = {};
  games.forEach(game => {
    categoryStats[game.category] = (categoryStats[game.category] || 0) + 1;
  });
  
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`${category}: ${count} 个游戏`);
  });
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

// 运行脚本
if (require.main === module) {
  main();
} 