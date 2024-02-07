import React, { ReactElement } from "react";
import { parseCookies } from "nookies";
import { Empty } from "antd";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import MySubjectsSider from "../../../components/siders/mySubjects/mySubjectsSider";

function MySubjectsPage() {
  return (
    <PageContent>
      <Empty
        imageStyle={{
          height: 250,
        }}
        description={<span>Nenhum departamento selecionado</span>}
      />
    </PageContent>
  );
}

MySubjectsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<MySubjectsSider />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default MySubjectsPage;

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
