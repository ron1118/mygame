# MyGame - 游戏平台

一个基于 Next.js 的在线游戏平台，集成了 GameMonetize 游戏爬虫系统。

## 功能特性

- 🎮 20+ 精选在线游戏
- 🔍 游戏搜索和分类筛选
- 📱 响应式设计，支持移动端
- 🕷️ 自动爬取 GameMonetize 游戏数据
- 🎯 实时游戏数据更新

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS
- **爬虫**: Puppeteer
- **部署**: Vercel (推荐)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行爬虫获取游戏数据

```bash
npm run scrape
```

这将自动爬取 GameMonetize 网站的游戏数据，包括：
- 游戏名称
- 游戏封面
- 游戏分类
- 游戏描述
- iframe 游戏地址

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 项目结构

```
mygame/
├── app/                    # Next.js 应用页面
│   ├── game/[slug]/       # 游戏详情页
│   ├── layout.tsx         # 布局组件
│   └── page.tsx           # 首页
├── data/                  # 游戏数据
│   └── games.ts           # 游戏数据文件
├── scripts/               # 爬虫脚本
│   ├── gamemonetize-scraper.ts  # 主爬虫脚本
│   ├── simple-scraper.ts        # 简化版爬虫
│   ├── scraper.ts               # 基础爬虫
│   └── verify-data.ts           # 数据验证脚本
├── public/                # 静态资源
└── package.json
```

## 爬虫系统

### 爬虫脚本说明

1. **gamemonetize-scraper.ts** - 主要爬虫脚本
   - 自动访问 GameMonetize 主页
   - 提取游戏列表和详情
   - 获取 iframe 游戏地址
   - 自动更新 games.ts 文件

2. **simple-scraper.ts** - 简化版爬虫
   - 更简单的实现方式
   - 适合快速测试

3. **verify-data.ts** - 数据验证脚本
   - 验证爬取的数据完整性
   - 测试搜索和分类功能

### 运行爬虫

```bash
# 运行主爬虫
npm run scrape

# 验证数据
npx ts-node --project tsconfig.scripts.json scripts/verify-data.ts
```

### 爬虫配置

爬虫会自动：
- 设置用户代理避免被拦截
- 等待页面加载完成
- 提取游戏标题、封面、分类、描述
- 获取 iframe 游戏地址
- 生成 URL 友好的 slug
- 保存数据到 JSON 和 TypeScript 文件

## 游戏数据格式

```typescript
interface Game {
  title: string;        // 游戏标题
  slug: string;         // URL 友好的标识符
  cover: string;        // 游戏封面图片
  category: string;     // 游戏分类
  desc: string;         // 游戏描述
  url: string;          // 游戏 iframe 地址
}
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量（如需要）
4. 部署完成

### 本地构建

```bash
npm run build
npm start
```

## 自定义配置

### 添加新的游戏分类

在 `data/games.ts` 中的 `categories` 数组添加新分类：

```typescript
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
  "休闲",
  "你的新分类"  // 添加新分类
];
```

### 修改爬虫设置

在 `scripts/gamemonetize-scraper.ts` 中可以调整：
- 爬取游戏数量限制
- 页面等待时间
- 选择器规则
- 分类映射规则

## 注意事项

1. **图片域名配置**: 已在 `next.config.js` 中配置了 GameMonetize 相关域名
2. **爬虫频率**: 建议不要过于频繁地运行爬虫，避免对目标网站造成压力
3. **数据更新**: 爬虫会自动更新 `data/games.ts` 文件
4. **错误处理**: 爬虫包含错误处理机制，单个游戏失败不会影响整体运行

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
