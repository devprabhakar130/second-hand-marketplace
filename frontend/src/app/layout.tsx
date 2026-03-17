import "./globals.css";

export const metadata = {
  title: "Second-Hand Marketplace (Demo)",
  description: "Prototype marketplace with auth and profile"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}

