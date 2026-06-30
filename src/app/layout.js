import InitialReveal from "./components/InitialReveal";
import SmoothScrolling from "./components/SmoothScrolling";
import "./globals.css";

export const metadata = {
  title: "Vision",
  description: "Welcome To The World Of Creativity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex overflow-x-hidden flex-col ">
        <SmoothScrolling>
          <InitialReveal>{children}</InitialReveal>
        </SmoothScrolling>
      </body>
    </html>
  );
}
