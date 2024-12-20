import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ProfileData from "./ProfileData";
import SinglePost from "./SinglePost";

const EditPostModal = (props) => {
  const { setEditPostModalShow } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-4 py-4">
        <Modal.Title id="contained-modal-title-vcenter">Edit post</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4 d-flex flex-column align-items-center gap-3">
        <form
          action=""
          className="w-100 d-flex flex-column align-items-center gap-3"
          encType="multipart/form-data"
        >
          <input
            type="text"
            className="modal-input p-3"
            placeholder="Title"
            name="title"
          />
          <input type="file" className="modal-input p-3" name="img" />
          <textarea
            placeholder="Description"
            className="modal-input p-3"
            name="description"
          />
          <div className="w-100">Tag (Genre)</div>
          <select className="w-100 p-3 select" name="tag">
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
          <button className="logInButton">Save</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

function OptionsDropDown() {
  const start = "start";
  const [editPostModalShow, setEditPostModalShow] = useState();
  return (
    <DropdownButton drop={start}>
      <Dropdown.Item eventKey="1" onClick={() => setEditPostModalShow(true)}>
        Edit Post
      </Dropdown.Item>
      <EditPostModal
        show={editPostModalShow}
        onHide={() => setEditPostModalShow(false)}
        setEditPostModalShow={setEditPostModalShow}
      />
      <Dropdown.Item eventKey="2">Delete Post</Dropdown.Item>
    </DropdownButton>
  );
}

const ProfileArea = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
      );
      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container fluid className="mainSections py-5">
      <Row className="mb-5">
        <Col sm={0} lg={1}></Col>
        <Col sm={12} lg={10} className="d-flex flex-column gap-5">
          {!isLoading ? (
            <ProfileData user={user} />
          ) : (
            <div className="singlePost w-100 p-3 d-flex justify-content-center align-content-center p-3">
              <Audio
                height="100"
                width="100"
                radius="9"
                color="rgb(11, 243, 241)"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          )}
        </Col>
        <Col sm={0} lg={1}></Col>
      </Row>
      <Row>
        <Col sm={0} lg={2}></Col>
        <Col sm={12} lg={8} className="d-flex flex-column gap-3">
          {!isLoading ? (
            user.posts.map((post) => (
              <>
                <div className="w-100 d-flex justify-content-end">
                  <OptionsDropDown />
                </div>
                <SinglePost key={post._id} post={post}>
                  <div className="d-flex justify-content-between align-items-center px-3">
                    <button className="ovalButtons d-flex justify-content-center align-items-center gap-2">
                      <img src="/comments.svg" alt="Comments Icon" />
                      {post.comments.length}
                    </button>
                  </div>
                </SinglePost>
              </>
            ))
          ) : (
            <div className="singlePost w-100 p-3 d-flex justify-content-center align-content-center p-3">
              <Audio
                height="100"
                width="100"
                radius="9"
                color="rgb(11, 243, 241)"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          )}
        </Col>
        <Col sm={0} lg={2}></Col>
      </Row>
    </Container>
  );
};

export default ProfileArea;
