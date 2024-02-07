import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";

import MySubjectsSider from "../../../components/siders/mySubjects/mySubjectsSider";

function MySubjectsPage() {
  return <div>teste</div>;
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

  const { params } = ctx;

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
