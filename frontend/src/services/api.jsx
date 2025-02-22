import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed


export const fetchTransactions = async (month, page = 1, perPage = 10) => {
  return axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, page, perPage },
  });
};

export const fetchStatistics = async (month) => {
  return axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
};

export const fetchBarChart = async (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
};

export const fetchPieChart = async (month) => {
  return axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });
};

export const fetchCombinedData = async (month) => {
  return axios.get(`${API_BASE_URL}/combined`, { params: { month } });
};
