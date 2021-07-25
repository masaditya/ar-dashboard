import { Button, notification, Popconfirm, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { database } from "../../firebase";
import { DeleteOutlined } from "@ant-design/icons";

const TableUser = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const userRef = database.ref("users");
    userRef.on("value", (snapshot) => {
      const users = snapshot.val();
      const usernames = Object.keys(users);
      const userList: any[] = [];
      usernames.forEach((name: string) => {
        userList.push({ username: name });
      });
      console.log(userList);
      setData(userList);
    });
  }, []);

  const confirmDelete = useCallback((username) => {
    const dbRef = database.ref("users/" + username);
    dbRef.remove();
    notification.success({
      message: "Hapus User",
      description: "Berhasil menghapus data User",
    });
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
              title="Apakah anda akan menghapus user ini?"
              placement="left"
              onConfirm={() => confirmDelete(d.username)}
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
  return <Table rowKey="username" dataSource={data} columns={columns} />;
};

export default TableUser;
