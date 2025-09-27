import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({ query: () => '/auth/me', providesTags: ['User'] }),
    logout: builder.mutation({ query: () => ({ url: '/auth/logout', method: 'POST' }), invalidatesTags: ['User'] }),
  }),
});

export const { useGetMeQuery, useLogoutMutation } = authApiSlice;
