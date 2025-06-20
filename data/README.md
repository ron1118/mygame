# 游戏数据文件夹

这个文件夹专门用于存放游戏相关的数据和URL。

## 文件说明

### `games.ts`
- 包含所有游戏的基本信息和URL
- 定义了游戏数据类型接口
- 提供了游戏查询和筛选的实用函数

## 游戏数据格式

每个游戏对象包含以下字段：

```typescript
{
  title: string;      // 游戏标题
  slug: string;       // 游戏唯一标识符（用于URL）
  cover: string;      // 游戏封面图片URL
  category: string;   // 游戏分类
  desc: string;       // 游戏描述
  url: string;        // 游戏试玩URL
}
```

## 使用方法

在组件中导入游戏数据：

```typescript
import { games, getGamesByCategory, getGameBySlug, searchGames } from '@/data/games';

// 获取所有游戏
const allGames = games;

// 根据分类获取游戏
const sportsGames = getGamesByCategory('体育');

// 根据slug获取单个游戏
const game = getGameBySlug('super-motocross');

// 搜索游戏
const searchResults = searchGames('摩托');
```

## 添加新游戏

在 `games.ts` 文件的 `games` 数组中添加新的游戏对象即可。

## 封面图片说明

- 方形封面：使用 `512x512.jpg` 后缀
- 横版封面：使用 `512x384.jpg` 后缀 