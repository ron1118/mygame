"use client";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, mode: initialMode }: AuthModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 当初始模式改变时，更新内部状态
  if (initialMode !== mode) {
    setMode(initialMode);
  }

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = t('usernameRequired');
    }
    
    if (mode === 'register') {
      if (!formData.email.trim()) {
        newErrors.email = t('emailRequired');
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = t('invalidEmail');
      }
    }
    
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordTooShort');
    }
    
    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('confirmPasswordRequired');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordMismatch');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false);
      alert(mode === 'login' ? t('loginSuccess') : t('registerSuccess'));
      onClose();
      // 重置表单
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 animate-fade-in-scale max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">
            {mode === 'login' ? t('login') : t('register')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="关闭"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('username')}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all ${
                errors.username 
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
              placeholder={t('usernamePlaceholder')}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
                placeholder={t('emailPlaceholder')}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
              placeholder={t('passwordPlaceholder')}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
                placeholder={t('confirmPasswordPlaceholder')}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {mode === 'login' ? t('loginLoading') : t('registerLoading')}
              </div>
            ) : (
              mode === 'login' ? t('login') : t('register')
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {mode === 'login' ? t('noAccount') : t('hasAccount')}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 transition-colors"
              onClick={switchMode}
            >
              {mode === 'login' ? t('registerNow') : t('loginNow')}
            </button>
          </p>
        </div>

        {mode === 'login' && (
          <div className="mt-4 text-center">
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              {t('forgotPassword')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 