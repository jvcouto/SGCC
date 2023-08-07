import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Tabs } from "antd";

import { InfoCircleOutlined, TeamOutlined } from "@ant-design/icons";
import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import DepartamentSider from "../../../components/siders/departaments/departamentSider";
import DepartamentInfo from "../../../components/contents/departaments/departamentInfo";
import TeachersList from "../../../components/contents/departaments/departamentTeachersList";

function DepartamentPage(props: any) {
  const { departament } = props;
  const { data: departamentData } = departament;

  const items = [
    {
      label: (
        <span>
          <InfoCircleOutlined /> Informações
        </span>
      ),
      key: "item-1",
      children: <DepartamentInfo departamentInfo={departamentData} />,
    },
    {
      label: (
        <span>
          <TeamOutlined /> Professores
        </span>
      ),
      key: "item-2",
      children: <TeachersList teachersInfo={departamentData.teachers} />,
    },
  ];

  return (
    <PageContent>
      <Tabs
        defaultActiveKey="item-1"
        centered
        style={{ width: "100%" }}
        items={items}
      />
    </PageContent>
  );
}

DepartamentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<DepartamentSider />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default DepartamentPage;

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

  const { data } = await api.get(`/api/departaments/${params.dId}`);

  return { props: { departament: data } };
}
