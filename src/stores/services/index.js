import { createApi } from '@reduxjs/toolkit/query/react';
import { SGConnectionInstance } from '../../api/axios';

const axiosBaseQuery = () => async (axiosConfigs) => {
  const { body, ...configs } = axiosConfigs;

  try {
    const result = await SGConnectionInstance.request({
      ...configs,
      data: body,
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

const baseRtkApi = createApi({
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 15,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ['book', 'admin', 'reader', 'user', 'request'],
});

export default baseRtkApi;
