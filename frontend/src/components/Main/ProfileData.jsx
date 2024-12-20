import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import useSession from "../../hooks/useSession";

function OptionsDropDown({ setEditUserModalShow }) {
  const logOut = () => {
    localStorage.removeItem("auth");
    location.reload();
  };

  return (
    <DropdownButton drop={"start"}>
      <Dropdown.Item
        eventKey="1"
        onClick={() => {
          setEditUserModalShow(true);
        }}
      >
        Edit Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">Delete Account</Dropdown.Item>
      <Dropdown.Item eventKey="3" onClick={logOut}>
        Log Out
      </Dropdown.Item>
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
          <button className="logInButton">Save</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function AddPostModal(props) {
  const session = useSession();
  const { setAddPostModalShow } = props;
  const [newPostData, setNewPostData] = useState({});
  const [file, setFile] = useState();

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNewPostData({
      ...newPostData,
      [name]: value,
    });
  };

  const uploadRequest = async (file) => {
    const fileData = new FormData();
    fileData.append("img", file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/upload/cloud`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadedFile = await uploadRequest(file);
        const postFormData = {
          ...newPostData,
          img: uploadedFile.img,
          user: session._id,
        };
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormData),
          }
        );
        if (response.status === 201) {
          Swal.fire({
            title: "Post created successfully!",
            icon: "success",
            draggable: true,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops something went wrong!",
          });
        }
        setAddPostModalShow(false);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

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
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            className="modal-input p-3"
            placeholder="Title"
            name="title"
            onChange={onChangeInput}
          />
          <input
            type="file"
            className="modal-input p-3"
            name="img"
            onChange={onChangeFile}
          />
          <textarea
            placeholder="Description"
            className="modal-input p-3"
            name="description"
            onChange={onChangeInput}
          />
          <div className="w-100">Tag (Genre)</div>
          <select
            className="w-100 p-3 select"
            name="tag"
            onChange={onChangeInput}
          >
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
          setEditUserModalShow={setEditUserModalShow}
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
          <img src="/add.svg" alt="Add Post Icon" />
          Add Post
        </button>
        <AddPostModal
          show={addPostModalShow}
          onHide={() => setAddPostModalShow(false)}
          setAddPostModalShow={setAddPostModalShow}
        />
      </div>
    </div>
  );
};
export default ProfileData;
