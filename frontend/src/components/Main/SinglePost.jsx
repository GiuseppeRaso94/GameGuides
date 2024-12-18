import { Link } from "react-router-dom";

const SinglePost = ({ children, ...props }) => {
  const { post } = props;
  return (
    <Link to={`/posts/${post._id}`}>
      <div className="singlePost p-3 d-flex flex-column gap-3">
        <span id="user" className="px-3">
          {post.user.userName}
        </span>
        <span className="px-3">{post.description}</span>
        <img id="postImg" src={`${post.img}`} alt="Post Image" />
        <div className="pe-3">{children}</div>
      </div>
    </Link>
  );
};

export default SinglePost;
