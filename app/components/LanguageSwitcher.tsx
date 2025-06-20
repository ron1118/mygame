"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Portal from "./Portal";

interface LanguageSwitcherProps {
  className?: string;
}

// 语言配置
const languages = {
  zh: {
    name: '中文',
    shortName: '中',
    flag: '🇨🇳',
    code: 'zh'
  },
  en: {
    name: 'English',
    shortName: 'EN',
    flag: '🇺🇸',
    code: 'en'
  }
};

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 只要点击的不是按钮和不是下拉菜单内容，就关闭
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 监听下拉菜单开关，动态设置下拉菜单位置
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 99999
      });
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: 'zh' | 'en') => {
    setLanguage(langCode);
    setIsOpen(false);
    console.log(`Language changed to: ${langCode}`);
  };

  const currentLanguage = languages[language];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 主按钮 */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-white language-switcher-glow transition-all duration-200 hover:scale-105 border border-white/30"
        aria-label="选择语言"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* 背景光晕效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-sm"></div>
        
        {/* 内容 */}
        <div className="relative flex items-center gap-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline text-sm font-semibold text-gray-800">{currentLanguage.name}</span>
          <span className="sm:hidden text-sm font-semibold text-gray-800">{currentLanguage.shortName}</span>
          
          {/* 下拉箭头 */}
          <svg 
            className={`w-4 h-4 transition-transform duration-200 text-gray-600 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <Portal>
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-sm animate-slide-down !z-[99999]"
          >
            {/* 菜单背景光晕 */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-sm"></div>
            <div className="relative py-2">
              {Object.entries(languages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as 'zh' | 'en')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 ${
                    language === code 
                      ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-r-2 border-indigo-500' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  aria-label={`切换到${lang.name}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{lang.name}</span>
                    <span className={`text-xs ${language === code ? 'text-indigo-500' : 'text-gray-500'}`}>
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  {language === code && (
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
} 