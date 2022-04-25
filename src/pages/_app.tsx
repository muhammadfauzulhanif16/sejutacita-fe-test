import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { Chakra } from "../Chakra";
import "../../public/nprogress.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </Provider>
  );
};

export default MyApp;
