import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./middlewares/ProtectedRoutes.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user-profile/:userId" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
