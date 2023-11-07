import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { NextPage } from "next";
import { IntlProvider } from "react-intl";
import { AuthProvider } from "../contexts/authContext";
import translactions from "../utils/_i18n/translations.json";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";
import { PeriodProvider } from "../contexts/periodContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <IntlProvider
      messages={translactions["pt-BR"]}
      locale="pt-BR"
      defaultLocale="br"
    >
      <ThemeProvider theme={theme}>
        <Head>
          <title>
            SGCC - Sistema para Gerenciamento de Coordenação de Cursos
          </title>
        </Head>
        <AuthProvider>
          <PeriodProvider>
            {getLayout(<Component {...pageProps} />)}
          </PeriodProvider>
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default MyApp;
