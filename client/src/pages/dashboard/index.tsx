import { parseCookies } from "nookies";
import React, { ReactElement, useEffect, useState } from "react";
import { Spin, Typography } from "antd";
import Router from "next/router";
import api from "../../services/request.service";

import MainLayout from "../../components/layouts/mainLayout";
import SecondLayout from "../../components/layouts/secondLayout";
import PageContent from "../../styles/content.style";
import IUser from "../../types/apiResponses/users";

const { Title, Text } = Typography;

interface IDashboardProps {
  currentUser: IUser;
}

function Dashboard(props: IDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = props;

  useEffect(() => {
    if (currentUser.roles.length) Router.push("/dashboard/settings/email");
    setIsLoading(false);
  }, []);

  return (
    <PageContent>
      {isLoading && <Spin size="large" />}
      {!currentUser.roles.length && !isLoading && (
        <div
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={2}>Bem vindo ao SGCC!</Title>
          <Text type="secondary" style={{ fontSize: "1.25rem" }}>
            Seu usuario nao possui nenhum encargo, entre em contato com o
            administrador!
          </Text>
        </div>
      )}
    </PageContent>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout>{page}</SecondLayout>
    </MainLayout>
  );
};

export default Dashboard;

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

  const { data } = await api.get<{ data: IUser }>(`api/user/current`);

  return { props: { currentUser: data.data } };
}
