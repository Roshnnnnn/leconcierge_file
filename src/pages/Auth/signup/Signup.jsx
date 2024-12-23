import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { authService } from "../../../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dialCode: "971",
    phone: "",
    deviceType: "WEB",
    fcmToken: uuidv4(),
    password: "",
    confPassword: "",
    deviceCartId: uuidv4(),
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.signup(formData);
    setLoading(false);

    if (result.success) {
      setUserId(result.userId);
      setIsSignedUp(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.verifyOtp(formData.otp, userId);
    setLoading(false);

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2C93FA] py-16">
      <div className="bg-white rounded-lg shadow-md p-8 w-[90%] max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold mt-4">Le concierge</h1>
          <p className="text-sm text-gray-500">by Khaf Royal</p>
        </div>
        <h2 className="text-center text-xl font-bold mb-6">
          Let's <span className="text-blue-500">Start</span>
        </h2>

        {!isSignedUp ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                👤
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                👤
              </span>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                📧
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="px-4 py-2 bg-blue-50 border border-r-0 rounded-l-lg text-gray-500">
                +971
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Mobile"
                className="w-full px-4 py-2 border rounded-r-lg bg-blue-50 text-gray-700"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                📱
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confPassword"
                value={formData.confPassword || ""}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Continue
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleOtpSubmit}>
            <div className="relative">
              <input
                type="text"
                name="otp"
                value={formData.otp || ""}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Confirm OTP
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
