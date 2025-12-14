// React import not required with the new JSX runtime
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {

  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const BACKEND_PORT = "__VITE_BACKEND_PORT__";
  const HOST ="__VITE_HOST__";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${HOST}:${BACKEND_PORT}/api/user/register`, data);

      if (response.status === 201 || response.status === 200) {
        setShowSuccessModal(true);
      }

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleGoToLogin = () => {
    setShowSuccessModal(false);
    const redirectTo = location.state?.from || "/login";
    navigate(redirectTo);
  };


  return (
    <>
      <Helmet>
        <title>Registration</title>
        <meta name="description" content="This is the Log In " />
      </Helmet>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="shadow p-5 rounded bg-custom-blue"
          style={{ maxWidth: "400px", width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center mb-4">Registration</h3>

          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your user name"
              {...register("username", { required: "User name is required" })}
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <Link to="/login">Login</Link>
        </form>
      </div>
      {showSuccessModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
            <h4 className="mb-3 text-success">Registration Successful 🎉</h4>
            <p>Your account has been created successfully. Please log in to continue.</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              
              <button className="btn btn-primary" onClick={handleGoToLogin}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
