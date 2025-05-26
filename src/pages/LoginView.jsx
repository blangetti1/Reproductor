import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccessToken } from "../services/token.service";
import Input from "../components/Input";

const LoginView = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await getAccessToken(clientId, clientSecret)
      .then(() => {
        alert("Registrado correctamente");
        navigate("/home");  // Cambiado de "/" a "/home"
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <div>
          <p>{error}</p>
          <form onSubmit={onSubmit}>
            <Input
              label="Clave ID"
              onChange={(e) => setClientId(e.target.value)}
            />
            <Input
              label="Clave secreta"
              onChange={(e) => setClientSecret(e.target.value)}
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginView;
