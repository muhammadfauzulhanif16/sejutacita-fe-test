import {
  Box,
  Grid,
  Text,
  Img,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState, FC } from "react";
import { useReadAllCategoriesQuery } from "../../app/services/categoryApi";
import { Layout } from "../Layout";
import {
  Book,
  Bookmark,
  BookmarkOff,
} from "@emotion-icons/fluentui-system-regular";
import { IconButton } from "../IconButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createBookmark, removeBookmark } from "../../app/services/bookmarkApi";
import { Icon } from "../Icon";
import { RootState } from "../../app";

interface ShelfProps {
  titlePage: string;
  data: any;
  isSuccessBooks?: boolean;
  isLoadingBooks?: boolean;
  isFetchingBooks?: boolean;
  handleSelect?: any;
  categoryId?: any;
  page?: any;
  setPage?: any;
  descriptionPage: string;
  limit?: any;
  setLimit?: any;
}

export const Shelf: FC<ShelfProps> = ({
  titlePage,
  data,
  isSuccessBooks,
  isLoadingBooks,
  isFetchingBooks,
  handleSelect,
  categoryId,
  page,
  setPage,
  descriptionPage,
  limit,
  setLimit,
}: ShelfProps) => {
  const dispatch = useAppDispatch();
  const bookmarkData = useAppSelector(
    ({ bookmark }: RootState) => bookmark.data
  );

  const [search, setSearch] = useState<string>("");

  const { isSuccess: isSuccessCategories } = useReadAllCategoriesQuery();

  const handleSearch = ({ target: { value } }: any) => {
    setSearch(value);
  };

  const gray = {
    "50-900": useColorModeValue("gray.50", "gray.900"),
    "200-700": useColorModeValue("gray.200", "gray.700"),
    "100-800": useColorModeValue("gray.100", "gray.800"),
  };

  const bookFilter = data.filter((book: any): void => {
    const { title, authors } = book;

    return book === ""
      ? book
      : title.toLowerCase().includes(search.toLowerCase()) ||
          authors.toString().toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Layout
      titlePage={titlePage}
      descriptionPage={descriptionPage}
      handleSelect={handleSelect}
      handleSearch={handleSearch}
      setPage={setPage}
      page={page}
      isSuccessBooks={isSuccessBooks}
      categoryId={categoryId}
      limit={limit}
      setLimit={setLimit}
    >
      <Box h="full">
        {titlePage !== "Bookmark" ? (
          isSuccessCategories && (
            <>
              {isLoadingBooks || isFetchingBooks ? (
                <Center h="full">
                  <Spinner size="xl" thickness="4px" color={gray["200-700"]} />
                </Center>
              ) : (
                <>
                  {isSuccessBooks ? (
                    <>
                      {bookFilter.length === 0 ? (
                        <IconButton
                          as={Book}
                          text={`No books found`}
                          textProps={{
                            mt: 8,
                            fontWeight: 500,
                            fontSize: "lg",
                          }}
                          iconProps={{
                            w: 12,
                            h: 12,
                          }}
                          buttonProps={{
                            color: "gray.400",
                            display: "flex",
                            flexDirection: "column",
                            variant: "none",
                            cursor: "default",
                            p: 0,
                            w: "full",
                            h: "full",
                          }}
                        />
                      ) : (
                        <Grid
                          templateColumns={{
                            base: "repeat(2, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(5, 1fr)",
                          }}
                          overflow="hidden"
                          gap={{
                            base: 4,
                            sm: 6,
                            md: 8,
                            lg: 12,
                          }}
                          css={{
                            "&::-webkit-scrollbar": {
                              width: ".5rem",
                              height: ".5rem",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "#a0aec0",
                              borderRadius: "1rem",
                            },
                          }}
                        >
                          <>
                            {bookFilter.map((book: any): JSX.Element => {
                              const { id, title, authors, cover_url } = book;

                              return (
                                <Box
                                  key={id}
                                  cursor="pointer"
                                  pos="relative"
                                  overflow="hidden"
                                >
                                  <Img
                                    src={cover_url}
                                    alt={title}
                                    h="auto"
                                    rounded={16}
                                  />

                                  <Box
                                    h="full"
                                    w="full"
                                    pos="absolute"
                                    bottom={0}
                                    p={4}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="end"
                                    rounded={16}
                                    bgGradient={`linear(to-b, rgba(255, 255, 255, 0), ${gray["50-900"]})`}
                                  >
                                    <Text
                                      isTruncated
                                      fontSize="sm"
                                      title={authors.join(", ")}
                                    >
                                      {authors.join(", ")}
                                    </Text>
                                    <Text
                                      title={title}
                                      fontWeight="600"
                                      fontSize="md"
                                      isTruncated
                                    >
                                      {title}
                                    </Text>
                                  </Box>

                                  <Icon
                                    as={Bookmark}
                                    onClick={() =>
                                      dispatch(
                                        createBookmark(bookmarkData, book)
                                      )
                                    }
                                    label="Add to bookmark"
                                  />
                                </Box>
                              );
                            })}
                          </>
                        </Grid>
                      )}
                    </>
                  ) : (
                    <IconButton
                      as={Book}
                      text={`${"Please choose a category"}`}
                      textProps={{
                        mt: 8,
                        fontWeight: 500,
                        fontSize: "lg",
                      }}
                      iconProps={{
                        w: 12,
                        h: 12,
                      }}
                      buttonProps={{
                        color: "gray.400",
                        display: "flex",
                        flexDirection: "column",
                        variant: "none",
                        cursor: "default",
                        p: 0,
                        w: "full",
                        h: "full",
                      }}
                    />
                  )}
                </>
              )}
            </>
          )
        ) : (
          <>
            {data.length === 0 ? (
              <IconButton
                as={Book}
                text={`No books on bookmark`}
                textProps={{
                  mt: 8,
                  fontWeight: 500,
                  fontSize: "lg",
                }}
                iconProps={{
                  w: 12,
                  h: 12,
                }}
                buttonProps={{
                  color: "gray.400",
                  display: "flex",
                  flexDirection: "column",
                  variant: "none",
                  cursor: "default",
                  p: 0,
                  w: "full",
                  h: "full",
                }}
              />
            ) : (
              <>
                {bookFilter.length === 0 ? (
                  <IconButton
                    as={Book}
                    text={`No books searched`}
                    textProps={{
                      mt: 8,
                      fontWeight: 500,
                      fontSize: "lg",
                    }}
                    iconProps={{
                      w: 12,
                      h: 12,
                    }}
                    buttonProps={{
                      color: "gray.400",
                      display: "flex",
                      flexDirection: "column",
                      variant: "none",
                      cursor: "default",
                      p: 0,
                      w: "full",
                      h: "full",
                    }}
                  />
                ) : (
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      sm: "repeat(3, 1fr)",
                      md: "repeat(4, 1fr)",
                      lg: "repeat(5, 1fr)",
                    }}
                    overflow="hidden"
                    gap={{
                      base: 4,
                      sm: 6,
                      md: 8,
                      lg: 12,
                    }}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: ".5rem",
                        height: ".5rem",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#a0aec0",
                        borderRadius: "1rem",
                      },
                    }}
                  >
                    <>
                      {bookFilter.map((book: any): JSX.Element => {
                        const { id, title, authors, cover_url } = book;

                        return (
                          <Box
                            key={id}
                            cursor="pointer"
                            pos="relative"
                            overflow="hidden"
                          >
                            <Img
                              src={cover_url}
                              alt={title}
                              h="auto"
                              rounded={16}
                            />

                            <Box
                              h="full"
                              w="full"
                              pos="absolute"
                              bottom={0}
                              p={4}
                              display="flex"
                              flexDirection="column"
                              justifyContent="end"
                              rounded={16}
                              bgGradient={`linear(to-b, rgba(255, 255, 255, 0), ${gray["50-900"]})`}
                            >
                              <Text
                                isTruncated
                                fontSize="sm"
                                title={authors.join(", ")}
                              >
                                {authors.join(", ")}
                              </Text>
                              <Text
                                title={title}
                                fontWeight="600"
                                fontSize="md"
                                isTruncated
                              >
                                {title}
                              </Text>
                            </Box>

                            <Icon
                              as={BookmarkOff}
                              onClick={() =>
                                dispatch(removeBookmark(bookmarkData, book))
                              }
                              label="Remove from bookmark"
                            />
                          </Box>
                        );
                      })}
                    </>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};
