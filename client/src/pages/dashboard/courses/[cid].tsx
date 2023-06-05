import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Tabs } from "antd";
import {
  BookOutlined,
  BookTwoTone,
  InfoCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import { useAuth } from "../../../contexts/authContext";
import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import SemestersSider from "../../../components/siders/courses/coursesSiders";
import CourseInfo from "../../../components/contents/courses/courseInfo";

function CoursesPage(props: any) {
  const { course } = props;
  const { data: courseData } = course;
  const items = [
    {
      label: (
        <span>
          <InfoCircleOutlined /> Informações
        </span>
      ),
      key: "item-1",
      children: <CourseInfo courseInfo={courseData} />,
    },
    {
      label: (
        <span>
          <BookOutlined /> Disciplinas
        </span>
      ),
      key: "item-2",
      children: "Content 2",
    },
    {
      label: (
        <span>
          <TeamOutlined /> Professores
        </span>
      ),
      key: "item-3",
      children: "Content 3",
    },
    {
      label: (
        <span>
          <SolutionOutlined /> Colegiado
        </span>
      ),
      key: "item-4",
      children: "Content 4",
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

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<SemestersSider />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default CoursesPage;

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

  const { data } = await api.get(`/api/courses/${params.cid}`);

  return { props: { course: data } };
}
