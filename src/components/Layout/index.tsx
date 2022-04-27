import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import Head from "next/head";
import { PageHeader } from "../PageHeader";
import { NavBar } from "../NavBar";
import { useReadAllCategoriesQuery } from "../../app/services/categoryApi";
import { IconButton } from "../IconButton";
import {
  Dismiss,
  ArrowLeft,
  ArrowRight,
  Page,
  Book,
} from "@emotion-icons/fluentui-system-regular";
import { useReadAllBooksByCategoryQuery } from "../../app/services/bookApi";

interface LayoutProps {
  children: any;
  titlePage: string;
  handleSearch?: any;
  handleSelect?: any;
  page?: any;
  setPage?: any;
  isSuccessBooks?: boolean;
  categoryId?: any;
  descriptionPage: string;
  limit?: any;
  setLimit?: any;
}

export const Layout: FC<LayoutProps> = ({
  children,
  titlePage,
  handleSearch,
  handleSelect,
  page,
  setPage,
  isSuccessBooks,
  categoryId,
  descriptionPage,
  limit,
  setLimit,
}: LayoutProps): JSX.Element => {
  const { colorMode } = useColorMode();

  const { isError } = useReadAllCategoriesQuery(),
    { data = [] } = useReadAllBooksByCategoryQuery({ categoryId });

  const gray = {
    "50-900": useColorModeValue("gray.50", "gray.900"),
    "900-50": useColorModeValue("gray.900", "gray.50"),
    "100-800": useColorModeValue("gray.100", "gray.800"),
  };

  const nextPage = () => {
    setPage((old: any) => old + 1);
  };
  const previousPage = () => {
    setPage((old: any) => old - 1);
  };

  const handlePage = ({ target: { value } }: any) => {
    setPage(
      isNaN(value) ||
        Number(value) > Math.floor(data.length / Number(limit)) - 1
        ? 0
        : value
    );
  };
  const handleLimit = ({ target: { value } }: any) => {
    setLimit(
      isNaN(value) || Number(value) > data.length || value === "" ? 0 : value
    );
    setPage(0);
  };

  if (isError) {
    return (
      <IconButton
        as={Dismiss}
        text={`Network error blocked by CORS policy`}
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
          h: "100vh",
          bgColor: gray["50-900"],
          color: "red.400",
          display: "flex",
          flexDirection: "column",
          variant: "none",
          cursor: "default",
          p: 0,
          w: "full",
        }}
      />
    );
  }

  return (
    <Box bgColor={gray["50-900"]} h="100vh" color={gray["900-50"]}>
      <Head>
        <title>{`${titlePage} | Muhammad Fauzul Hanif - SejutaCita Front-End Test`}</title>
      </Head>

      <Grid templateRows="repeat(12, 1fr)" h="full">
        <GridItem
          borderBottomWidth={2}
          px={{
            base: 4,
            sm: 6,
            md: 8,
            lg: 12,
          }}
        >
          <NavBar />
        </GridItem>

        <GridItem
          mx={{
            base: 4,
            sm: 6,
            md: 8,
            lg: 12,
          }}
          my={{
            base: 4,
            sm: 6,
            md: 8,
            lg: 12,
          }}
          rowSpan={12}
          display="grid"
          gridTemplateRows="repeat(12, 1fr)"
          gap={{
            base: 4,
            md: 6,
          }}
        >
          <PageHeader
            pageHeaderTitle={titlePage}
            descriptionPage={descriptionPage}
            handleSearch={handleSearch}
            handleSelect={handleSelect}
          />

          <GridItem
            rowSpan={12}
            overflow="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: ".5rem",
                height: ".5rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colorMode === "light" ? "#e2e8f0" : "#2d3748",
                borderRadius: "1rem",
              },
            }}
          >
            {children}
          </GridItem>

          {isSuccessBooks && (
            <Flex
              w={{
                base: "full",
                lg: "50%",
              }}
              gap={4}
              justifySelf="center"
            >
              <IconButton
                as={ArrowLeft}
                iconProps={{
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  bgColor: gray["100-800"],
                  p: 0,
                  onClick: previousPage,
                  disabled:
                    Number(limit) === 0 || Number(page) === 0 ? true : false,
                }}
              />

              <Flex alignItems="center">
                <IconButton
                  as={Book}
                  iconProps={{
                    w: 4,
                    h: 4,
                  }}
                  buttonProps={{
                    cursor: "default",
                    p: 0,
                    variant: "none",
                  }}
                />

                <Grid templateColumns="repeat(2, 1fr)" alignItems="center">
                  <Input
                    min={0}
                    max={data.length}
                    value={Number(limit)}
                    onChange={handleLimit}
                    variant="flushed"
                  />

                  <Text>
                    / {Number(limit) === 0 ? data.length : data.length}
                  </Text>
                </Grid>
              </Flex>

              <Flex alignItems="center">
                <IconButton
                  as={Page}
                  iconProps={{
                    w: 4,
                    h: 4,
                  }}
                  buttonProps={{
                    cursor: "default",
                    p: 0,
                    variant: "none",
                  }}
                />

                <Grid templateColumns="repeat(2, 1fr)" alignItems="center">
                  <Input
                    min={0}
                    max={Math.floor(data.length / Number(limit))}
                    value={Number(limit) === 0 ? 0 : Number(page)}
                    onChange={handlePage}
                    variant="flushed"
                  />

                  <Flex>
                    /
                    {` ${
                      !isFinite(Math.floor(data.length / Number(limit))) ||
                      Number(limit) === data.length
                        ? 0
                        : Math.floor(data.length / Number(limit))
                    }`}
                  </Flex>
                </Grid>
              </Flex>

              <IconButton
                as={ArrowRight}
                iconProps={{
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  bgColor: gray["100-800"],
                  p: 0,
                  onClick: nextPage,
                  disabled:
                    Number(limit) === 0 ||
                    Number(limit) === data.length ||
                    Number(page) === Math.floor(data.length / Number(limit)),
                }}
              />
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
