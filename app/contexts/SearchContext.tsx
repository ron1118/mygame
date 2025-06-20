"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 搜索上下文类型
interface SearchContextType {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  performSearch: (keyword: string) => void;
  clearSearch: () => void;
}

// 创建上下文
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// 搜索提供者组件
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchKeyword, setSearchKeywordState] = useState("");
  const router = useRouter();

  // 设置搜索关键词
  const setSearchKeyword = (keyword: string) => {
    setSearchKeywordState(keyword);
  };

  // 执行搜索
  const performSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    
    // 保存搜索关键词
    setSearchKeywordState(keyword);
    
    // 跳转到搜索结果页面或主页面并传递搜索参数
    const searchParams = new URLSearchParams();
    searchParams.set('q', keyword.trim());
    
    // 如果当前在主页面，则刷新页面并传递搜索参数
    if (window.location.pathname === '/') {
      window.location.href = `/?${searchParams.toString()}`;
    } else {
      // 如果不在主页面，则跳转到主页面
      router.push(`/?${searchParams.toString()}`);
    }
    
    console.log('执行搜索:', keyword);
  };

  // 清除搜索
  const clearSearch = () => {
    setSearchKeywordState("");
  };

  return (
    <SearchContext.Provider value={{ 
      searchKeyword, 
      setSearchKeyword, 
      performSearch, 
      clearSearch 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

// 使用搜索上下文的钩子
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 