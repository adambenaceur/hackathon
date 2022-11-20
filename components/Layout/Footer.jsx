import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
          <Link href="/" className="nav-link active">
                Home
              </Link>
          </li>
          <li className="nav-item">
              <Link href="/about" className="nav-link active">
                About
              </Link>
            </li>
        </ul>
        <p className="text-center text-muted">© 2022 Company, Inc</p>
      </footer>
    </div>
  );
}

export default Footer;
