import { Col, Row } from "antd";
import FormUser from "../components/Form/FormUser";
import TableUser from "../components/Table/TableUser";

const User = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}>
      <Col xs={24} md={10} style={{ textAlign: "center" }}>
        <FormUser />
      </Col>
      <Col xs={24} md={14} style={{ textAlign: "center" }}>
        <TableUser />
      </Col>
    </Row>
  );
};

export default User;
