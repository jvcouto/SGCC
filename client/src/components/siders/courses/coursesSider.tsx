import { Card, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import api from "../../../services/request.service";

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
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>Não há mais itens! 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        style={{
          background: "white",
        }}
      >
        <List
          itemLayout="vertical"
          style={{
            padding: "15px",
            background: "white",
            overflow: "auto",
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link href={`/dashboard/courses/${item.id}`}>
                <Card
                  title={item.name}
                  headStyle={{ background: "#f0f2f5" }}
                  hoverable
                />
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default CourseSider;
