import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { NextPage } from "next";
import { IntlProvider } from "react-intl";
import { AuthProvider } from "../contexts/authContext";
import BrasilTexts from "../utils/translations/br";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <IntlProvider messages={BrasilTexts} locale="br" defaultLocale="br">
      <ThemeProvider theme={theme}>
        <Head>
          <title>
            SGCC - Sistema para Gerenciamento de Coordenação de Cursos
          </title>
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default MyApp;
