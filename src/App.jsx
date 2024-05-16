import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import AddPostPage from "./pages/AddPostPage";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PrivateRoutes from "./components/PrivateRoutes";
import { BlogProvider } from "./context/BlogContext";

const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<BlogPage />} />
            <Route path="/add-posts" element={<AddPostPage />} />
          </Route>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
