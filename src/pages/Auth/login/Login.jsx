import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../../services/authService";
import logo from "../../../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 py-16">
      <div className="bg-white rounded-lg shadow-md p-8 w-[90%] max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold mt-4">Le concierge</h1>
          <p className="text-sm text-gray-500">by Khaf Royal</p>
        </div>

        {/* Welcome Message */}
        <h2 className="text-center text-xl font-bold mb-4">
          Welcome <span className="text-blue-500">Back</span>
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                required
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                📧
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/forgot"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center text-sm text-gray-500 mb-4">
          Social Login
        </div>
        <button className="w-full flex items-center justify-center border rounded-lg py-2 bg-white hover:bg-gray-100">
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>

        {/* Sign Up */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don&#39;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
