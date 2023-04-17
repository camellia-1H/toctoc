import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data.data;
};

export const getVideo = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const getVideoPopular = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
