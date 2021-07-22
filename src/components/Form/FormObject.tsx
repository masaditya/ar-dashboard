import { useState } from "react";
import { Button, Upload, Form, Input, Tag, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage, database } from "../../firebase";

const FormObject = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append("file", file);
    });
    setUploading(true);

    const uploadTask = storage
      .ref(`assets/${fileList[0].name}`)
      .put(fileList[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        storage
          .ref("assets")
          .child(fileList[0].name)
          .getDownloadURL()
          .then((url) => {
            setIsUploaded(true);
            form.setFieldsValue({
              object_url: url,
            });
          });
        notification.success({
          message: "Uploaded",
          description: "File Berhasil di Upload!",
        });
        setUploading(false);
      }
    );
  };

  const makeid = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const onFinish = (values: any) => {
    setIsLoadingSubmit(true);
    let id = makeid(20);
    database
      .ref("object/" + id)
      .set({
        id,
        ...values,
      })
      .then(() => {
        setIsLoadingSubmit(false);
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
      <Upload
        onRemove={(file) => {
          let index = fileList.indexOf(file);
          let newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        fileList={fileList}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length !== 1}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
      <br />
      <small>
        {!isUploaded
          ? "Upload File Object Untuk melanjutkan"
          : "File Terupload"}
      </small>
      <br />
      <br />
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nama Objek"
          name="object_name"
          rules={[{ required: true, message: "Please input object name!" }]}
        >
          <Input placeholder="Nama benda pada object" />
        </Form.Item>

        <Form.Item
          hidden
          label="Url Object"
          name="object_url"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kata Kunci Deskripsi"
          name="object_keyword"
          rules={[
            { required: true, message: "Please input at least one keyword" },
          ]}
        >
          <Input
            placeholder="Keyword di pisahkan dengan tanda spasi"
            onChange={(e) => {
              setKeywords(e.target.value.split(" "));
              form.setFieldsValue({
                object_keyword: e.target.value,
              });
            }}
          />
        </Form.Item>

        <div style={{ marginTop: "2em", marginBottom: "2em" }}>
          {keywords.map((keyword, i) => (
            <Tag key={i} color="success">
              {keyword}
            </Tag>
          ))}
        </div>

        <Form.Item>
          <Button loading={isLoadingSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormObject;
