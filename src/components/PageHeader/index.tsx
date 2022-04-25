import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useReadAllCategoriesQuery } from "../../app/services/categoryApi";

interface PageHeaderProps {
  pageHeaderTitle: string;
  handleSearch: any;
  handleSelect: any;
  descriptionPage: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  pageHeaderTitle,
  handleSearch,
  handleSelect,
  descriptionPage,
}: PageHeaderProps) => {
  const { data = [], isSuccess } = useReadAllCategoriesQuery();

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
    >
      <Flex
        direction="column"
        mb={{
          base: 4,
          lg: 0,
        }}
      >
        <Heading fontWeight={500}>{pageHeaderTitle}</Heading>
        <Text>{descriptionPage}</Text>
      </Flex>

      <Grid
        templateColumns={`repeat(${
          pageHeaderTitle !== "Bookmark" ? 2 : 1
        }, 1fr)`}
        justifyContent="space-between"
        gap={{
          base: 4,
          lg: 6,
        }}
      >
        {pageHeaderTitle !== "Bookmark" ? (
          <Select placeholder="Choose category" onChange={handleSelect}>
            {isSuccess &&
              data.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </Select>
        ) : (
          ""
        )}

        <Input
          placeholder="Search book by title of author"
          type="search"
          onInput={handleSearch}
        />
      </Grid>
    </Grid>
  );
};
