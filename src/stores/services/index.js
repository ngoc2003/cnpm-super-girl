import { createApi } from '@reduxjs/toolkit/query/react';
import { SGConnectionInstance } from '../../api/axios';

const axiosBaseQuery =
  () =>
  async (axiosConfigs, { getState }) => {
    const { data, ...configs } = axiosConfigs;
    const state = getState();

    try {
      const result = await SGConnectionInstance.request({
        ...configs,
        data,
        headers: {
          ...(state.auth.token
            ? {
                'X-App-Id': 'SYSTEM-PREFERENCE',
                'X-App-Secret': state.auth.token,
              }
            : {}),
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError;

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

const baseRtkApi = createApi({
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 15,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ['user'],
});

export default baseRtkApi;
