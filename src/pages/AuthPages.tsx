import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGithub } from '@/store';
import { Music, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white mb-4">
            <Music className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold">MusicFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">{title}</h1>
          <p className="text-gray-400 mt-2">{subtitle}</p>
        </div>
        <div className="bg-[#16162a] border border-[#2d2d5a] rounded-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await signInWithEmail(email, password);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    const { error: err } = await signInWithGoogle();
    if (err) setError(err);
  };

  const handleGithubLogin = async () => {
    const { error: err } = await signInWithGithub();
    if (err) setError(err);
  };

  return (
    <AuthLayout title="欢迎回来" subtitle="登录你的 MusicFlow 账户">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm text-gray-400 mb-1 block">邮箱</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-12 pl-10 pr-4 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">密码</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 pl-10 pr-4 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>登录</span><ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#2d2d5a]" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#16162a] text-gray-500">或者</span></div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={handleGoogleLogin} className="h-11 border border-[#2d2d5a] rounded-lg text-gray-300 hover:bg-[#1e1e3f] transition flex items-center justify-center gap-2 text-sm">
            Google
          </button>
          <button onClick={handleGithubLogin} className="h-11 border border-[#2d2d5a] rounded-lg text-gray-300 hover:bg-[#1e1e3f] transition flex items-center justify-center gap-2 text-sm">
            GitHub
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        还没有账户？ <Link to="/register" className="text-purple-400 hover:text-purple-300">注册</Link>
      </p>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('密码至少 6 个字符');
      return;
    }
    setLoading(true);
    setError('');

    const { error: err } = await signUpWithEmail(email, password, name);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout title="创建账户" subtitle="开始你的音乐创作之旅">
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm text-gray-400 mb-1 block">名称</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="w-full h-12 pl-10 pr-4 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">邮箱</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-12 pl-10 pr-4 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">密码</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 个字符"
              className="w-full h-12 pl-10 pr-4 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              required
              minLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>注册</span><ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        已有账户？ <Link to="/login" className="text-purple-400 hover:text-purple-300">登录</Link>
      </p>
    </AuthLayout>
  );
}
