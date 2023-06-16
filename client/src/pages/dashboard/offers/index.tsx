import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";

function OffersPage() {
  return (
    <PageContent>
      <div>teste</div>
    </PageContent>
  );
}

OffersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<div>teste</div>}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default OffersPage;

export async function getServerSideProps(ctx: any) {
  const { sgcc: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/dot-notation
  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return { props: {} };
}
