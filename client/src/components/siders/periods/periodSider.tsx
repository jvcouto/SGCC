import { Button, Card, Divider, Empty, List, Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import api from "../../../services/request.service";
import AlternateList from "../../_ui/styles/alterCard.style";
import AddButtonWrapper from "../../_ui/styles/siderAddButton.style";
import CreatePeriodModal, {
  PeriodFormValues,
} from "../../forms/createPeriodForm";
import IPeriod from "../../../types/apiResponses/periods";

function PeriodSider() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPeriod[]>([]);
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
      .get(`/public/list/periods?page=${page}`)
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

  const onCreate = (values: PeriodFormValues) => {
    const newPeriodData = {
      code: values.code,
      startDate: values.duration[0].format(),
      endDate: values.duration[1].format(),
    };
    api
      .post<{ data: IPeriod }>("api/periods", newPeriodData)
      .then((response) => {
        message.success("Período criado com sucesso!");
        setData([response.data.data, ...data]);
      })
      .catch();
    setTotal(total + 1);

    setformOpen(false);
  };

  return (
    <>
      <CreatePeriodModal
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
            Adicionar Período
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
            renderItem={(item: IPeriod) => (
              <List.Item>
                <Link href={`/dashboard/periods/${item.id}`}>
                  <Card hoverable>{`Periodo: ${item.code}`}</Card>
                </Link>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}

export default PeriodSider;
