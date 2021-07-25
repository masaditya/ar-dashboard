import { Col, Row } from "antd";
import FormObject from "../components/Form/FormObject";
import TableObject from "../components/Table/TableObject";

const Nilai = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}>
      <Col xs={24} md={10} style={{ textAlign: "center" }}>
        <FormObject />
      </Col>
      <Col xs={24} md={14} style={{ textAlign: "center" }}>
        <TableObject />
      </Col>
    </Row>
  );
};

export default Nilai;
