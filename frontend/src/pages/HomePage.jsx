import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Sidebar />
        <AllPosts />
      </Main>
    </>
  );
};

export default HomePage;
