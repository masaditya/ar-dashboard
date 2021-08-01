import { Button, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { database } from "../../firebase";
import { DeleteOutlined } from "@ant-design/icons";

const TableNilaiEasy = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const objectRef = database.ref("score");
    objectRef.on("value", (snapshot) => {
      const objects = snapshot.val();
      const objectList = [];
      for (let id in objects) {
        objectList.push(objects[id]);
      }
      setData(objectList);
    });
  }, []);

  const confirmDelete = useCallback((id) => {
    const dbRef = database.ref("score").child(id);
    dbRef.remove();
    notification.success({
      message: "Hapus Soal",
      description: "Berhasil menghapus data soal",
    });
  }, []);

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Nama",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Answer",
      dataIndex: "question",
      key: "question",
      render: (t: any, d: any) => {
        return <Tag color="success">{t.object_name}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (t: any, d: any) => {
        return (
          <Space size="middle">
            {/* <Button type="primary" size="small">
              Update
            </Button> */}
            <Popconfirm
              title="Apakah anda akan menghapus soal ini?"
              placement="left"
              onConfirm={() => confirmDelete(d.id)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      rowKey={() => Math.random().toString()}
      dataSource={data}
      columns={columns}
    />
  );
};

export default TableNilaiEasy;
