import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CardSlice = createApi({
  reducerPath: "getCards",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66d8847037b1cadd8054edfe.mockapi.io",
  }),
  tagTypes: ["Cards"],
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => `/cards`,
      providesTags: ["Cards"],
    }),
    getCard: builder.query({
      query: (id) => `/cards/${id}`,
      providesTags: ["Cards"],
    }),
    deleteCard: builder.mutation({
      query: (cardId) => ({
        url: `/cards/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cards"],
    }),
    editCard: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cards"],
    }),
    addCard: builder.mutation({
      query: (newCard) => ({
        url: `/cards`,
        method: "POST",
        body: newCard,
      }),
      invalidatesTags: ["Cards"],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetCardQuery,
  useAddCardMutation,
} = CardSlice;
