import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        title="Home: nine4"
        description="Welcome to nine4 homepage."
        canonical="https://www.ravve.app/"
        openGraph={{
          url: "https://www.ravve.app/",
        }}
      />
      <Head>
        <title>RAVVE</title>
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