import axios from "axios";
import { updateProfile } from "../features/profile/profileSlice";

const baseUrl = "http://localhost:3001/api/v1";

export const handleUpdateProfile = async (
  firstName,
  lastName,
  userToken,
  dispatch
) => {
  if (firstName && lastName) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `${baseUrl}/user/profile`,
        { firstName, lastName },
        config
      );
      dispatch(updateProfile({ firstName, lastName }));
      return response.data.body;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  }
};
