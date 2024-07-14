import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchModelSpacesApi } from "../apis";
import ModelSpaceCard from "./ModelSpaceCard";
import Loader from "./Loader";
import CardLoader from "../assets/CardLoader.jpeg";
import "../styles/HomePage.scss";

const HomePage = () => {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModelSpaces = useCallback(() => {
    setLoading(true);
    fetchModelSpacesApi()
      .then(({ data }) => {
        setModelSpaces(data.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchModelSpaces();
  }, [fetchModelSpaces]);

  return (
    <div className="home-page">
      <h1>Model Spaces</h1>
      {loading ? (
        <Loader imgSrc={CardLoader} />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="model-space-list">
          {modelSpaces.map((space) => (
            <Link to={`/model-space/${space.id}`} key={space.id}>
              <ModelSpaceCard modelSpace={space} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
