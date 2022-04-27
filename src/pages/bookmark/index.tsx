import { FC } from "react";
import { RootState } from "../../app";
import { useAppSelector } from "../../app/hooks";
import { Shelf } from "../../components/Shelf";

const Bookmark: FC<{}> = (): JSX.Element => {
  const bookmarkData = useAppSelector(
    ({ bookmark }: RootState) => bookmark.data
  );

  return (
    <Shelf
      titlePage="Bookmark"
      data={bookmarkData}
      descriptionPage="All books marked"
    />
  );
};

export default Bookmark;
