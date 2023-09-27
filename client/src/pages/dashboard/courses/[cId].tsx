import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Tabs } from "antd";
import {
  BookOutlined,
  BuildOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import CourseSider from "../../../components/siders/courses/coursesSider";
import CourseInfo from "../../../components/contents/courses/information/courseInfo";
import SubjectsList from "../../../components/contents/courses/subjects/courseSubjectsList";
import CollegeList from "../../../components/contents/courses/college/couseCollegeList";
import SubjectOffers from "../../../components/contents/courses/offers/couseOffers";

import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import ICourse from "../../../types/apiResponses/course";

interface CoursePageProps {
  course: ICourse;
}

function CoursesPage(props: CoursePageProps) {
  const { course } = props;

  const items = [
    {
      label: (
        <span>
          <InfoCircleOutlined /> Informações
        </span>
      ),
      key: "item-1",
      children: <CourseInfo courseInfo={course} />,
    },
    {
      label: (
        <span>
          <BookOutlined /> Disciplinas
        </span>
      ),
      key: "item-2",
      children: (
        <SubjectsList
          subjectsInfo={course.subjects}
          selectedCourse={course.id}
        />
      ),
    },
    {
      label: (
        <span>
          <SolutionOutlined /> Colegiado
        </span>
      ),
      key: "item-4",
      children: (
        <CollegeList
          collegeMembers={course.collegeMembers}
          selectedCourse={course.id}
        />
      ),
    },
    {
      label: (
        <span>
          <BuildOutlined /> Ofertas do curso
        </span>
      ),
      key: "item-5",
      children: (
        <SubjectOffers
          subjectsInfo={course.subjects}
          selectedCourse={course.id}
        />
      ),
    },
    {
      label: (
        <span>
          <LikeOutlined /> Avaliações de Plano
        </span>
      ),
      key: "item-6",
      children: <div>Avaliações Aqui</div>,
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

  return { props: { course: data.data } };
}
