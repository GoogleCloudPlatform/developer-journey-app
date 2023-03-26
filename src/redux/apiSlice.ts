// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mission } from 'src/models/Mission'
import { User } from 'src/models/User'
import { startMission } from './gameSlice';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getUser` endpoint is a "query" operation that returns data
    getUser: builder.query<User, void>({
      // The URL for the request is '/api/user', this is a GET request
      query: () => '/user',
      async onCacheEntryAdded(_, { dispatch }) {
        dispatch(startMission({}))
      },
      providesTags: ['User'],
    }),
    addCompletedMission: builder.mutation({
      // The URL for the request is '/api/user', this is a POST request
      query: ({mission}: {mission: Mission}) => ({
        url: '/user',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: mission,
      }),
      invalidatesTags: ['User']
    }),
  })
})

// Export the auto-generated hook for the `getUser` query endpoint
export const { useGetUserQuery, useAddCompletedMissionMutation } = apiSlice