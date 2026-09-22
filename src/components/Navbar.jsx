import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartTotalCount,
  selectCartTotalAmount,
} from "../redux/slices/cartSlice";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const totalItems = useSelector(selectCartTotalCount);
  const totalAmount = useSelector(selectCartTotalAmount);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span className="fs-3 fw-bold text-warning">Pizzeria</span>
          <div
            style={{
              borderLeft: "2px solid #555",
              height: "30px",
            }}
          />
          <img
            src="/image.png"
            alt="Pizzeria Logo"
            width="50"
            height="35"
            style={{ objectFit: "contain" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/order">
                Order Pizza
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link className="nav-link text-white fw-semibold" to="/build">
                Build Your Pizza
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <>
                <span className="text-white small">
                  Welcome, <strong>{user?.username}</strong>
                </span>

                <Link to="/cart" className="text-decoration-none">
                  <button className="btn btn-warning position-relative d-flex align-items-center gap-2 px-3 py-1 shadow-sm rounded-pill fw-bold">
                    <span className="fs-5">🛒</span>
                    <span>₹{totalAmount}</span>

                    {totalItems > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow">
                        {totalItems}
                        <span className="visually-hidden">items in cart</span>
                      </span>
                    )}
                  </button>
                </Link>

                <button
                  className="btn btn-danger btn-md ms-2"
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-warning btn-sm fw-bold">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
