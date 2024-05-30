export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        SIDEBAR/TAB BAR
        {children}
      </main>
    );
  }
  