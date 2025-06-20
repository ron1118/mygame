"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { games, categories } from "../data/games";
import { useSearch } from "./contexts/SearchContext";
import { useLanguage } from "./contexts/LanguageContext";

// 分类图标映射
const categoryIcons: Record<string, string> = {
  "全部": "🎮",
  "动作": "⚡",
  "益智": "🧩",
  "体育": "⚽",
  "冒险": "🗺️",
  "赛车": "🏎️",
  "休闲": "😊",
  "策略": "🎯",
  "射击": "🎯",
  "模拟": "🏭",
  "角色扮演": "👤",
};

// 英文分类映射
const categoryMapping: Record<string, string> = {
  "全部": "all",
  "动作": "action",
  "益智": "puzzle",
  "体育": "sports",
  "冒险": "adventure",
  "赛车": "racing",
  "休闲": "casual",
  "策略": "strategy",
  "射击": "shooting",
  "模拟": "simulation",
  "角色扮演": "rpg",
};

const banners = [
  {
    title: "本周热门",
    subtitle: "HOT THIS WEEK",
    desc: "畅玩本周最受欢迎的精选小游戏，快来挑战高分！",
    image: "/vercel.svg",
    btn: "立即试玩",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    title: "编辑精选",
    subtitle: "EDITOR'S CHOICE",
    desc: "编辑团队为你甄选高品质好玩游戏，体验不一样的乐趣。",
    image: "/next.svg",
    btn: "去看看",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "新游上线",
    subtitle: "NEW RELEASES",
    desc: "最新上线小游戏，抢先体验，发现更多新鲜玩法！",
    image: "/globe.svg",
    btn: "马上体验",
    gradient: "from-green-500 to-teal-500"
  },
];

