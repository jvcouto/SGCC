import React, { useEffect, useState } from "react";
import { Card, Divider, Empty, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { useRouter } from "next/router";
import AlternateList from "../../_ui/styles/alterCard.style";
import api from "../../../services/request.service";
import { usePeriod } from "../../../contexts/periodContext";
import { ISubjectOffer } from "../../../types/apiResponses/subject";

function MySubjectsSider() {
  const router = useRouter();
  const { msId } = router.query;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ISubjectOffer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const { selectedPeriod } = usePeriod();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    api
      .get<{ data: ISubjectOffer[]; meta: any }>(
        `/api/subjectOffer?page=${page}&period=${selectedPeriod}`
      )
      .then((response) => {
        const { data: offers, meta } = response.data;
        setData([...data, ...offers]);
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
      >
        <AlternateList
          itemLayout="vertical"
          dataSource={data}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
            ),
          }}
          renderItem={(item: ISubjectOffer) => (
            <List.Item>
              <Link href={`/dashboard/my-subjects/${item.id}`}>
                <Card
                  className={
                    Number(msId) === item.id ? "selected" : "notSelected"
                  }
                  hoverable
                >
                  {item.subject?.name}
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default MySubjectsSider;
