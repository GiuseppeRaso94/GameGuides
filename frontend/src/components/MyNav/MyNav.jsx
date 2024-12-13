import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogIn from "./Login";
import "./MyNav.css";
import SearchBar from "./SearchBar";

const MyNav = () => {
  return (
    <Navbar
      className="py-0 px-lg-4 px-sm-0 d-flex gap-5"
      expand="lg"
      id="myNavbar"
    >
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
          <SearchBar />
          <LogIn />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
