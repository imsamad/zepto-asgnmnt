import '@/public/style/index.css';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto ">
      <Component {...pageProps} />
    </div>
  );
}
