import axios from "axios";

export const searchArtist = async (search) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.artists.items;
  } catch (error) {
    console.error("Error al buscar el artista", error);
  }
};

export const getArtist = async (id) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("No se encontró el artista");
  }
};
