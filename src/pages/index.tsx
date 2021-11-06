import * as React from "react";
import Head from "next/head";
import { HeroSection } from "components/HeroSection";
import { Layout } from "components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Casper Iversen - Web Developer</title>
      </Head>

      <HeroSection />
    </Layout>
  );
}
