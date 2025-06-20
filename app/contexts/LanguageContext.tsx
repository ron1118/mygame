"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 语言类型定义
export type Language = 'zh' | 'en';

// 翻译内容
const translations = {
  zh: {
    // 导航栏
    login: '登录',
    register: '注册',
    searchPlaceholder: '搜索游戏...',
    welcomeMessage: '欢迎来到 MyGame VIP 游戏厅！准备好开启你的游戏冒险了吗？',
    welcomeMessageShort: '欢迎来到 MyGame VIP 游戏厅！',
    
    // 主页面
    hotThisWeek: '本周热门',
    hotThisWeekDesc: '畅玩本周最受欢迎的精选小游戏，快来挑战高分！',
    editorsChoice: '编辑精选',
    editorsChoiceDesc: '编辑团队为你甄选高品质好玩游戏，体验不一样的乐趣。',
    newReleases: '新游上线',
    newReleasesDesc: '最新上线小游戏，抢先体验，发现更多新鲜玩法！',
    playNow: '立即试玩',
    checkItOut: '去看看',
    experienceNow: '马上体验',
    searchGames: '搜索游戏、分类或标签...',
    allGames: '全部游戏',
    gamesCount: '款游戏',
    noGamesFound: '暂无符合条件的游戏',
    tryOtherKeywords: '试试其他分类或关键词吧',
    startGame: '开始游戏',
    loadingGames: '正在加载精彩游戏...',
    search: '搜索',
    searchFor: '搜索',
    totalGames: '共',
    previous: '上一张',
    next: '下一张',
    
    // 分类
    all: '全部',
    action: '动作',
    puzzle: '益智',
    sports: '体育',
    adventure: '冒险',
    racing: '赛车',
    casual: '休闲',
    strategy: '策略',
    shooting: '射击',
    simulation: '模拟',
    rpg: '角色扮演',
    
    // 认证模态框
    username: '用户名',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    usernamePlaceholder: '请输入用户名',
    emailPlaceholder: '请输入邮箱',
    passwordPlaceholder: '请输入密码',
    confirmPasswordPlaceholder: '请再次输入密码',
    loginSuccess: '登录成功！',
    registerSuccess: '注册成功！',
    loginLoading: '登录中...',
    registerLoading: '注册中...',
    noAccount: '还没有账号？',
    hasAccount: '已有账号？',
    registerNow: '立即注册',
    loginNow: '立即登录',
    forgotPassword: '忘记密码？',
    
    // 错误信息
    usernameRequired: '用户名不能为空',
    emailRequired: '邮箱不能为空',
    invalidEmail: '请输入有效的邮箱地址',
    passwordRequired: '密码不能为空',
    passwordTooShort: '密码至少6位',
    confirmPasswordRequired: '请确认密码',
    passwordMismatch: '两次输入的密码不一致',
    
    // 底部信息
    footerDescription: '高品质在线小游戏平台，为玩家提供最优质的游戏体验。',
    gameCategories: '游戏分类',
    actionGames: '动作游戏',
    puzzleGames: '益智解谜',
    sportsGames: '体育竞技',
    adventureGames: '冒险探索',
    aboutUs: '关于我们',
    companyIntro: '公司介绍',
    contactUs: '联系我们',
    joinUs: '加入我们',
    partners: '合作伙伴',
    helpSupport: '帮助支持',
    userAgreement: '用户协议',
    privacyPolicy: '隐私政策',
    faq: '常见问题',
    feedback: '意见反馈',
    allRightsReserved: '版权所有',
    
    // 游戏详情页面
    gameNotFound: '未找到该游戏',
    gameNotFoundDesc: '游戏可能已被移除或链接失效',
    backToHome: '返回首页',
    loadingGame: '正在加载游戏...',
    back: '返回',
    openInNewWindow: '新窗口打开',
    gameCount: '游戏数量',
    freeGames: '免费游戏',
    onlineService: '在线服务',
    gameScreen: '游戏画面',
    gameLoaded: '游戏已加载',
    clickStartGame: '点击"开始游戏"按钮开始游戏',
    recommendedGames: '推荐游戏',
    moreGames: '更多游戏',
    comingSoon: '敬请期待',
  },
  en: {
    // Navigation
    login: 'Login',
    register: 'Register',
    searchPlaceholder: 'Search games...',
    welcomeMessage: 'Welcome to MyGame VIP Game Hall! Ready to start your gaming adventure?',
    welcomeMessageShort: 'Welcome to MyGame VIP Game Hall!',
    
    // Home page
    hotThisWeek: 'HOT THIS WEEK',
    hotThisWeekDesc: 'Play the most popular selected mini-games this week, come challenge high scores!',
    editorsChoice: 'EDITOR\'S CHOICE',
    editorsChoiceDesc: 'Our editorial team selects high-quality fun games for you, experience different pleasures.',
    newReleases: 'NEW RELEASES',
    newReleasesDesc: 'Latest online mini-games, experience first, discover more fresh gameplay!',
    playNow: 'Play Now',
    checkItOut: 'Check It Out',
    experienceNow: 'Experience Now',
    searchGames: 'Search games, categories or tags...',
    allGames: 'All Games',
    gamesCount: 'games',
    noGamesFound: 'No games found',
    tryOtherKeywords: 'Try other categories or keywords',
    startGame: 'Start Game',
    loadingGames: 'Loading exciting games...',
    search: 'Search',
    searchFor: 'Search for',
    totalGames: 'Total',
    previous: 'Previous',
    next: 'Next',
    
    // Categories
    all: 'All',
    action: 'Action',
    puzzle: 'Puzzle',
    sports: 'Sports',
    adventure: 'Adventure',
    racing: 'Racing',
    casual: 'Casual',
    strategy: 'Strategy',
    shooting: 'Shooting',
    simulation: 'Simulation',
    rpg: 'RPG',
    
    // Auth modal
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    usernamePlaceholder: 'Enter username',
    emailPlaceholder: 'Enter email',
    passwordPlaceholder: 'Enter password',
    confirmPasswordPlaceholder: 'Confirm password',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    loginLoading: 'Logging in...',
    registerLoading: 'Registering...',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    registerNow: 'Register Now',
    loginNow: 'Login Now',
    forgotPassword: 'Forgot Password?',
    
    // Error messages
    usernameRequired: 'Username is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters',
    confirmPasswordRequired: 'Please confirm password',
    passwordMismatch: 'Passwords do not match',
    
    // Footer
    footerDescription: 'High-quality online mini-game platform, providing players with the best gaming experience.',
    gameCategories: 'Game Categories',
    actionGames: 'Action Games',
    puzzleGames: 'Puzzle Games',
    sportsGames: 'Sports Games',
    adventureGames: 'Adventure Games',
    aboutUs: 'About Us',
    companyIntro: 'Company Introduction',
    contactUs: 'Contact Us',
    joinUs: 'Join Us',
    partners: 'Partners',
    helpSupport: 'Help & Support',
    userAgreement: 'User Agreement',
    privacyPolicy: 'Privacy Policy',
    faq: 'FAQ',
    feedback: 'Feedback',
    allRightsReserved: 'All rights reserved.',
    
    // Game detail page
    gameNotFound: 'Game Not Found',
    gameNotFoundDesc: 'The game may have been removed or the link is invalid',
    backToHome: 'Back to Home',
    loadingGame: 'Loading game...',
    back: 'Back',
    openInNewWindow: 'Open in New Window',
    gameCount: 'Game Count',
    freeGames: 'Free Games',
    onlineService: 'Online Service',
    gameScreen: 'Game Screen',
    gameLoaded: 'Game Loaded',
    clickStartGame: 'Click "Start Game" button to begin',
    recommendedGames: 'Recommended Games',
    moreGames: 'More Games',
    comingSoon: 'Coming Soon',
  }
};

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  // 初始化语言设置
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    const initialLang = savedLang || browserLang;
    setLanguageState(initialLang);
  }, []);

  // 设置语言
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // 这里可以添加更多语言切换逻辑，比如重新加载页面
    // window.location.reload();
  };

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言上下文的钩子
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 