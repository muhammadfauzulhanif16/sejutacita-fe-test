import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios";

type Category = {
  id: number;
  name: string;
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://asia-southeast2-sejutacita-app.cloudfunctions.net/",
  }),
  tagTypes: ["Category"],
  endpoints: ({ query }) => ({
    readAllCategories: query<Array<Category>, void>({
      query: () => ({
        url: "fee-assessment-categories",
        method: "get",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useReadAllCategoriesQuery } = categoryApi;
