import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";

const Main = ({ children }) => {
  return (
    <Container fluid id="main">
      <Row className="h-100">
        <Col lg={2} sm={12} id="sidebar" className="p-4">
          <Sidebar />
        </Col>
        <Col lg={10} sm={12} className="p-0">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
