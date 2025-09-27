import { apiSlice } from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({ query: () => '/user/settings', providesTags: ['User'] }),
    updateSettings: builder.mutation({ query: (data) => ({ url: '/user/settings', method: 'PUT', body: data }), invalidatesTags: ['User'] }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = userApiSlice;
