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

      {process.env.NODE_ENV === "production" ? (
        <script
          async
          defer
          data-website-id={process.env.UMAMI_SITE_ID}
          src={process.env.UMAMI_URL}
        />
      ) : null}
    </>
  );
}
