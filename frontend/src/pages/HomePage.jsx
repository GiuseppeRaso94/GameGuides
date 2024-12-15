import "bootstrap/dist/css/bootstrap.min.css";
import AllPosts from "../components/Main/AllPosts";
import Main from "../components/Main/Main";
import MyNav from "../components/MyNav/MyNav";

const HomePage = () => {
  return (
    <>
      <MyNav />
      <Main>
        <AllPosts />
      </Main>
    </>
  );
};

export default HomePage;
