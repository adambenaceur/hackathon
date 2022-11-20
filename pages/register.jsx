import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./../lib/firebase";
import Head from "next/head";
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const HandleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
          });
          setLoading(false);
          router.push("/");
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setError("Email already in use");
          }
        });
    } else {
      setError("Password does not match");
    }
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");

      }
    });
  }, []);
  return (<>
    <Head>
      <title>Register Now</title>
    </Head>
    <div className="container text-center">
      <div className="form-signin w-100 m-auto pt-5">
        <form onSubmit={HandleSubmit}>
          <img
            className="mb-4"
            src="/images/icon.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please Register Now</h1>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-2">
            <input
              readOnly={loading}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="passwordOne"
              onChange={(event) => setPasswordOne(event.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>{" "}
          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="passwordTow"
              onChange={(event) => setPasswordTwo(event.target.value)}
            />
            <label htmlFor="floatingPassword">Re-Enter Password</label>
          </div>
          <p className="text-danger">{error} </p>
          <button
            disabled={loading}
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Register Now
          </button>
          <div className="pt-5">
            <Link href="/login" className="mt-5 mb-3 text-muted">
              <span className="nav-link active h4 ">
                Already Registered! Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>  </>
  );
}

export default Register;
