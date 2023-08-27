import {
  Button,
  Card,
  Divider,
  Empty,
  FormInstance,
  List,
  Skeleton,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import api from "../../../services/request.service";
import AlternateList from "../../_ui/styles/alterCard.style";
import AddButtonWrapper from "../../_ui/styles/siderAddButton.style";
import CreateCourseModal, {
  ICreateCourseFormValues,
} from "./create-course/createCourseForm";
import ICourse from "../../../types/apiResponses/course";

function CourseSider() {
  const router = useRouter();
  const { cId } = router.query;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ICourse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [formOpen, setformOpen] = useState(false);

  const handleAddButton = () => {
    setformOpen(true);
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    api
      .get(`/api/courses?page=${page}`)
      .then((response) => {
        const { data: courses, meta } = response.data;
        setData([...data, ...courses]);
        if (meta.total !== total) {
          setTotal(meta.total);
        }
        setPage(page + 1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const onCreate = (
    values: ICreateCourseFormValues,
    form: FormInstance<any>
  ) => {
    if (!values.admin && !values.viceAdmin && !values.secretary) {
      form.setFields([
        {
          name: "admin",
          errors: ["Selecione pelo menos um administrador!"],
        },
        {
          name: "viceAdmin",
          errors: ["Selecione pelo menos um administrador!"],
        },
        {
          name: "secretary",
          errors: ["Selecione pelo menos um administrador!"],
        },
      ]);
      return;
    }
    const newCourseData = {
      name: values.name,
      duration: values.duration,
      shift: values.shift,
      admins: [],
    };

    if (values.admin)
      newCourseData.admins.push({
        user: { id: values.admin },
        adminRole: "coordinator",
      });

    if (values.viceAdmin)
      newCourseData.admins.push({
        user: { id: values.viceAdmin },
        adminRole: "vice-coordinator",
      });

    if (values.secretary)
      newCourseData.admins.push({
        user: { id: values.secretary },
        adminRole: "secretary",
      });

    api
      .post<{ data }>("api/courses", newCourseData)
      .then((response) => {
        const { data: newCourse } = response.data;
        message.success("Curso criado com sucesso!");
        setData([newCourse, ...data]);
        Router.push(`/dashboard/courses/${newCourse.id}`);
        form.resetFields();
        setformOpen(false);
      })
      .catch((error) => {
        const { code } = error.response.data;
        switch (code) {
          case "DUPLICATED_PERIOD":
            message.error("Códig ou nome ja existente!");
            break;

          default:
            message.error("Algo deu errado!");
            break;
        }
      });
  };

  return (
    <>
      <CreateCourseModal
        open={formOpen}
        onCreate={onCreate}
        onCancel={() => {
          setformOpen(false);
        }}
      />
      <div
        id="scrollableDiv"
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <AddButtonWrapper>
          <Button
            style={{
              width: "90%",
            }}
            type="primary"
            size="large"
            onClick={handleAddButton}
          >
            Adicionar Curso
          </Button>
        </AddButtonWrapper>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>Não há mais itens! 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <AlternateList
            itemLayout="vertical"
            dataSource={data}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={false}
                />
              ),
            }}
            renderItem={(item: ICourse) => (
              <List.Item>
                <Link href={`/dashboard/courses/${item.id}`}>
                  <Card
                    className={
                      Number(cId) === item.id ? "selected" : "notSelected"
                    }
                    hoverable
                  >
                    {item.name}
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}

export default CourseSider;
