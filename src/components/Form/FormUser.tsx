import { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { database } from "../../firebase";
import crypto from "crypto-js";

const FormUser = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setIsLoadingSubmit(true);
    console.log(crypto.MD5(values.password).toString());
    database
      .ref("users/" + values.username)
      .set({
        pass: crypto.MD5(values.password).toString(),
      })
      .then(() => {
        setIsLoadingSubmit(false);
        form.resetFields();
        notification.success({
          message: "Disimpan",
          description: "Data berhasil disimpan",
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    notification.error({
      message: "Gagal",
      description: "Data gagal disimpan, lengkapi field yang tersedia",
    });
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoadingSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormUser;
