import { Button, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { database } from "../../firebase";
import { CodeSandboxOutlined, DeleteOutlined } from "@ant-design/icons";

const TableNilai = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const objectRef = database.ref("object");
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
    const dbRef = database.ref("object").child(id);
    dbRef.remove();
    notification.success({
      message: "Hapus Soal",
      description: "Berhasil menghapus data soal",
    });
  }, []);

  const columns = [
    {
      title: "Object",
      dataIndex: "object_url",
      key: "object_url",
      render: (t: any, d: any) => {
        return (
          <Button type="default" size="small" target="_blank" href={t}>
            <CodeSandboxOutlined /> Show Object
          </Button>
        );
      },
    },
    {
      title: "Nama",
      dataIndex: "object_name",
      key: "object_name",
    },
    {
      title: "Keyword",
      dataIndex: "object_keyword",
      key: "object_keyword",
      render: (t: string, d: any) => {
        return (
          <>
            {t.split(/\s+/).map((kw, i) => {
              return (
                <Tag color="success" key={i}>
                  {kw}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (t: any, d: any) => {
        return (
          <Space size="middle">
            <Button type="primary" size="small">
              Update
            </Button>
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
  return <Table rowKey="id" dataSource={data} columns={columns} />;
};

export default TableNilai;
