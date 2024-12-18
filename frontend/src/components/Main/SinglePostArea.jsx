import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CommentsArea from "./CommentsArea";
import SinglePost from "./SinglePost";

const SinglePostArea = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getPost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`
      );
      const data = await response.json();
      setPost(data.post);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container fluid className="mainSection py-5">
      <Row>
        <Col sm={0} lg={2}></Col>
        <Col sm={12} lg={8} className="d-flex flex-column gap-5">
          {!isLoading ? (
            <SinglePost post={post}>
              <CommentsArea comments={post.comments} />
            </SinglePost>
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

export default SinglePostArea;
