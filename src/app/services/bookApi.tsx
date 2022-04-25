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
      query: ({ categoryId = "" }) => {
        console.log("categoryId", categoryId);

        return {
          url: `categoryId=${categoryId}`,
          method: "get",
        };
      },
      providesTags: ["Book"],
    }),
    readBooksPerpage: query({
      query: ({ categoryId = "", page = "1" }) => ({
        url: `categoryId=${Number(categoryId)}&page=${Number(page)}`,
        method: "get",
      }),
      providesTags: ["Book"],
    }),
  }),
});

export const { useReadAllBooksByCategoryQuery, useReadBooksPerpageQuery } =
  bookApi;
