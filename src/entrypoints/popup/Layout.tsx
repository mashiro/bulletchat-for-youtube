interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return <div className="min-w-80 min-h-screen">{children}</div>;
}
