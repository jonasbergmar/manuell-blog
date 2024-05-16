import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOutUser } from "../firebase/authFunctions";

const Navbar = () => {
  const { currentUser, userLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex mt-6 mx-10  justify-between items-center">
      <h2 className="font-bold">LOGO</h2>

      <nav className="flex items-center">
        {userLoggedIn ? (
          <>
            <Link to="/" className="mr-4">
              Home
            </Link>

            <Link to="/add-posts">Add posts</Link>
            <p className="mx-5 font-bold">{currentUser.email}</p>
            <button className=" bg-slate-100" onClick={signOutUser}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className="ml-5">
            <></>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
