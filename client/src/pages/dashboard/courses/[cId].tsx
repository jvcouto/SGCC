import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Tabs } from "antd";
import {
  BookOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import CourseSider from "../../../components/siders/courses/coursesSider";
import CourseInfo from "../../../components/contents/courses/courseInfo";
import TeachersList from "../../../components/contents/courses/courseTeachersList";
import SubjectsList from "../../../components/contents/courses/courseSubjectsList";
import CollegeList from "../../../components/contents/courses/couseCollegeList";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";

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
      children: <SubjectsList subjectsInfo={courseData.subjects} />,
    },
    {
      label: (
        <span>
          <TeamOutlined /> Professores
        </span>
      ),
      key: "item-3",
      children: <TeachersList teachersInfo={courseData.teachers} />,
    },
    {
      label: (
        <span>
          <SolutionOutlined /> Colegiado
        </span>
      ),
      key: "item-4",
      children: <CollegeList collegeMembers={courseData.collegeMembers} />,
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
      <SecondLayout siderContent={<CourseSider />}>{page}</SecondLayout>
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

  const { data } = await api.get(`/api/courses/${params.cId}`);

  return { props: { course: data } };
}
