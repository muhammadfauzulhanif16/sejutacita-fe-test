import type { NextPage } from "next";
import { useState } from "react";
import { useReadBooksPerpageQuery } from "../app/services/bookApi";
import { Shelf } from "../components/Shelf";

const Home: NextPage = () => {
  const [categoryId, setCategoryId] = useState<number>(0),
    [page, setPage] = useState<number>(0),
    [limit, setLimit] = useState<number>(10);

  const {
    data: books = [],
    isSuccess: isSuccessBooks,
    isLoading: isLoadingBooks,
    isFetching: isFetchingBooks,
  } = useReadBooksPerpageQuery({ categoryId, limit, page });

  const handleSelect = ({ target: { value } }: any) => {
    setPage(0);
    setCategoryId(Number(value));
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
      limit={limit}
      setLimit={setLimit}
    />
  );
};

export default Home;
