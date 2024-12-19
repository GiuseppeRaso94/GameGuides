import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";

function OptionsDropDown({ setEditUserModalShow }) {
  const start = "start";
  return (
    <DropdownButton drop={start}>
      <Dropdown.Item
        eventKey="1"
        onClick={() => {
          setEditUserModalShow(true);
        }}
      >
        Edit Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">Delete Account</Dropdown.Item>
      <Dropdown.Item eventKey="3">Log Out</Dropdown.Item>
    </DropdownButton>
  );
}

function EditUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-4 py-4">
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4 d-flex flex-column align-items-center gap-3">
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
        >
          <input type="text" placeholder="E-mail" className="modal-input p-3" />
          <input
            type="text"
            placeholder="Username"
            className="modal-input p-3"
          />
          <input
            type="text"
            placeholder="Password"
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
          <button className="logInButton">Save</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function AddPostModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-4 py-4">
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4 d-flex flex-column align-items-center gap-3">
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
        >
          <input type="text" className="modal-input p-3" placeholder="Title" />
          <input type="file" className="modal-input p-3" />
          <textarea placeholder="Description" className="modal-input p-3" />
          <div className="w-100">Tag (Genre)</div>
          <select className="w-100 p-3 select">
            <option value="adventure">Adventure</option>
            <option value="rpg">RPG</option>
            <option value="mmorpg">MMORPG</option>
            <option value="moba">MOBA</option>
            <option value="rts">RTS</option>
            <option value="fps">FPS</option>
            <option value="fighting">Fighting</option>
            <option value="survival">Survival</option>
            <option value="sandbox">Sandbox</option>
            <option value="horror">Horror</option>
          </select>
          <button className="logInButton">Create</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const ProfileData = ({ user }) => {
  const [editUserModalShow, setEditUserModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);
  return (
    <div id="profile" className="py-3 px-md-5 px-3 d-flex flex-column gap-3">
      <div className="d-flex justify-content-between">
        <span className="titles">{user.userName}</span>
        <OptionsDropDown setEditUserModalShow={setEditUserModalShow} />
        <EditUserModal
          show={editUserModalShow}
          onHide={() => setEditUserModalShow(false)}
        />
      </div>
      <div className="d-flex gap-3">
        <span>E-mail:</span>
        <span className="newLine">{user.email}</span>
      </div>
      <div className="d-flex gap-3">
        <span>Role:</span>
        <span>{user.role}</span>
      </div>
      <div className="d-flex gap-3">
        <span>Number of posts:</span>
        <span>{user.posts.length}</span>
      </div>
      <div className="d-flex gap-3">
        <span>User since:</span>
        <span>{user.createdAt.substring(0, 10)}</span>
      </div>
      <div>
        <button
          className="ovalButtons d-flex align-items-center gap-2"
          onClick={() => {
            setAddPostModalShow(true);
          }}
        >
          <img src="/assets/add.svg" alt="Add Post Icon" />
          Add Post
        </button>
        <AddPostModal
          show={addPostModalShow}
          onHide={() => setAddPostModalShow(false)}
        />
      </div>
    </div>
  );
};
export default ProfileData;
