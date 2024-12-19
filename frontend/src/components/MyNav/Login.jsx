import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

function RegisterModal(props) {
  const { setRegisterModalShow } = props;
  const [newUserData, setNewUserData] = useState({});
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const userCreateRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserData),
        }
      );
      return response;
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await userCreateRequest();
    if (res.status === 201) {
      Swal.fire({
        title: "Registration completed! Please try to log in now",
        icon: "success",
        draggable: true,
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "You have not entered all the required fields",
      });
    }
    setRegisterModalShow(false);
  };
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
          onSubmit={onSubmit}
        >
          <div className="w-100">All fields with * are required</div>
          <input
            type="text"
            placeholder="* E-mail"
            name="email"
            className="modal-input p-3"
            onChange={onChangeInput}
          />
          <input
            type="text"
            placeholder="* Username"
            name="userName"
            className="modal-input p-3"
            onChange={onChangeInput}
          />
          <input
            type="text"
            placeholder="* Password"
            name="password"
            className="modal-input p-3"
            onChange={onChangeInput}
          />
          <div className="w-100">Role</div>
          <select
            placeholder="Role"
            className="w-100 p-3 select"
            name="role"
            onChange={onChangeInput}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="logInButton">Register</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function LogInModal(props) {
  const { setRegisterModalShow, setLogInModalShow } = props;
  const [logInData, setLogInData] = useState({});

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setLogInData({
      ...logInData,
      [name]: value,
    });
  };

  const postLogInRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logInData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("auth", JSON.stringify(data.token));
      }
      return response;
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await postLogInRequest();
    if (res.status === 200) {
      Swal.fire({
        title: "Log In successfully!",
        icon: "success",
        draggable: true,
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Email or password are wrong!",
      });
    }
    setLogInModalShow(false);
  };

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
        or
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
          onSubmit={onSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="modal-input p-3"
            onChange={onChangeInput}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="modal-input p-3"
            onChange={onChangeInput}
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
        setRegisterModalShow={setRegisterModalShow}
      />
    </>
  );
};

export default LogIn;
