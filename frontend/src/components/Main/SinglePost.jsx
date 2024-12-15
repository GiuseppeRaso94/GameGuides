const SinglePost = (props) => {
  const { post } = props;
  return (
    <div className="singlePost p-4 d-flex flex-column gap-3">
      <span>{post.user.userName}</span>
      <span>{post.description}</span>
      <img src={`${post.img}`} alt="" />
      <div className="d-flex flex-column">
        <span>Comment 1</span>
        <span>Comment 2</span>
      </div>
    </div>
  );
};

export default SinglePost;
