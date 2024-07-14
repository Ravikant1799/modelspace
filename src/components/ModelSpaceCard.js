import React from "react";
import "../styles/ModelSpaceCard.scss";

const ModelSpaceCard = ({ modelSpace }) => (
  <div className="model-space-card">
    <img src={modelSpace.avatar} alt={modelSpace.name} />
    <h2>{modelSpace.name}</h2>
    <p>{modelSpace.description}</p>
  </div>
);

export default ModelSpaceCard;
