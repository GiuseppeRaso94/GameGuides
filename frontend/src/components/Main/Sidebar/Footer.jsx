import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => {
  return (
    <Navbar expand="lg" className="d-flex flex-column pt-3 gap-3">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <span className="titles">Contacts</span>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          bsPrefix="navbar-toggler"
          id="navBarToggler"
        />
      </div>
      <Navbar.Collapse id="basic-navbar-nav" className="w-100">
        <Nav className="w-100 d-flex flex-column align-items-center gap-3">
          <span className="m-0 d-flex gap-3">
            <img src="./src/assets/mail.svg" alt="mailIcon" />
            E-mail:
          </span>
          <span className="m-0" id="email">
            peppone2894@gmail.com
          </span>
          <span className="m-0 d-flex gap-3">
            <img src="./src/assets/phone.svg" alt="phoneIcon" />
            Phone Number:
          </span>
          <span className="m-0">3289510340</span>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Footer;
