import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { auth } from "../../lib/firebase";
import { Context } from "./../../context";
function BasicExample() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            id: user.uid,
            email: user.email,
            name: user.displayName,
          },
        })
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        })
      }
    },

  );

  const HandleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        })
        // Update Other Dispatch FN
      })
      .catch((error) => { });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Habit Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {state.user ? (<>
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/habit-list" className="nav-link active">
                  Habit
                </Link>
              </li>
            </ul>
            <div className="btn-group ">
              <button
                onClick={HandleSignout}
                className='btn btn-sm btn-danger  text-light'
              >
                Signout @  {state.user.name}
              </button>
            </div></>

          ) : (
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">


              <li className="nav-item">
                <Link href="/login" className="nav-link active">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register" className="nav-link active">
                  Register
                </Link>
              </li>
            </ul>
          )}


          {/* <span className="navbar-text">
            Signed In :  {state?.user.name}
          </span> 
          
          
            <li className="nav-item">
                <button
                  onClick={HandleSignout} className=" btn">
                  Logout
                </button>
              </li>
          */}
        </div>
      </div>
    </nav>
  );
}

export default BasicExample;
