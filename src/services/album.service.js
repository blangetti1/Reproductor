import axios from "axios";

export const getAlbumsByArtistId = async (id) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response.data.items;
  } catch (error) {
    throw new Error("No se pudo obtener informacion del album");
  }
};
