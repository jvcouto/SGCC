import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Tabs } from "antd";

import {
  DiffOutlined,
  InfoCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import DepartamentSider from "../../../components/siders/departaments/departamentSider";
import DepartamentInfo from "../../../components/contents/departaments/information/departamentInfo";
import TeachersList from "../../../components/contents/departaments/teachers/departamentTeachersList";
import IDepartament from "../../../types/apiResponses/departament";
import ChargesList from "../../../components/contents/departaments/charges/chargesList";

interface IDepartamentPageProps {
  departament: IDepartament;
}

function DepartamentPage(props: IDepartamentPageProps) {
  const { departament } = props;

  const items = [
    {
      label: (
        <span>
          <InfoCircleOutlined /> Informações
        </span>
      ),
      key: "item-1",
      children: <DepartamentInfo departamentInfo={departament} />,
    },
    {
      label: (
        <span>
          <TeamOutlined /> Professores
        </span>
      ),
      key: "item-2",
      children: (
        <TeachersList
          departamentId={departament.id}
          teachersInfo={departament.teachers}
        />
      ),
    },
    {
      label: (
        <span>
          <DiffOutlined /> Encargos
        </span>
      ),
      key: "item-3",
      children: <ChargesList departamentId={departament.id} />,
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

  return { props: { departament: data.data } };
}
