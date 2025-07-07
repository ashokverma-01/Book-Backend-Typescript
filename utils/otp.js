import User from "../model/user.model"; // Assuming you have a User model

// Utility function to verify OTP
export const verifyOtpUtility = async (userId, otp) => {
  // Find user by ID
  const user = await User.findById(userId);

  if (!user) {
    // If the user does not exist, return an error
    throw new Error("User not found");
  }

  if (!user.otp) {
    // If no OTP exists for the user, return false
    throw new Error("No OTP found for the user");
  }

  // Check if OTP matches
  if (user.otp !== otp) {
    return false; // OTP doesn't match
  }

  // Calculate the expiry time (5 minutes from sendTime)
  const otpExpiryTime = user.otp.sendTime + 5 * 60 * 1000; // OTP expires in 5 minutes

  // Check if the OTP has expired
  if (Date.now() > otpExpiryTime) {
    return false; // OTP has expired
  }

  // Optionally, clear the OTP after successful verification to prevent reuse
  user.otp = null;
  await user.save(); // Save the user to clear the OTP field

  return true; // OTP is valid
};
