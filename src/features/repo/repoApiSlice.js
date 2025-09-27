import { apiSlice } from '../api/apiSlice';

export const repoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listRepos: builder.query({ query: () => '/repositories', providesTags: ['Repo'] }),
    getRepo: builder.query({ query: ({ owner, name }) => `/repositories/${owner}/${name}`, providesTags: ['Repo'] }),
    subscribe: builder.mutation({ query: (data) => ({ url: '/subscriptions', method: 'POST', body: data }), invalidatesTags: ['Subscription'] }),
  }),
});

export const { useListReposQuery, useGetRepoQuery, useSubscribeMutation } = repoApiSlice;
