import { useState, useCallback } from 'react';
import { useProjectStore } from '@/store';
import {
  Upload,
  FileAudio,
  Download,
  Play,
  Pause,
  Trash2,
  Volume2,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { SeparationModel, SeparationOutput } from '@/types';

const separationModels: { id: SeparationModel; name: string; description: string }[] = [
  { id: 'vocals', name: '人声提取', description: '提取人声部分' },
  { id: 'instrumental', name: '伴奏提取', description: '提取伴奏部分' },
  { id: 'full', name: '完整分离', description: '分离所有轨道' },
  { id: 'drums', name: '鼓点', description: '提取鼓点轨道' },
  { id: 'bass', name: '贝斯', description: '提取贝斯轨道' },
  { id: 'piano', name: '钢琴', description: '提取钢琴轨道' },
  { id: 'guitar', name: '吉他', description: '提取吉他轨道' },
];

export function SeparationPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedModel, setSelectedModel] = useState<SeparationModel>('full');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [outputFiles, setOutputFiles] = useState<SeparationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addProject } = useProjectStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3', 'audio/x-m4a', 'audio/ogg'];
    if (!validTypes.includes(file.type)) {
      setError('不支持的文件格式，请上传 MP3、WAV、FLAC、M4A 或 OGG 文件');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('文件大小超过 50MB 限制');
      return;
    }
    setSelectedFile(file);
    setError(null);
    setOutputFiles(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSeparate = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    setOutputFiles(null);
    setError(null);

    // 模拟处理过程
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // 模拟处理完成
    setTimeout(() => {
      clearInterval(interval);
      setProcessingProgress(100);
      setIsProcessing(false);

      // 模拟输出文件
      setOutputFiles({
        vocals: '/output/vocals.mp3',
        instrumental: '/output/instrumental.mp3',
        drums: '/output/drums.mp3',
        bass: '/output/bass.mp3',
      });

      // 添加到项目列表
      addProject({
        id: Date.now().toString(),
        user_id: '1',
        name: selectedFile.name.replace(/\.[^/.]+$/, ''),
        type: 'separation',
        status: 'completed',
        input_file_url: URL.createObjectURL(selectedFile),
        input_file_name: selectedFile.name,
        output_files: {
          vocals: '/output/vocals.mp3',
          instrumental: '/output/instrumental.mp3',
        },
        settings: { model: selectedModel },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOutputFiles(null);
    setError(null);
    setProcessingProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">音频分离</h1>
        <p className="text-text-secondary">
          将音乐分离为人声、伴奏、鼓点、贝斯等独立轨道
        </p>
      </div>

      {/* 文件上传区域 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative p-12 rounded-2xl border-2 border-dashed transition-all ${
          isDragging
            ? 'border-accent bg-accent/10'
            : 'border-border hover:border-accent/50'
        }`}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center">
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                <FileAudio className="w-8 h-8 text-accent-light" />
              </div>
              <p className="font-medium text-lg mb-1">{selectedFile.name}</p>
              <p className="text-text-muted text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="mt-4 text-sm text-error hover:text-error/80"
              >
                移除文件
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-text-muted" />
              </div>
              <p className="font-medium text-lg mb-1">
                拖拽音频文件到这里，或点击选择
              </p>
              <p className="text-text-muted text-sm">
                支持 MP3、WAV、FLAC、M4A、OGG 格式，最大 50MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/30 text-error">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* 分离选项 */}
      <div className="p-6 rounded-2xl bg-surface/50 border border-border/50">
        <h2 className="font-display text-lg font-semibold mb-4">分离模式</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {separationModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 rounded-xl border transition-all ${
                selectedModel === model.id
                  ? 'bg-accent/20 border-accent text-accent-light'
                  : 'bg-surface-elevated/50 border-border hover:border-accent/50'
              }`}
            >
              <p className="font-medium text-sm">{model.name}</p>
              <p className="text-xs text-text-muted mt-1">{model.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 处理按钮 */}
      {selectedFile && !outputFiles && (
        <button
          onClick={handleSeparate}
          disabled={isProcessing}
          className="w-full py-4 rounded-xl bg-gradient-accent text-white font-medium text-lg btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              处理中 {Math.min(processingProgress, 100).toFixed(0)}%
            </div>
          ) : (
            '开始分离'
          )}
        </button>
      )}

      {/* 处理进度 */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-text-muted">
            <span>处理进度</span>
            <span>{Math.min(processingProgress, 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
            <div
              className="h-full progress-gradient transition-all duration-300"
              style={{ width: `${Math.min(processingProgress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* 输出结果 */}
      {outputFiles && (
        <div className="p-6 rounded-2xl bg-surface/50 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <h2 className="font-display text-lg font-semibold">分离完成</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(outputFiles).map(([key, url]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-accent-light" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">{key}</p>
                    <p className="text-xs text-text-muted">分离轨道</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-surface transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface transition-colors text-accent-light">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              处理其他文件
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-accent text-white btn-glow">
              全部下载
            </button>
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div className="p-6 rounded-2xl bg-surface/30 border border-border/30">
        <h3 className="font-medium mb-3">使用说明</h3>
        <ol className="space-y-2 text-text-secondary text-sm">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent-light flex items-center justify-center flex-shrink-0 text-xs">
              1
            </span>
            上传需要分离的音频文件
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent-light flex items-center justify-center flex-shrink-0 text-xs">
              2
            </span>
            选择分离模式（人声、伴奏或完整分离）
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent-light flex items-center justify-center flex-shrink-0 text-xs">
              3
            </span>
            点击开始分离，等待处理完成
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent-light flex items-center justify-center flex-shrink-0 text-xs">
              4
            </span>
            分离完成后，可以单独下载或批量下载各轨道
          </li>
        </ol>
      </div>
    </div>
  );
}
