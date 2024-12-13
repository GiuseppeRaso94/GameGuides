import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";

const Main = () => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col lg={2} sm={12} id="sidebar" className="h-100 p-4">
          <Sidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
