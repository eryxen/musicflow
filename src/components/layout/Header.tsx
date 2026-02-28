import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import {
  Music,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: '仪表板', href: '/dashboard', icon: Music },
  { name: '音频分离', href: '/separation', icon: Volume2 },
  { name: 'AI生成', href: '/generation', icon: Sparkles },
  { name: '音乐库', href: '/library', icon: Music },
];

export function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">
              MusicFlow
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/20 text-accent-light'
                      : 'text-text-secondary hover:text-foreground hover:bg-surface-elevated'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 用户菜单 */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-surface-elevated transition-colors"
                >
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg"
                  />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 py-2 rounded-xl bg-surface-elevated border border-border shadow-card animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-text-muted">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent-light capitalize">
                        {user.subscription_plan}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-surface transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        设置
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-surface transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-accent text-white btn-glow"
                >
                  注册
                </Link>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-slide-up">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/20 text-accent-light'
                      : 'text-text-secondary hover:text-foreground hover:bg-surface-elevated'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
