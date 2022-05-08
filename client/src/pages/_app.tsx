import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../contexts/AuthContext";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>PCA</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
