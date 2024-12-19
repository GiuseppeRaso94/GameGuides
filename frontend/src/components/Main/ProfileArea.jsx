import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ProfileData from "./ProfileData";
import SinglePost from "./SinglePost";

function OptionsDropDown({ setEditUserModalShow }) {
  const start = "start";
  return (
    <DropdownButton drop={start}>
      <Dropdown.Item eventKey="1">Edit Post</Dropdown.Item>
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
                      <img src="/assets/comments.svg" alt="Comments Icon" />
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
