import { Typography, Row, Col } from "antd";

function AppFooter() {
  return (
    <div className="appFooter" style={{ padding: '20px 0', backgroundColor: 'grey' }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Typography.Link href="https://www.google.com" target={"_blank"}>
            Privacy Policy
          </Typography.Link>
        </Col>
        <Col>
          <Typography.Link href="https://www.google.com" target={"_blank"}>
            Terms & Conditions
          </Typography.Link>
        </Col>
        <Col>
          <Typography.Link href="https://www.google.com" target={"_blank"}>
            Return Policy
          </Typography.Link>
        </Col>
      </Row>
    </div>
  );
}

export default AppFooter;
