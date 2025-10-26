import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300 ">
        <Navbar />
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
