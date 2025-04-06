// import Navbar from "@/components/Navbar";

// import "./globals.css";
// import Footer from "@/components/Footer";


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
        
//       </body>
//     </html>
//   );
// }

// pages/_app.js


import './globals.css';
import Providers from './providers';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <CategoryNav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}