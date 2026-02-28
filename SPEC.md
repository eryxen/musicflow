# 音乐一体化平台 - 技术规格文档

## 1. 项目概述

### 项目名称
MusicFlow - 音乐一体化平台

### 项目类型
SaaS Web应用程序

### 核心功能摘要
三位一体音乐创作平台：音频分离 + AI音乐生成 + 音乐库管理

### 目标用户
- DJ/混音师
- 短视频创作者
- 翻唱爱好者
- 独立音乐人
- 音乐小白

---

## 2. UI/UX 规格

### 2.1 布局结构

#### 页面结构
- **顶部导航栏** (64px高度)
  - Logo (左侧)
  - 主要导航链接 (中央)
  - 用户菜单 (右侧)

- **主内容区域**
  - 侧边栏 (280px, 可折叠)
  - 内容区域 (自适应)

- **底部播放器** (80px高度, 固定)
  - 播放控制
  - 进度条
  - 音量控制

#### 响应式断点
- 移动端: < 640px (单列布局)
- 平板: 640px - 1024px (双列布局)
- 桌面: > 1024px (完整布局)

### 2.2 视觉设计

#### 配色方案
```css
/* 主色调 - 深邃夜空 */
--primary: #0f0f23;
--primary-light: #1a1a3e;

/* 强调色 - 紫罗兰渐变 */
--accent: #7c3aed;
--accent-light: #a78bfa;
--accent-glow: rgba(124, 58, 237, 0.3);

/* 辅助色 */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;

/* 中性色 */
--surface: #16162a;
--surface-elevated: #1e1e3f;
--border: #2d2d5a;

/* 文字颜色 */
--text-primary: #f8fafc;
--text-secondary: #94a3b8;
--text-muted: #64748b;
```

#### 字体系统
- **标题字体**: "Outfit", sans-serif (Google Fonts)
- **正文字体**: "DM Sans", sans-serif (Google Fonts)
- **等宽字体**: "JetBrains Mono", monospace

#### 字号系统
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

#### 间距系统
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

#### 视觉效果
- **卡片阴影**: `0 4px 20px rgba(0, 0, 0, 0.3)`
- **发光效果**: `0 0 30px var(--accent-glow)`
- **毛玻璃效果**: `backdrop-filter: blur(12px)`
- **渐变叠加**: `linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)`

#### 动画效果
- **过渡时长**: 200ms (快速), 300ms (标准), 500ms (慢速)
- **缓动函数**: cubic-bezier(0.4, 0, 0.2, 1)
- **悬停缩放**: scale(1.02)
- **按钮点击**: scale(0.98)

### 2.3 组件规格

#### 导航组件
- 顶部导航: 固定定位, 毛玻璃背景
- 侧边栏: 可折叠, 动画过渡
- 移动端: 汉堡菜单 + 底部导航

#### 按钮组件
- **主要按钮**: 渐变背景, 圆角12px, 发光悬停效果
- **次要按钮**: 边框样式, 透明背景
- **图标按钮**: 40px x 40px, 圆形
- **状态**: default, hover, active, disabled, loading

#### 输入组件
- **文本输入**: 48px高度, 圆角8px, 边框发光聚焦
- **文件上传**: 拖拽区域, 虚线边框, 图标提示
- **下拉选择**: 自定义样式, 动画展开

#### 卡片组件
- **项目卡片**: 16:9图片比例, 圆角16px, 悬停提升效果
- **统计卡片**: 图标 + 数字 + 标签布局
- **音乐卡片**: 专辑封面 + 标题 + 艺术家 + 播放按钮

#### 播放器组件
- **进度条**: 可拖拽, 渐变填充, 时间提示
- **音量控制**: 滑块 + 图标联动
- **播放列表**: 滚动列表, 当前播放高亮

---

## 3. 功能规格

### 3.1 用户系统

#### 认证功能
- 邮箱/密码注册
- 邮箱/密码登录
- 社交登录 (Google, GitHub)
- 密码重置
- 邮箱验证

#### 用户资料
- 头像上传
- 显示名称
- 个人简介
- 订阅计划显示

#### 账户管理
- 修改密码
- 更新资料
- 订阅管理
- 使用统计

### 3.2 音频分离功能

#### 上传功能
- 支持格式: MP3, WAV, FLAC, M4A, OGG
- 最大文件大小: 50MB
- 拖拽上传 + 点击选择
- 上传进度显示

#### 分离选项
- **人声/伴奏分离**: Vocals + Instrumental
- **多轨道分离**:
  - 人声 (Vocals)
  - 伴奏 (Instrumental)
  - 鼓点 (Drums)
  - 贝斯 (Bass)
  - 钢琴 (Piano)
  - 吉他 (Guitar)

