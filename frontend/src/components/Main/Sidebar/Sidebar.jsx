import Categories from "./Categories";
import Footer from "./Footer";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="d-flex justify-content-center pb-3">
        <a href="/" className="w-100">
          <button
            id="homeBtn"
            className="d-flex justify-content-center align-items-center gap-3"
          >
            <img src="/home.svg" alt="homeIcon" />
            Homepage
          </button>
        </a>
      </div>
      <Categories />
      <Footer />
    </>
  );
};

export default Sidebar;
