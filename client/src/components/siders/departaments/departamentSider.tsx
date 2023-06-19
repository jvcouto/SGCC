import { Button, Card, Divider, Empty, List, Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FormInstance } from "antd/es/form/Form";
import api from "../../../services/request.service";
import AlternateList from "../../_ui/styles/alterCard.style";
import AddButtonWrapper from "../../_ui/styles/siderAddButton.style";
import CreateDepartamentModal, {
  IDepartamentFormValues,
} from "../../forms/createDepartamentForm";

interface IDepartament {
  id: string;
  name: string;
}

function DepartamentSider() {
  const router = useRouter();
  const { dId } = router.query;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDepartament[]>([]);
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
      .get(`/api/departaments?page=${page}`)
      .then((response) => {
        const { data: departaments, meta } = response.data;
        setData([...data, ...departaments]);
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
    values: IDepartamentFormValues,
    form: FormInstance<any>
  ) => {
    const newDepartamentData = {
      name: values.name,
      code: values.code,
    };
    api
      .post<{ data: IDepartament }>("api/departaments", newDepartamentData)
      .then((response) => {
        const { data: newDepartament } = response.data;
        message.success("Período criado com sucesso!");
        setData([newDepartament, ...data]);
        Router.push(`/dashboard/departaments/${newDepartament.id}`);
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
      <CreateDepartamentModal
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
            Adicionar Departamento
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
            renderItem={(item: IDepartament) => (
              <List.Item>
                <Link href={`/dashboard/departaments/${item.id}`}>
                  <Card
                    className={
                      Number(dId) === item.id ? "selected" : "notSelected"
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

export default DepartamentSider;
