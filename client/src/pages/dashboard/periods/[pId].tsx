import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Button, Descriptions } from "antd";

import dayjs from "dayjs";
import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import PeriodSider from "../../../components/siders/periods/periodSider";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import IPeriod from "../../../types/apiResponses/periods";

interface PeriodPageProps {
  period: IPeriod;
}

function PeriodPage(props: PeriodPageProps) {
  const { period: periodData } = props;

  return (
    <PageContent>
      <Descriptions
        title="Informações do periodo"
        extra={<Button type="primary">Editar</Button>}
      >
        <Descriptions.Item label="Code">{periodData.code}</Descriptions.Item>
        <Descriptions.Item label="Data de inicio">
          {dayjs(periodData.startDate).format("DD/MM/YYYY") ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Data de término">
          {dayjs(periodData.endDate).format("DD/MM/YYYY") ?? "-"}
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

  const { data } = await api.get(`/api/periods/${params.pId}`);

  return { props: { period: data.data } };
}
