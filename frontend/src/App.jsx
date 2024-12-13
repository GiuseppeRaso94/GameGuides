import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./middlewares/ProtectedRoutes.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostCreation from "./pages/PostCreation.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user-profile/:userId" element={<ProfilePage />} />
          <Route
            path="/user-profile/:userId/post-creation"
            element={<PostCreation />}
          />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
