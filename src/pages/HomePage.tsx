import { Link } from 'react-router-dom';
import {
  Music,
  Sparkles,
  Volume2,
  Zap,
  Cloud,
  Shield,
  ArrowRight,
  Play,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Volume2,
    title: '音频分离',
    description: '将音乐分离为人声、伴奏、鼓点、贝斯等独立轨道',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Sparkles,
    title: 'AI音乐生成',
    description: '描述你想要的音乐风格，AI为你创作独特的旋律',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Music,
    title: '音乐库管理',
    description: '保存所有创作和分离结果，随时随地访问',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cloud,
    title: '云端运行',
    description: '无需高端显卡，随时随地使用强大AI功能',
    color: 'from-emerald-500 to-teal-500',
  },
];

const testimonials = [
  {
    name: 'DJ小林',
    role: '电子音乐制作人',
    content: '音频分离功能帮我快速提取人声，制作混音作品效率提高太多了！',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dj1',
  },
  {
    name: '小美',
    role: '短视频创作者',
    content: 'AI生成背景音乐功能太棒了，再也不用担心版权问题！',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creator1',
  },
  {
    name: '阿强',
    role: '独立音乐人',
    content: '云端运行太方便了，出门用手机也能处理音乐。',
    avatar: 'https://api/7.x/.dicebear.comavataaars/svg?seed=musician1',
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm mb-8 animate-fade-in">
              <Zap className="w-4 h-4" />
              下一代AI音乐创作平台
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-gradient">释放你的音乐创造力</span>
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up animate-delay-100">
              三位一体音乐平台：音频分离、AI生成、云端运行。
              无需技术背景，人人都能创作专业级音乐作品。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-accent text-white font-medium text-lg btn-glow"
              >
                免费开始创作
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-text-secondary hover:text-foreground hover:border-accent/50 transition-colors font-medium text-lg"
              >
                <Play className="w-5 h-5" />
                观看演示
              </Link>
            </div>

            {/* 用户数量 */}
            <div className="mt-16 flex items-center justify-center gap-8 text-text-muted animate-fade-in animate-delay-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ))}
                </div>
                <span className="text-sm">10,000+ 创作者</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">4.9/5 满意度</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              强大的音乐工具
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              整合业界领先的AI技术，为你提供一站式音乐创作解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-surface/50 border border-border/50 backdrop-blur-sm card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              用户评价
            </h2>
            <p className="text-text-secondary text-lg">
              来自真实用户的使用体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-surface/50 border border-border/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold mb-4">
                准备好开始了吗？
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                加入 thousands of 创作者的行列，用AI释放你的音乐潜能
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-accent text-white font-medium text-lg btn-glow"
                >
                  免费注册
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-2 text-text-muted">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">无需信用卡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold">MusicFlow</span>
            </div>
            <p className="text-text-muted text-sm">
              © 2024 MusicFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
