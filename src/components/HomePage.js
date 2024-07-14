import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";
import ModelSpaceCard from "./ModelSpaceCard";
import Loader from "./Loader";
import CardLoader from "../assets/CardLoader.jpeg";
const HomePage = () => {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModelSpaces = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/model-spaces`
        );
        setModelSpaces(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModelSpaces();
  }, []);

  if (loading) return <Loader imgSrc={CardLoader} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <h1>Model Spaces</h1>
      <div className="model-space-list">
        {modelSpaces.map((space) => (
          <Link to={`/model-space/${space.id}`} key={space.id}>
            <ModelSpaceCard modelSpace={space} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
