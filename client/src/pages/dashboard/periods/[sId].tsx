import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Button, Descriptions } from "antd";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import PeriodSider from "../../../components/siders/periods/periodSider";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";

function PeriodPage(props: any) {
  const { period } = props;
  const { data: periodData } = period;

  return (
    <PageContent>
      <Descriptions
        title="Informações do periodo"
        extra={<Button type="primary">Editar</Button>}
      >
        <Descriptions.Item label="Code">{periodData.code}</Descriptions.Item>
        <Descriptions.Item label="Data de inicio">
          {periodData.startDate ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Data de término">
          {periodData.endDate ?? "-"}
        </Descriptions.Item>
      </Descriptions>
    </PageContent>
  );
}

PeriodPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<PeriodSider />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default PeriodPage;

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

  const { data } = await api.get(`/api/periods/${params.sId}`);

  return { props: { period: data } };
}
