import { Button, Card, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import api from "../../../services/request.service";
import AlternateList from "../../_ui/styles/alterCard.style";
import AddButtonWrapper from "../../_ui/styles/siderAddButton.style";

interface ICourses {
  id: string;
  name: string;
}

function CourseSider() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ICourses[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

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

  return (
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
          renderItem={(item: ICourses) => (
            <List.Item>
              <Link href={`/dashboard/courses/${item.id}`}>
                <Card hoverable>{item.name}</Card>
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default CourseSider;
