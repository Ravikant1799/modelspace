import axios from "axios";

export const fetchModelSpacesApi = async () => {
  return await axios.get(`/api/model-spaces`);
};

export const fetchModelSpaceApi = async (id) => {
  return await axios.get(`/api/model-spaces/${id}`);
};

export const handlePredictApi = async (id, inputs) => {
  return await axios.post(`/api/model-spaces/${id}/predict`, inputs);
};
