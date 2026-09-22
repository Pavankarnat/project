

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/order";

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = "Username is required";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = (() => {
      try {
        const parsed = JSON.parse(
          localStorage.getItem("pizzeria_users") || "[]"
        );
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })();

    const username = formData.username.trim().toLowerCase();

    const existingUser = users.find(
      (user) =>
        user.username.toLowerCase() === username &&
        user.password === formData.password
    );

    if (!existingUser) {
      setErrors({ password: "Invalid username or password" });
      return;
    }

    setErrors({});

    dispatch(
      loginUser({
        username: existingUser.username,
        email: existingUser.email,
      })
    );

    navigate(from, { replace: true });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-dark text-white text-center py-4">
              <h3 className="fw-bold mb-0 text-warning">🍕 Welcome Back</h3>
              <p className="text-secondary small mb-0 mt-1">
                Log in to order your favorite pizza
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">
                    Username
                  </label>

                  <input
                    id="username"
                    className={`form-control rounded-3 ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                  />

                  {errors.username && (
                    <div className="invalid-feedback">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    id="password"
                    className={`form-control rounded-3 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />

                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-2 fw-bold text-dark rounded-3 shadow-sm"
                >
                  Login to Account
                </button>
              </form>
            </div>

            <div className="card-footer bg-light text-center py-3 border-0">
              <p className="mb-0 text-muted small">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-warning fw-bold text-decoration-none"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;