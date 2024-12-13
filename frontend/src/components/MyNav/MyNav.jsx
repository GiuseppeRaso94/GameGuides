import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Access from "./Access/Access";
import "./MyNav.css";

const MyNav = () => {
  return (
    <Navbar className="py-0 px-lg-3 px-sm-0" expand="lg" id="myNavbar">
      <Container fluid className="d-flex gap-lg-5 gap-sm-0">
        <Navbar.Brand
          href="http://localhost:5173/homepage"
          className="d-flex align-items-center gap-3"
        >
          <img
            src="src/assets/GameGuidesLogo.png"
            alt="GameGuidesLogo"
            id="logo"
          />
          <span id="title">Game Guides</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          bsPrefix="navbar-toggler"
          id="navBarToggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between pb-sm-3 pb-lg-0 align-items-center gap-3">
            <form className="d-flex align-items-center" id="searchBar">
              <input
                type="text"
                placeholder="Search here"
                className="border border-0 w-100"
              />
              <button type="submit" className="border border-0">
                <img src="src/assets/search.svg" alt="" />
              </button>
            </form>
            <Access />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
