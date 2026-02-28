import { Header } from './Header';
import { PlayerBar } from './PlayerBar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary bg-grid-pattern">
      <Header />
      <main className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <PlayerBar />
    </div>
  );
}

export { Header } from './Header';
export { PlayerBar } from './PlayerBar';
