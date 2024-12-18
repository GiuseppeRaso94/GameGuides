import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";

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
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container fluid className="mainSection py-5">
      <Row>
        <Col sm={0} lg={2}></Col>
        <Col sm={12} lg={8} className="d-flex flex-column gap-5">
          {!isLoading ? (
            user.posts.map((post) => (
              <SinglePost key={post._id} post={post}>
                <div className="px-3 d-flex flex-column">
                  <button className="commentsBtn d-flex justify-content-center align-items-center gap-3">
                    <img src="/assets/comments.svg" alt="Comments Icon" />
                    {post.comments.length}
                  </button>
                </div>
              </SinglePost>
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
