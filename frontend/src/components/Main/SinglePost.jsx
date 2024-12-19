import { Link } from "react-router-dom";

const SinglePost = ({ children, ...props }) => {
  const { post } = props;
  return (
    <Link to={`/posts/${post._id}`}>
      <div className="singlePost p-3 d-flex flex-column gap-3">
        <div className="d-flex justify-content-between">
          <span className="px-3 bolder">{post.user.userName}</span>
          <span className="oval">{post.tag}</span>
        </div>
        <span className="px-3">{post.title}</span>
        <img id="postImg" src={`${post.img}`} alt="Post Image" />
        <div className="d-flex flex-column">{children}</div>
      </div>
    </Link>
  );
};

export default SinglePost;
