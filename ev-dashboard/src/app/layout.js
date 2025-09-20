import './globals.css';

export const metadata = {
  title: 'EV Population Dashboard',
  description: 'Analytics dashboard for Electric Vehicle Population Data',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}