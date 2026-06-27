
import "./globals.css";


export const metadata = {
  title: "Vision",
  description: "Welcome To The World Of Creativity",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      
    >
      <body className="min-h-full flex flex-col bg-[#FFCDB2] p-1 sm:p-3 md:p-6">{children}</body>
    </html>
  );
}
