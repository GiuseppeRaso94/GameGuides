import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Audio } from "react-loader-spinner";
import SinglePost from "./SinglePost";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
      const data = await response.json();
      setPosts(data.posts);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container fluid className="postsSection py-5">
      <Row>
        <Col sm={0} lg={2}></Col>
        <Col sm={12} lg={8} className="d-flex flex-column gap-5">
          {!isLoading ? (
            posts.map((post) => <SinglePost key={post._id} post={post} />)
          ) : (
            <Audio
              height="100"
              width="100"
              radius="9"
              color="rgb(11, 243, 241)"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          )}
        </Col>
        <Col sm={0} lg={2}></Col>
      </Row>
    </Container>
  );
};

export default AllPosts;
