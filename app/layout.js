import './globals.css';
import HeaderNav from '@/components/main-header/header-nav';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <HeaderNav />

        {children}
      </body>
    </html>
  );
}
