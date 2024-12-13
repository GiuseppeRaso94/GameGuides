import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AllPosts from "./AllPosts";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";

const Main = () => {
  return (
    <Container fluid>
      <Row className="h-100">
        <Col lg={2} sm={12} id="sidebar" className="h-100 p-4">
          <Sidebar />
        </Col>
        <Col lg={10} sm={12} className="h-100 p-0">
          <AllPosts />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
