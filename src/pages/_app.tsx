import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
// import { AnimatePresence, motion } from "framer-motion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="data-theme">
      {/* <AnimatePresence> */}
      <Component {...pageProps} />
      {/* </AnimatePresence> */}
    </ThemeProvider>
  );
}

export default MyApp;
