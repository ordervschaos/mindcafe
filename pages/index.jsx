import Head from "next/head";
import Header from "../components/landing/Header";
import Main from "../components/landing/Main";
import Footer from "../components/landing/Footer";
import { NextSeo } from "next-seo";
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function Home() {
  return (
    <div className="text-gray-800">
      <NextSeo
        title="Home: nine4"
        description="Welcome to nine4 homepage."
        canonical="https://www.mind-cafe.com/"
        openGraph={{
          url: "https://www.mind-cafe.com/",
        }}
      />
      <Head>
        <title>MindCafe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}


export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  
 if(req.auth.userId){
  return {
    redirect: {
      permanent: false,
      destination: "/cafe",
    }
  }
}
});