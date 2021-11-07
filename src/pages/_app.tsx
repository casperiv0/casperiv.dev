import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Nav } from "components/Nav";
import { Footer } from "components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
