// 游戏数据类型定义
export interface Game {
  title: { zh: string; en: string };
  slug: string;
  cover: string;
  category: string;
  desc: { zh: string; en: string };
  url: string;
}

// 游戏数据列表
export const games: Game[] = [
  {
    title: { zh: "卡车运输模拟器", en: "Truck Transport Simulator" },
    slug: "truck-transport-simulator",
    cover: "https://img.gamemonetize.com/lp9qbdo722u21gngmsf02j1w1s1mfjfm/512x384.jpg",
    category: "模拟",
    desc: { zh: "驾驶卡车运输货物，体验真实的驾驶模拟器。", en: "Drive a truck to transport goods and experience a real simulator." },
    url: "https://uncached.gamemonetize.co/lp9qbdo722u21gngmsf02j1w1s1mfjfm/?referer=original"
  },
  {
    title: { zh: "点亮冲刺", en: "Light It Rush" },
    slug: "light-it-rush",
    cover: "https://img.gamemonetize.com/32n43ar75l12h5uru5qjr2djpqddupk2/512x384.jpg",
    category: "休闲",
    desc: { zh: "快速点亮所有方块，挑战你的反应速度。", en: "Light up all the blocks quickly and challenge your reaction speed." },
    url: "https://uncached.gamemonetize.co/32n43ar75l12h5uru5qjr2djpqddupk2/?referer=original"
  },
  {
    title: { zh: "超级越野摩托", en: "Super Motocross" },
    slug: "super-motocross",
    cover: "https://img.gamemonetize.com/d8vjyjtwgj1c7opsa1e99ifmvnfvgvn8/512x384.jpg",
    category: "赛车",
    desc: { zh: "极限摩托竞速挑战，体验速度与激情。", en: "Extreme motocross racing challenge, experience speed and passion." },
    url: "https://uncached.gamemonetize.co/d8vjyjtwgj1c7opsa1e99ifmvnfvgvn8/?referer=original"
  },
  {
    title: { zh: "捉迷藏朋友", en: "Hide And Seek Friends!" },
    slug: "hide-and-seek-friends",
    cover: "https://img.gamemonetize.com/c55i7d1tly2sovcobi9j3i13cpz0iekw/512x384.jpg",
    category: "休闲",
    desc: { zh: "和朋友一起玩捉迷藏，寻找隐藏的朋友。", en: "Play hide and seek with friends and find the hidden ones." },
    url: "https://uncached.gamemonetize.co/c55i7d1tly2sovcobi9j3i13cpz0iekw/?referer=original"
  },
  {
    title: { zh: "DIY冰淇淋卷筒", en: "DIY Ice Cream Roll Cone" },
    slug: "diy-ice-cream-roll-cone",
    cover: "https://img.gamemonetize.com/lp9qbdo722u21gngmsf02j1w1s1mfjfm/512x384.jpg",
    category: "休闲",
    desc: { zh: "制作美味的冰淇淋卷筒，体验DIY的乐趣。", en: "Make delicious ice cream roll cones and enjoy the fun of DIY." },
    url: "https://uncached.gamemonetize.co/lp9qbdo722u21gngmsf02j1w1s1mfjfm/?referer=original"
  },
  {
    title: { zh: "车辆工厂", en: "VehicleFactory" },
    slug: "vehiclefactory",
    cover: "https://img.gamemonetize.com/32n43ar75l12h5uru5qjr2djpqddupk2/512x384.jpg",
    category: "模拟",
    desc: { zh: "在工厂中制造各种车辆，体验工业制造的乐趣。", en: "Manufacture various vehicles in the factory and enjoy the fun of industrial production." },
    url: "https://uncached.gamemonetize.co/32n43ar75l12h5uru5qjr2djpqddupk2/?referer=original"
  },
  {
    title: { zh: "圆圈跳跃", en: "CircleLeap" },
    slug: "circleleap",
    cover: "https://img.gamemonetize.com/3irb0wmjx8kc93fohm9j22rxpeim8j2d/512x384.jpg",
    category: "休闲",
    desc: { zh: "控制圆圈跳跃，避开障碍物到达终点。", en: "Control the circle to jump and avoid obstacles to reach the finish." },
    url: "https://uncached.gamemonetize.co/3irb0wmjx8kc93fohm9j22rxpeim8j2d/?referer=original"
  },
  {
    title: { zh: "旋转漩涡", en: "Wicked Whirl" },
    slug: "wicked-whirl",
    cover: "https://img.gamemonetize.com/tas23fch7g2lnzm58hw29479erg81bbw/512x384.jpg",
    category: "休闲",
    desc: { zh: "旋转的漩涡挑战，测试你的平衡能力。", en: "Rotating whirlpool challenge, test your balance." },
    url: "https://uncached.gamemonetize.co/tas23fch7g2lnzm58hw29479erg81bbw/?referer=original"
  },
  {
    title: { zh: "废轨冒险", en: "Sprunki Dead Rails" },
    slug: "sprunki-dead-rails",
    cover: "https://img.gamemonetize.com/iixpxl3s6ss7gqrvced5eaysnigvw0os/512x384.jpg",
    category: "动作",
    desc: { zh: "在废弃的铁轨上冒险，面对各种挑战。", en: "Adventure on abandoned tracks and face various challenges." },
    url: "https://uncached.gamemonetize.co/iixpxl3s6ss7gqrvced5eaysnigvw0os/?referer=original"
  },
  {
    title: { zh: "史莱姆微笑", en: "Slime Smile" },
    slug: "slime-smile",
    cover: "https://img.gamemonetize.com/k5gebrkgqyvki7du6k1d8hk2bozpdlo8/512x384.jpg",
    category: "休闲",
    desc: { zh: "可爱的史莱姆冒险，收集笑脸获得高分。", en: "Cute slime adventure, collect smiles for high scores." },
    url: "https://uncached.gamemonetize.co/k5gebrkgqyvki7du6k1d8hk2bozpdlo8/?referer=original"
  },
  {
    title: { zh: "像素路径", en: "Pixel Path" },
    slug: "pixel-path",
    cover: "https://img.gamemonetize.com/fcwz88fz1d52nffy0nemiduus7o8hahs/512x384.jpg",
    category: "益智",
    desc: { zh: "像素风格的路径解谜游戏，找到正确的路线。", en: "Pixel style path puzzle game, find the correct route." },
    url: "https://uncached.gamemonetize.co/fcwz88fz1d52nffy0nemiduus7o8hahs/?referer=original"
  },
  {
    title: { zh: "丝绸间谍", en: "Sauce Silk Spy" },
    slug: "sauce-silk-spy",
    cover: "https://img.gamemonetize.com/e294zypmnxmyfqliqwsdr8gac0o0v8a4/512x384.jpg",
    category: "动作",
    desc: { zh: "扮演丝绸间谍，执行秘密任务。", en: "Play as a silk spy and perform secret missions." },
    url: "https://uncached.gamemonetize.co/e294zypmnxmyfqliqwsdr8gac0o0v8a4/?referer=original"
  },
  {
    title: { zh: "番茄酱冒险", en: "Sprunki Ketchup Mod" },
    slug: "sprunki-ketchup-mod",
    cover: "https://img.gamemonetize.com/7tvjo8x6w1flu3fvadry5mz8qbhotkxo/512x384.jpg",
    category: "动作",
    desc: { zh: "番茄酱主题的冒险游戏，体验独特的玩法。", en: "Tomato sauce themed adventure game, experience unique gameplay." },
    url: "https://uncached.gamemonetize.co/7tvjo8x6w1flu3fvadry5mz8qbhotkxo/?referer=original"
  },
  {
    title: { zh: "魔法方块拼图", en: "Block Puzzle Magic" },
    slug: "blockpuzzlemagic",
    cover: "https://img.gamemonetize.com/z6gxwxdgunqmjmhva7j5kszeya71ls9u/512x384.jpg",
    category: "益智",
    desc: { zh: "魔法方块拼图，挑战你的逻辑思维。", en: "Magic block puzzle, challenge your logic." },
    url: "https://uncached.gamemonetize.co/z6gxwxdgunqmjmhva7j5kszeya71ls9u/?referer=original"
  },
  {
    title: { zh: "越野卡车驾驶模拟器", en: "Truck Driving Simulator offroad" },
    slug: "truck-driving-simulator-offroad",
    cover: "https://img.gamemonetize.com/a6i1ot5d0scwphehyrsl0vned0ezjk8q/512x384.jpg",
    category: "模拟",
    desc: { zh: "越野卡车驾驶模拟器，体验极限驾驶。", en: "Offroad truck driving simulator, experience extreme driving." },
    url: "https://uncached.gamemonetize.co/a6i1ot5d0scwphehyrsl0vned0ezjk8q/?referer=original"
  },
  {
    title: { zh: "植物大战僵尸", en: "Zombies vs. Sunflowers" },
    slug: "zombies-vs-sunflowers",
    cover: "https://img.gamemonetize.com/6kw2gj2vjs2uztzkl5xyrxrpreo5t6lo/512x384.jpg",
    category: "策略",
    desc: { zh: "植物大战僵尸风格的游戏，保护你的花园。", en: "Plant vs. Zombie style game, protect your garden." },
    url: "https://uncached.gamemonetize.co/6kw2gj2vjs2uztzkl5xyrxrpreo5t6lo/?referer=original"
  },
  {
    title: { zh: "可爱的甜点野兽", en: "Sweet Beasts" },
    slug: "sweet-beasts",
    cover: "https://img.gamemonetize.com/h9oc4gnpqgqndct23kpvys6qlgzlo7v4/512x384.jpg",
    category: "休闲",
    desc: { zh: "可爱的甜点野兽，收集糖果获得高分。", en: "Cute dessert beasts, collect candies for high scores." },
    url: "https://uncached.gamemonetize.co/h9oc4gnpqgqndct23kpvys6qlgzlo7v4/?referer=original"
  },
  {
    title: { zh: "王座保卫战", en: "ThroneHold" },
    slug: "thronehold",
    cover: "https://img.gamemonetize.com/rv7i4vp7fn46vjdgjs8el77c83twubly/512x384.jpg",
    category: "策略",
    desc: { zh: "保卫你的王座，抵御敌人的进攻。", en: "Defend your throne and resist enemy attacks." },
    url: "https://uncached.gamemonetize.co/rv7i4vp7fn46vjdgjs8el77c83twubly/?referer=original"
  },
  {
    title: { zh: "游乐场逃脱", en: "Thung Thung Sahur Playgrounds Escape" },
    slug: "thung-thung-sahur-playgrounds-escape",
    cover: "https://img.gamemonetize.com/8tcibyn2omj8rnb6w52fca37crhmexjh/512x384.jpg",
    category: "冒险",
    desc: { zh: "从游乐场逃脱，解决各种谜题。", en: "Escape from the playground and solve various puzzles." },
    url: "https://uncached.gamemonetize.co/8tcibyn2omj8rnb6w52fca37crhmexjh/?referer=original"
  },
  {
    title: { zh: "生存射击游戏", en: "Survival Shooter Game" },
    slug: "survival-shooter-game",
    cover: "https://img.gamemonetize.com/j7cwr3eola0ddykquvywldrqi5umfm8l/512x384.jpg",
    category: "射击",
    desc: { zh: "生存射击游戏，在危险环境中求生。", en: "Survival shooter game, survive in dangerous environments." },
    url: "https://uncached.gamemonetize.co/j7cwr3eola0ddykquvywldrqi5umfm8l/?referer=original"
  }
];

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
    game.title.zh.toLowerCase().includes(lowercaseQuery) ||
    game.title.en.toLowerCase().includes(lowercaseQuery) ||
    game.desc.zh.toLowerCase().includes(lowercaseQuery) ||
    game.desc.en.toLowerCase().includes(lowercaseQuery) ||
    game.category.toLowerCase().includes(lowercaseQuery)
  );
}