#### 处理流程
1. 文件上传 (显示进度)
2. 选择分离模型
3. 开始处理 (显示状态)
4. 分离完成 (通知用户)
5. 预览和下载

#### 输出功能
- 分轨下载 (单独下载每个轨道)
- 批量下载 (ZIP打包)
- 音质选择 (128kbps, 320kbps, 无损)

### 3.3 AI音乐生成功能

#### 生成方式
- **文本描述**: 描述想要的音乐风格和元素
- **参数选择**:
  - 音乐风格 (流行, 电子, 古典, 爵士等)
  - 情绪 (欢快, 悲伤, 放松, 激烈等)
  - 时长 (15s, 30s, 60s, 90s, 120s)
  - BPM (60-200)
  - 调式 (C, C#, D, etc.)

#### 生成流程
1. 输入描述或选择参数
2. 选择生成模型 (Suno/MiniMax)
3. 生成中 (显示进度和示例)
4. 生成完成 (展示多个结果)
5. 预览和编辑
6. 导出保存

#### 高级功能
- AI和声生成
- 旋律续写
- 风格迁移
- 歌词匹配

### 3.4 音乐库功能

#### 音乐管理
- 我的音乐 (上传/生成)
- 收藏歌单
- 创建歌单
- 最近播放
- 播放历史

#### 播放功能
- 顺序播放
- 单曲循环
- 列表循环
- 随机播放
- 音质选择

#### 搜索和筛选
- 搜索歌曲/艺术家
- 按类型筛选
- 按日期筛选
- 按标签筛选

### 3.5 项目管理

#### 项目概念
- 每个分离/生成任务 = 一个项目
- 项目包含: 原始文件, 处理结果, 元数据

#### 项目功能
- 项目列表 (卡片/列表视图)
- 项目详情
- 项目重命名
- 项目删除
- 项目导出
- 项目分享

### 3.6 仪表板

#### 统计概览
- 总处理次数
- 存储空间使用
- 账户类型
- 会员到期时间

#### 快捷操作
- 快速上传
- 快速生成
- 最近项目
- 收藏音乐

#### 使用趋势
- 每日/每周/每月统计图表
- 最常用功能
- 使用时长

---

## 4. 技术架构

### 4.1 前端技术栈
- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式)
- React Router v6 (路由)
- Zustand (状态管理)
- React Query (数据获取)
- Lucide React (图标)

### 4.2 后端服务
- Supabase (数据库 + 认证 + 存储)
- API服务 (音频分离 + AI生成)

### 4.3 数据模型

#### 用户表 (users)
```sql
id: uuid
email: string
name: string
avatar_url: string
subscription_plan: enum ('free', 'basic', 'pro')
storage_used: integer
created_at: timestamp
updated_at: timestamp
```

#### 项目表 (projects)
```sql
id: uuid
user_id: uuid (FK)
name: string
type: enum ('separation', 'generation')
status: enum ('processing', 'completed', 'failed')
input_file_url: string
output_files: jsonb
settings: jsonb
created_at: timestamp
updated_at: timestamp
```

#### 音乐库表 (library)
```sql
id: uuid
user_id: uuid (FK)
title: string
artist: string
album: string
duration: integer
file_url: string
cover_url: string
tags: string[]
is_favorite: boolean
play_count: integer
created_at: timestamp
```

#### 歌单表 (playlists)
```sql
id: uuid
user_id: uuid (FK)
name: string
description: string
cover_url: string
is_public: boolean
tracks: jsonb
created_at: timestamp
updated_at: timestamp
```

---

## 5. 验收标准

### 5.1 功能验收
- [ ] 用户可以注册和登录
- [ ] 用户可以上传音频文件
- [ ] 音频分离功能正常工作
- [ ] AI音乐生成功能正常工作
- [ ] 音乐库可以正常播放音乐
- [ ] 项目管理功能完整
- [ ] 仪表板显示正确统计

### 5.2 视觉验收
- [ ] 配色方案符合规格
- [ ] 字体正确加载
- [ ] 响应式布局正常
- [ ] 动画效果流畅
- [ ] 深色主题一致

### 5.3 性能验收
- [ ] 首屏加载 < 3秒
- [ ] 路由切换 < 500ms
- [ ] 无明显卡顿
- [ ] 文件上传进度准确

### 5.4 兼容性验收
- [ ] Chrome 最新版正常
- [ ] Firefox 最新版正常
- [ ] Safari 最新版正常
- [ ] 移动端布局正常
