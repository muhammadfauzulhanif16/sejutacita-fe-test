import type { NextPage } from "next";
import { useState } from "react";
import { useReadBooksPerpageQuery } from "../app/services/bookApi";
import { Shelf } from "../components/Shelf";

const Home: NextPage = () => {
  const [categoryId, setCategoryId] = useState<string>(""),
    [page, setPage] = useState<string>("");

  const {
    data: books = [],
    isSuccess: isSuccessBooks,
    isLoading: isLoadingBooks,
    isFetching: isFetchingBooks,
  } = useReadBooksPerpageQuery({ categoryId, page });

  const handleSelect = ({ target: { value } }: any) => {
    setPage("");
    setCategoryId(String(value));
  };

  return (
    <Shelf
      titlePage="Library"
      descriptionPage="All collections of interesting books"
      data={books}
      isSuccessBooks={isSuccessBooks}
      isLoadingBooks={isLoadingBooks}
      isFetchingBooks={isFetchingBooks}
      handleSelect={handleSelect}
      categoryId={categoryId}
      page={page}
      setPage={setPage}
    />
  );
};

export default Home;
