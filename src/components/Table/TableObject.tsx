import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { database } from "../../firebase";

const TableObject = () => {
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

  const columns = [
    {
      title: "Object",
      dataIndex: "object_url",
      key: "object_url",
      render: (t: any, d: any) => {
        return (
          <Button type="primary" size="small" target="_blank" href={t}>
            Show Object
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
            {t.split(" ").map((kw, i) => {
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
  ];
  return <Table rowKey="id" dataSource={data} columns={columns} />;
};

export default TableObject;
