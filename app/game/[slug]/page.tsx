"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getGameBySlug } from "../../../data/games";
import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function GameDetail() {
  const { t, language } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const game = getGameBySlug(slug);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center py-20">
          <div className="text-6xl mb-6">😵</div>
          <div className="text-2xl font-bold mb-4 text-gray-700">{t('gameNotFound') || '未找到该游戏'}</div>
          <p className="text-gray-500 mb-8">{t('gameNotFoundDesc') || '游戏可能已被移除或链接失效'}</p>
          <button 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={() => router.push('/')}
          >
            {t('backToHome') || '返回首页'}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('loadingGame') || '正在加载游戏...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* 返回按钮 */}
        <button 
          className="mb-8 text-gray-600 hover:text-indigo-600 font-medium flex items-center gap-2 transition-all hover:scale-105" 
          onClick={() => router.back()}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t('back') || '返回'}
        </button>
        
        {/* 游戏信息卡片 */}
        <div className="card p-8 mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* 游戏封面 */}
            <div className="w-full lg:w-80 h-60 lg:h-80 bg-gray-100 rounded-3xl overflow-hidden flex-shrink-0 relative group">
              <Image 
                src={game.cover} 
                alt={String(game.title[language])} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {game.category}
              </div>
            </div>
            
            {/* 游戏信息 */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold mb-3 gradient-text leading-tight">
                  {String(game.title[language])}
                </h1>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-glow">
                  {game.category}
                </div>
              </div>
              
              <div className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl">
                {String(game.desc[language])}
              </div>
              
              {/* 1. 基本信息补充 */}
              <div className="mb-4 flex flex-wrap gap-4 items-center text-sm text-gray-500">
                <span>{String(t('releaseDate')) + '：' + ('releaseDate' in game ? game.releaseDate : '2024-01-01')}</span>
                <span>{String(t('tags')) + '：' + ('tags' in game && Array.isArray(game.tags) ? game.tags.join('、') : String(t('none')))}</span>
                <span>{String(t('rating')) + '：' + ('rating' in game ? game.rating : String(t('noRating')))}</span>
                <button className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-indigo-200 transition">{String(t('favorite'))}</button>
                <button className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-purple-200 transition">{String(t('share'))}</button>
              </div>
              
              {/* 2. 玩法与操作说明区块 */}
              <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold mb-2">{String(t('howToPlay'))}</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>{String(t('goal')) + '：' + ('goal' in game ? game.goal : String(t('defaultGoal')))}</li>
                  <li>{String(t('controls')) + '：' + ('controls' in game ? game.controls : String(t('defaultControls')))}</li>
                  <li>{String(t('tutorial')) + '：' + ('tutorial' in game ? game.tutorial : String(t('defaultTutorial')))}</li>
                  <li>{String(t('faq')) + '：' + ('faq' in game ? game.faq : String(t('none')))}</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => {
                    setIsGameStarted(true);
                    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
                    if (iframe) {
                      iframe.src = game.url;
                    }
                  }}
                >
                  {t('startGame')}
                </button>
                <button 
                  className="btn-secondary text-lg px-8 py-4 rounded-2xl"
                  onClick={() => window.open(game.url, '_blank')}
                >
                  🔗 {t('openInNewWindow') || '新窗口打开'}
                </button>
              </div>
              
              {/* 游戏统计 */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-indigo-600">20+</div>
                  <div className="text-sm text-gray-500">{t('gameCount') || '游戏数量'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">10+</div>
                  <div className="text-sm text-gray-500">{t('gameCategories') || '游戏分类'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-500">{t('freeGames') || '免费游戏'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-500">{t('onlineService') || '在线服务'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 游戏画面 */}
        <div className="card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
                🎮 {t('gameScreen') || '游戏画面'}
              </h2>
              {isGameStarted && (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('gameLoaded') || '游戏已加载'}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center relative">
            {!isGameStarted ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-gray-500 text-lg mb-4">{t('clickStartGame') || '点击"开始游戏"按钮开始游戏'}</p>
                <button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => {
                    setIsGameStarted(true);
                    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
                    if (iframe) {
                      iframe.src = game.url;
                    }
                  }}
                >
                  {t('startGame')}
                </button>
              </div>
            ) : (
              <iframe
                id="game-iframe"
                src={game.url}
                title={String(game.title[language])}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 