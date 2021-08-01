import { Select, Form } from "antd";
import { useState } from "react";
import TableNilaiEasy from "../components/Table/TableNilaiEasy";
import TableNilaiHard from "../components/Table/TableNilaiHard";

const Nilai = () => {
  const [isEasy, setIsEasy] = useState(true);
  return (
    <div>
      <Form labelCol={{ span: 1 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="Level">
          <Select onChange={() => setIsEasy(!isEasy)} defaultValue="easy">
            <Select.Option value="easy">Easy</Select.Option>
            <Select.Option value="hard">Hard</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {isEasy ? <TableNilaiEasy /> : <TableNilaiHard />}
    </div>
  );
};

export default Nilai;
