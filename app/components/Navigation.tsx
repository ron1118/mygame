"use client";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthModal from "./AuthModal";
import { useLanguage } from "../contexts/LanguageContext";
import { useSearch } from "../contexts/SearchContext";

export default function Navigation() {
  const { t } = useLanguage();
  const { searchKeyword, setSearchKeyword, performSearch } = useSearch();
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
    setMobileMenuOpen(false); // 关闭移动端菜单
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchKeyword);
  };

  return (
    <>
      {/* 顶部导航栏 */}
      <header className="w-full glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* LOGO/名称 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl tracking-tight gradient-text">MyGame</span>
                <div className="text-xs text-gray-500 -mt-1">VIP游戏厅</div>
              </div>
              <div className="sm:hidden">
                <span className="font-bold text-xl tracking-tight gradient-text">MyGame</span>
              </div>
            </div>
            
            {/* 桌面端搜索框 */}
            <div className="hidden lg:block relative flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  {/* 搜索框背景阴影 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                  
                  {/* 搜索框主体 */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl search-glow border border-white/30 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchKeyword}
                      onChange={handleSearchChange}
                      className="w-full pl-12 pr-16 py-3 rounded-2xl bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base font-medium"
                    />
                    {/* 搜索按钮 */}
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 px-4 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-r-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                      aria-label="搜索"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* 右侧功能区 */}
            <div className="flex items-center gap-4">
              {/* 语言切换 - 桌面端 */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              
              {/* 登录/注册 - 桌面端 */}
              <div className="hidden md:flex items-center gap-2">
                <button 
                  className="bg-white/90 text-indigo-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white transition-all duration-300 hover:scale-105 shadow-sm"
                  onClick={() => openAuthModal('login')}
                >
                  {t('login')}
                </button>
                <button 
                  className="bg-white/90 text-indigo-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white transition-all duration-300 hover:scale-105 shadow-sm"
                  onClick={() => openAuthModal('register')}
                >
                  {t('register')}
                </button>
              </div>
              
              {/* 移动端菜单按钮 */}
              <button
                className="md:hidden p-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="菜单"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 animate-fade-in-up">
              {/* 移动端搜索框 */}
              <div className="mb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    {/* 搜索框背景阴影 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                    
                    {/* 搜索框主体 */}
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl search-glow border border-white/30">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        className="w-full pl-12 pr-16 py-4 rounded-2xl bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base font-medium"
                      />
                      {/* 搜索按钮 */}
                      <button
                        type="submit"
                        className="absolute inset-y-0 right-0 px-4 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-r-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                        aria-label="搜索"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* 移动端语言切换 */}
              <div className="mb-4">
                <LanguageSwitcher />
              </div>
              
              {/* 移动端登录/注册 */}
              <div className="flex flex-col gap-3">
                <button 
                  className="w-full bg-white/90 text-indigo-600 font-semibold px-4 py-3 rounded-xl text-sm hover:bg-white transition-all duration-300 shadow-md"
                  onClick={() => openAuthModal('login')}
                >
                  {t('login')}
                </button>
                <button 
                  className="w-full bg-white/90 text-indigo-600 font-semibold px-4 py-3 rounded-xl text-sm hover:bg-white transition-all duration-300 shadow-md"
                  onClick={() => openAuthModal('register')}
                >
                  {t('register')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* 公告栏 */}
      <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-3 text-sm font-medium relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow"></div>
        <div className="relative z-10 flex items-center justify-center gap-2 px-4">
          <span className="text-lg">🎮</span>
          <span className="hidden sm:inline">{t('welcomeMessage')}</span>
          <span className="sm:hidden">{t('welcomeMessageShort')}</span>
          <span className="text-lg">🎮</span>
        </div>
      </div>

      {/* 登录/注册模态框 */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
      />
    </>
  );
} 