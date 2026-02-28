import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, mockUser } from '@/store';
import { Music, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模拟登录
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟登录成功
    setUser(mockUser);
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Music className="w-7 h-7 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient">
            MusicFlow
          </span>
        </Link>

        {/* 登录表单 */}
        <div className="p-8 rounded-2xl bg-surface/50 border border-border/50 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold mb-2">欢迎回来</h1>
            <p className="text-text-secondary">登录你的账户继续创作</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-accent text-white font-medium btn-glow disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  登录中...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  登录
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface/50 text-text-muted">或</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl border border-border hover:border-accent/50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            使用 Google 登录
          </button>

          <p className="text-center text-text-secondary mt-6">
            还没有账户？{' '}
            <Link to="/register" className="text-accent-light hover:underline">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setIsLoading(true);

    // 模拟注册
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟注册成功
    setUser({
      ...mockUser,
      name,
      email,
    });
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Music className="w-7 h-7 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient">
            MusicFlow
          </span>
        </Link>

        {/* 注册表单 */}
        <div className="p-8 rounded-2xl bg-surface/50 border border-border/50 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold mb-2">创建账户</h1>
            <p className="text-text-secondary">开始你的音乐创作之旅</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="你的名字"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-elevated border border-border input-focus"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-accent text-white font-medium btn-glow disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  注册中...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  创建账户
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          <p className="text-center text-text-secondary mt-6">
            已有账户？{' '}
            <Link to="/login" className="text-accent-light hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
