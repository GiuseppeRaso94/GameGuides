import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../middlewares/ProtectedRoutes";
import LogIn from "./Login";
import "./MyNav.css";
import SearchBar from "./SearchBar";

const MyNav = () => {
  const undecodedsession = useAuth();
  const session = undecodedsession ? jwtDecode(undecodedsession) : null;
  return (
    <Navbar className="px-4 d-flex" expand="lg" id="myNavbar">
      <Navbar.Brand
        href="/"
        className="d-flex align-items-center gap-3 m-0 me-5"
      >
        <img src="/GameGuidesLogo.png" alt="GameGuidesLogo" id="logo" />
        <span className="titles">Game Guides</span>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        bsPrefix="navbar-toggler"
        id="navbarToggler"
        className="collapseBtns"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-between align-items-center gap-3">
          <SearchBar />
          <LogIn />
          <Link to={session ? `/user-profile/${session._id}` : "/"}>
            <button id="userIcon">
              <img src="/user.svg" alt="User Icon" />
            </button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
