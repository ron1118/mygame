import { games, categories, getGamesByCategory, getGameBySlug, searchGames } from '../data/games';

console.log('=== 游戏数据验证 ===\n');

console.log(`总游戏数量: ${games.length}`);
console.log(`游戏分类: ${categories.join(', ')}\n`);

console.log('=== 游戏列表 ===');
games.forEach((game, index) => {
  console.log(`${index + 1}. ${game.title}`);
  console.log(`   分类: ${game.category}`);
  console.log(`   Slug: ${game.slug}`);
  console.log(`   封面: ${game.cover}`);
  console.log(`   URL: ${game.url}`);
  console.log('');
});

console.log('=== 分类测试 ===');
categories.forEach(category => {
  const categoryGames = getGamesByCategory(category);
  console.log(`${category}: ${categoryGames.length} 个游戏`);
});

console.log('\n=== 搜索测试 ===');
const searchResults = searchGames('truck');
console.log(`搜索 "truck" 结果: ${searchResults.length} 个游戏`);
searchResults.forEach(game => {
  console.log(`- ${game.title}`);
});

console.log('\n=== 单个游戏测试 ===');
const testGame = getGameBySlug('super-motocross');
if (testGame) {
  console.log(`找到游戏: ${testGame.title}`);
  console.log(`URL: ${testGame.url}`);
} else {
  console.log('未找到测试游戏');
}

console.log('\n=== 数据验证完成 ==='); 