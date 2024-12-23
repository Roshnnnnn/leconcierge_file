import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist";
import { authService } from "../../../services/authService";
import logo from "../../../assets/Logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [passwordResetCode, setPasswordResetCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await authService.handleForgotPassword(email);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setEmailSubmitted(true);
      setPasswordResetCode(result.passwordResetCode);
    } else {
      toast.error(result.error || "Failed to send email");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.verifyResetOtp(otp, passwordResetCode);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setOtpVerified(true);
      setIsOtpValid(true);
    } else {
      toast.error(result.error || "Invalid OTP");
      setIsOtpValid(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.resetPassword({
      passwordResetCode,
      otp,
      password,
      passwordConfirmation
    });
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.error || "Failed to reset password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#2C93FA]">
      {/* Logo Section */}
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-8 w-[90%] max-w-sm mb-6">
        <h2 className="text-center text-xl font-bold mb-6">
          {otpVerified ? "Reset" : "Forgot"}{" "}
          <span className="text-[#2C93FA]">Password</span>
        </h2>

        {/* Email Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!emailSubmitted && (
            <>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  📧
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2C93FA] text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !email}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </>
          )}
        </form>

        {/* OTP Form */}
        {emailSubmitted && !otpVerified && (
          <form className="space-y-6 mt-4" onSubmit={handlePasswordReset}>
            <div className="relative">
              <input
                type="text"
                placeholder="Reset Code"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C93FA] text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !otp}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {otpVerified && (
          <form className="space-y-6 mt-4" onSubmit={resetPassword}>
            <div className="relative">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 text-gray-700"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordConfirmation}
              onChange={(isValid) => {
                // You can use this to enable/disable the submit button
                setIsOtpValid(isValid);
              }}
            />

            <button
              type="submit"
              className="w-full bg-[#2C93FA] text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !isOtpValid}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>

      {/* Back Button */}
      <Link 
        to="/login" 
        className="mt-6 text-white font-semibold hover:underline cursor-pointer"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
