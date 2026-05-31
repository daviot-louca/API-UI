const url = "http://localhost:3030/messages";
import axios from "axios";

export const getMessages = async (ticketId, token) => {
  try {
    const response = await axios.get(`${url}/${ticketId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (token, ticketId, message) => {
  try {
    const response = await axios.post(
      `${url}/${ticketId}`,
      {
        message,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
