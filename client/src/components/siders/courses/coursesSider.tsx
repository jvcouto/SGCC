import { Button, Card, Divider, Empty, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../../services/request.service";
import AlternateList from "../../_ui/styles/alterCard.style";
import AddButtonWrapper from "../../_ui/styles/siderAddButton.style";
import CreateCourseModal from "../../forms/createCourseForm";
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

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setformOpen(false);
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