export default function Home() {
  const { t, language } = useLanguage();
  const { searchKeyword, setSearchKeyword, performSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 页面加载动画
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // 处理URL搜索参数
  useEffect(() => {
    const urlKeyword = searchParams.get('q');
    if (urlKeyword) {
      setSearchKeyword(urlKeyword);
    }
  }, [searchParams, setSearchKeyword]);

  // 轮播自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((idx) => (idx + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 过滤后的游戏列表
  const filteredGames = games.filter((game) => {
    const matchCategory = selectedCategory === "全部" || game.category === selectedCategory;
    const matchKeyword =
      searchKeyword.trim() === "" ||
      (typeof game.title[language] === 'string' && game.title[language].toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (typeof game.desc[language] === 'string' && game.desc[language].toLowerCase().includes(searchKeyword.toLowerCase())) ||
      game.category.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchKeyword);
  };

  // 获取翻译后的banner内容
  const getTranslatedBanner = (banner: any, index: number) => {
    const translations = [
      {
        title: t('hotThisWeek'),
        subtitle: 'HOT THIS WEEK',
        desc: t('hotThisWeekDesc') || "畅玩本周最受欢迎的精选小游戏，快来挑战高分！",
        btn: t('playNow')
      },
      {
        title: t('editorsChoice'),
        subtitle: 'EDITOR\'S CHOICE',
        desc: t('editorsChoiceDesc') || "编辑团队为你甄选高品质好玩游戏，体验不一样的乐趣。",
        btn: t('checkItOut')
      },
      {
        title: t('newReleases'),
        subtitle: 'NEW RELEASES',
        desc: t('newReleasesDesc') || "最新上线小游戏，抢先体验，发现更多新鲜玩法！",
        btn: t('experienceNow')
      }
    ];
    return translations[index] || banner;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('loadingGames') || '正在加载精彩游戏...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* 轮播Banner区 */}
      <section className="relative w-full mb-8 z-10">
        <div className="relative w-full h-80 md:h-[500px] rounded-3xl mx-4 md:mx-8 mt-4">
          {/* Banner内容 */}
          {banners.map((banner, idx) => {
            const translatedBanner = getTranslatedBanner(banner, idx);
            // 推荐游戏分组：本周热门、编辑精选、新游上线
            const bannerGames = [
              games.slice(0, 3), // 本周热门
              games.slice(3, 6), // 编辑精选
              games.slice(6, 9), // 新游上线
            ];
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  idx === bannerIdx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                style={{ zIndex: idx === bannerIdx ? 1 : 0 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
                <div className="relative z-10 flex flex-col justify-center w-full h-full px-8">
                  <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                      <div className="text-sm md:text-base font-semibold text-white/80 mb-2 tracking-wider">
                        {translatedBanner.subtitle}
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        {translatedBanner.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto md:mx-0">
                        {translatedBanner.desc}
                      </p>
                      <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-8 py-4 rounded-2xl shadow-glow transition-all duration-300 hover:scale-105">
                        {translatedBanner.btn}
                      </button>
                    </div>
                  </div>
                  {/* Banner下方推荐游戏卡片 */}
                  <div className="mt-6 flex gap-6 justify-center">
                    {bannerGames[idx].map((game) => (
                      <div
                        key={game.slug}
                        className="min-w-[180px] max-w-[180px] bg-white/90 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 flex flex-col cursor-pointer group"
                        onClick={() => router.push(`/game/${game.slug}`)}
                      >
                        <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2">
                          <Image src={game.cover} alt={String(game.title[language])} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="font-bold text-base line-clamp-1 gradient-text">{String(game.title[language])}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* 左右切换按钮 */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 shadow-lg hover:scale-110 transition-all z-20"
            onClick={() => setBannerIdx((bannerIdx - 1 + banners.length) % banners.length)}
            aria-label={t('previous') || "上一张"}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
              <path d="M16 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 shadow-lg hover:scale-110 transition-all z-20"
            onClick={() => setBannerIdx((bannerIdx + 1) % banners.length)}
            aria-label={t('next') || "下一张"}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
              <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* 指示点 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === bannerIdx 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => setBannerIdx(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 搜索框 - 仅在移动端显示，桌面端使用导航栏搜索 */}
      <section className="w-full max-w-4xl mx-auto px-4 mb-8 lg:hidden">
        <form onSubmit={handleSearch}>
          <div className="relative">
            {/* 搜索框背景阴影 */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            
            {/* 搜索框主体 */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl search-glow border border-white/30 hover:shadow-3xl transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t('searchGames')}
                className="w-full pl-16 pr-20 py-5 rounded-3xl bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-lg font-medium"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
              {/* 搜索按钮 */}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-6 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-r-3xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                aria-label={t('search') || "搜索"}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 分类菜单 */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-8">
        <div className="flex gap-3 md:gap-4 justify-start md:justify-center flex-wrap">
          {Object.entries(categoryIcons).map(([name, icon]) => (
            <button
              key={name}
              className={`flex flex-col items-center px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                selectedCategory === name 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow" 
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
              }`}
              onClick={() => setSelectedCategory(name)}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <span className="font-semibold text-sm">{t(categoryMapping[name] || name)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 游戏列表 */}
      <section className="w-full max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">
            {selectedCategory === "全部" ? `🎮 ${t('allGames')}` : `${categoryIcons[selectedCategory]} ${t(categoryMapping[selectedCategory] || selectedCategory)}类游戏`}
            {searchKeyword && (
              <span className="text-lg text-gray-600 ml-2">
                - {t('searchFor') || '搜索'} "{searchKeyword}"
              </span>
            )}
          </h2>
          <span className="text-gray-500 font-medium">
            {t('totalGames') || '共'} {filteredGames.length} {t('gamesCount')}
          </span>
        </div>
        
        {filteredGames.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg mb-2">{t('noGamesFound')}</p>
            <p className="text-gray-400">{t('tryOtherKeywords')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredGames.map((game, index) => (
              <div
                key={game.slug}
                className="group card p-4 cursor-pointer animate-fade-in-up h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => router.push(`/game/${game.slug}`)}
              >
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={String(game.title[language])}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2 gradient-text line-clamp-1">{String(game.title[language])}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{String(game.desc[language])}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold">
                    {game.category}
                  </span>
                  <button
                    className="ml-auto btn-primary px-3 py-1 text-xs rounded-lg"
                    onClick={() => router.push(`/game/${game.slug}`)}
                  >
                    {t('playNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 底部信息区 */}
      <footer className="w-full mt-16 py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">MyGame</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footerDescription') || '高品质在线小游戏平台，为玩家提供最优质的游戏体验。'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('gameCategories') || '游戏分类'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">{t('actionGames') || '动作游戏'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('puzzleGames') || '益智解谜'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('sportsGames') || '体育竞技'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('adventureGames') || '冒险探索'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('aboutUs') || '关于我们'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">{t('companyIntro') || '公司介绍'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('contactUs') || '联系我们'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('joinUs') || '加入我们'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('partners') || '合作伙伴'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('helpSupport') || '帮助支持'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">{t('userAgreement') || '用户协议'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('privacyPolicy') || '隐私政策'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('faq') || '常见问题'}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('feedback') || '意见反馈'}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MyGame.vip. {t('allRightsReserved') || 'All rights reserved.'} | Powered by Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
