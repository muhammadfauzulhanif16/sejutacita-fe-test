import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios";

type Category = {
  id: number;
  name: string;
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: axiosBaseQuery({
    baseUrl:
      "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?",
  }),
  tagTypes: ["Book"],
  endpoints: ({ query }) => ({
    readAllBooksByCategory: query({
      query: ({ categoryId = "0" }) => {
        return {
          url: `categoryId=${categoryId}`,
          method: "get",
        };
      },
      providesTags: ["Book"],
    }),
    readBooksPerpage: query({
      query: ({ categoryId = "0", limit = "10", page = "0" }) => ({
        url: `categoryId=${categoryId}&size=${limit}&page=${page}`,
        method: "get",
      }),
      providesTags: ["Book"],
    }),
  }),
});

export const { useReadAllBooksByCategoryQuery, useReadBooksPerpageQuery } =
  bookApi;
