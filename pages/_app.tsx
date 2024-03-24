import { getProfileOfUser } from "@/api/user";
import Layout from "@/components/layout";
import SimpleBackdrop from "@/components/loading";
import BackToTop from "@/components/scollTop";
import "@/styles/globals.scss";
import { errorToast } from "@/utils/notification";
import useInfo from "@/zustand/auth";
import { getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

export default function App({ Component, pageProps }: AppProps) {
  const { setInfo, accInfo } = useInfo();
  // console.log("__app", accInfo);
  useEffect(() => {
    (async () => {
      try {
        const tokenPet = getCookie("tokenPet");
        if (!!tokenPet) {
          const res = await getProfileOfUser();
          setInfo(res.data.data);
        }
      } catch (error: any) {
        errorToast(error.message, 2000);
      }
    })();
    window.scrollTo(0, 0);
  }, [accInfo.userId]);
  return (
    <>
      <Head>
        <title>Bull - Pets</title>
      </Head>

      <BackToTop />
      <ToastContainer />
      <SimpleBackdrop />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
