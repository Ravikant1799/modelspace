import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchModelSpaceApi, handlePredictApi } from "../apis";
import Loader from "./Loader";
import ModelFormLoader from "../assets/ModelFormLoader.jpeg";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ModelSpacePage.scss";

const ModelSpacePage = () => {
  const { id } = useParams();
  const [modelSpace, setModelSpace] = useState(null);
  const [inputs, setInputs] = useState({});
  const [output, setOutput] = useState(null);
  const [outputType, setOutputType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictLoading, setPredictLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModelSpace = useCallback(() => {
    setLoading(true);
    fetchModelSpaceApi(id)
      .then(({ data }) => {
        setModelSpace(data.data);
        if (data?.data?.outputs && data?.data?.outputs[0]?.type) {
          setOutputType(data.data.outputs[0].type);
        }
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchModelSpace();
  }, [fetchModelSpace]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handlePredict = async () => {
    setPredictLoading(true);
    handlePredictApi(id, inputs)
      .then(({ data }) => {
        setOutput(data.data);
      })
      .catch((err) => {
        toast.error(`Prediction error: ${err.message}`);
      })
      .finally(() => {
        setPredictLoading(false);
      });
  };

  const RenderOutput = () => {
    const outputValue = Object.values(output)[0];
    switch (outputType) {
      case "text":
        return <p>{outputValue}</p>;
      case "number":
        return <p>{outputValue}</p>;
      case "bool":
        return <p>{outputValue ? "True" : "False"}</p>;
      case "image":
        return <img src={`${outputValue}`} alt={Object.keys(output)[0]} />;
      case "audio":
        return <audio controls src={`data:audio/wav;base64,${outputValue}`} />;
      case "images":
        return outputValue.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${Object.keys(output)[0]}-${index}`}
          />
        ));
      default:
        return null;
    }
  };

  if (loading) return <Loader imgSrc={ModelFormLoader} />;
  if (error) return <div className="loader">Error: {error}</div>;

  return (
    <div className="model-space-page">
      <h1>{modelSpace.name}</h1>
      <p>{modelSpace.description}</p>
      <div className="model-space">
        <form>
          <h2 style={{ textAlign: "center" }}>Input</h2>
          {modelSpace.inputs.map((input) => (
            <div key={input.name} className="input-group">
              <label>
                {input.name}
                <span style={{ color: "red" }}>
                  {input.required ? " *" : ""}
                </span>
              </label>
              {input.type === "text" && (
                <input
                  type="text"
                  name={input.name}
                  value={inputs[input.name] || ""}
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}
              {input.type === "number" && (
                <input
                  type="number"
                  name={input.name}
                  value={inputs[input.name] || ""}
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}
              {input.type === "bool" && (
                <input
                  type="checkbox"
                  name={input.name}
                  checked={inputs[input.name] || false}
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}
              {input.type === "image" && (
                <input
                  type="file"
                  name={input.name}
                  accept="image/*"
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}
              {input.type === "audio" && (
                <input
                  type="file"
                  name={input.name}
                  accept="audio/*"
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}
            </div>
          ))}
          <button type="button" onClick={handlePredict}>
            {predictLoading ? " Loading ... " : "Predict"}
          </button>
        </form>
        <div className="output">
          <h2>Output</h2>
          {output ? <RenderOutput /> : "Enter Prompts to Generate"}
        </div>
      </div>
    </div>
  );
};

export default ModelSpacePage;
