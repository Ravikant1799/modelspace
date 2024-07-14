import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const siteUrl = "https://modelspace.netlify.app/";

export const fetchModelSpacesApi = async () => {
  return await axios.get(`${API_BASE_URL}/model-spaces`);
};

export const fetchModelSpaceApi = async (id) => {
  return await axios.get(`${API_BASE_URL}/model-spaces/${id}`);
};

export const handlePredictApi = async (id, inputs) => {
  return await axios.post(`${siteUrl}/api/model-spaces/${id}/predict`, inputs);
};
