import axios from "axios";

export const getAccessToken = async (clientId, clientSecret) => {
  const client_id = localStorage.getItem("CLIENT_ID");
  const client_secret = localStorage.getItem("CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    clientId = client_id;
    clientSecret = client_secret;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
      }
    );

    if (response.data) {
      localStorage.setItem("CLIENT_ID", clientId);
      localStorage.setItem("CLIENT_SECRET", clientSecret);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem(
        "expires_token",
        (Date.now() + response.data.expires_in * 1000).toString()
      );
    }
  } catch (error) {
    throw new Error("Hubo un error en la solicitud");
  }
};
