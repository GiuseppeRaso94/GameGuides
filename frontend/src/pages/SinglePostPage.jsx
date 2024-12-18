import "bootstrap/dist/css/bootstrap.min.css";
import Main from "../components/Main/Main";
import SinglePostArea from "../components/Main/SinglePostArea";
import MyNav from "../components/MyNav/MyNav";

const SinglePostPage = () => {
  return (
    <>
      <MyNav />
      <Main>
        <SinglePostArea />
      </Main>
    </>
  );
};

export default SinglePostPage;
