import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Button, Descriptions } from "antd";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import SemesterSider from "../../../components/siders/semesters/semesterSider";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";

function SemesterPage(props: any) {
  const { semester } = props;
  const { data: semesterData } = semester;

  return (
    <PageContent>
      <Descriptions
        title="Informações do semestre"
        extra={<Button type="primary">Editar</Button>}
      >
        <Descriptions.Item label="Code">{semesterData.code}</Descriptions.Item>
        <Descriptions.Item label="Data de inicio">
          {semesterData.startDate ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Data de término">
          {semesterData.endDate ?? "-"}
        </Descriptions.Item>
      </Descriptions>
    </PageContent>
  );
}

SemesterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<SemesterSider />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default SemesterPage;

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

  const { data } = await api.get(`/api/semesters/${params.sId}`);

  return { props: { semester: data } };
}
