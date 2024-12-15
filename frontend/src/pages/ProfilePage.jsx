import "bootstrap/dist/css/bootstrap.min.css";
import Main from "../components/Main/Main";
import ProfileArea from "../components/Main/ProfileArea";
import MyNav from "../components/MyNav/MyNav";

const ProfilePage = () => {
  return (
    <>
      <MyNav />
      <Main>
        <ProfileArea />
      </Main>
    </>
  );
};

export default ProfilePage;
