import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogIn from "./Login";
import "./MyNav.css";
import SearchBar from "./SearchBar";

const MyNav = () => {
  return (
    <Navbar className="px-4 d-flex" expand="lg" id="myNavbar">
      <Navbar.Brand
        href="http://localhost:5173/homepage"
        className="d-flex align-items-center gap-3 m-0 me-5"
      >
        <img
          src="public\assets\GameGuidesLogo.png"
          alt="GameGuidesLogo"
          id="logo"
        />
        <span className="titles">Game Guides</span>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        bsPrefix="navbar-toggler"
        id="navBarToggler"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-between align-items-center gap-3">
          <SearchBar />
          <LogIn />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
