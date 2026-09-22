
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../redux/slices/authSlice";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!formData.username.trim()) {
      errs.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Email is invalid";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

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

    const username = formData.username.trim();
    const email = formData.email.trim();

    const duplicateUsername = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    const duplicateEmail = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicateUsername || duplicateEmail) {
      const duplicateErrors = {};

      if (duplicateUsername) {
        duplicateErrors.username = "Username already exists";
      }

      if (duplicateEmail) {
        duplicateErrors.email = "Email already registered";
      }

      setErrors(duplicateErrors);
      return;
    }

    dispatch(
      registerUser({
        username,
        email,
        password: formData.password,
      })
    );

    navigate("/order", { replace: true });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-dark text-white text-center py-4">
              <h3 className="fw-bold mb-0 text-warning">
                🎉 Join Pizzeria
              </h3>

              <p className="text-secondary small mb-0 mt-1">
                Create an account to start building custom pizzas
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label
                    htmlFor="reg-username"
                    className="form-label fw-semibold"
                  >
                    Username
                  </label>

                  <input
                    id="reg-username"
                    className={`form-control rounded-3 ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Choose a username"
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

                <div className="mb-3">
                  <label
                    htmlFor="reg-email"
                    className="form-label fw-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="reg-email"
                    className={`form-control rounded-3 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="reg-password"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>

                  <input
                    id="reg-password"
                    className={`form-control rounded-3 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    placeholder="At least 6 characters"
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
                  Create Account
                </button>
              </form>
            </div>

            <div className="card-footer bg-light text-center py-3 border-0">
              <p className="mb-0 text-muted small">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-warning fw-bold text-decoration-none"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;