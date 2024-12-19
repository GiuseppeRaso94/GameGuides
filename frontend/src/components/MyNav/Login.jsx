import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function RegisterModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-4 py-4">
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4 d-flex flex-column align-items-center gap-3">
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
        >
          <div className="w-100">All fields with * are required</div>
          <input
            type="text"
            placeholder="* E-mail"
            className="modal-input p-3"
          />
          <input
            type="text"
            placeholder="* Username"
            className="modal-input p-3"
          />
          <input
            type="text"
            placeholder="* Password"
            className="modal-input p-3"
          />
          <div className="w-100">Role</div>
          <select placeholder="Role" className="w-100 p-3 select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="w-100">Date of birth</div>
          <input
            type="date"
            placeholder="Date of birth"
            className="modal-input p-3"
          />
          <button className="logInButton">Register</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function LogInModal(props) {
  const { setRegisterModalShow, setLogInModalShow } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-4 py-4">
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4 d-flex flex-column align-items-center gap-3">
        <button id="logInGoogle" className="d-flex align-items-center gap-1">
          <img src="/google_logo.png" alt="Google Logo" />
          Login with Google
        </button>
        <div className="divider w-100"></div>
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
        >
          or
          <input type="text" placeholder="E-mail" className="modal-input p-3" />
          <input
            type="text"
            placeholder="Password"
            className="modal-input p-3"
          />
          <button className="logInButton">Login</button>
        </form>
        <div className="d-flex align-items-center gap-3">
          You have not an account yet?{" "}
          <button
            className="ovalButtons"
            onClick={() => {
              setLogInModalShow(false);
              setRegisterModalShow(true);
            }}
          >
            Register!
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const LogIn = () => {
  const [logInModalShow, setLogInModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  return (
    <>
      <button
        className="logInButton ms-5"
        onClick={() => setLogInModalShow(true)}
      >
        LogIn
      </button>
      <LogInModal
        show={logInModalShow}
        onHide={() => setLogInModalShow(false)}
        setLogInModalShow={setLogInModalShow}
        setRegisterModalShow={setRegisterModalShow}
      />
      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
    </>
  );
};

export default LogIn;
