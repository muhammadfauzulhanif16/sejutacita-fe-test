import {
  Box,
  Button,
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
import { Dismiss } from "@emotion-icons/fluentui-system-regular";
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
}: LayoutProps): JSX.Element => {
  const { colorMode } = useColorMode();

  const { isError } = useReadAllCategoriesQuery(),
    { data = [] } = useReadAllBooksByCategoryQuery({ categoryId });

  const gray = {
    "50-900": useColorModeValue("gray.50", "gray.900"),
    "900-50": useColorModeValue("gray.900", "gray.50"),
  };

  const nextPage = () => {
    setPage((old: any) => Number(old) + 1);
  };
  const previousPage = () => {
    setPage((old: any) => Number(old) - 1);
  };

  const handlePage = ({ target: { value } }: any) => {
    setPage(value > Math.floor(data.length / 10) ? "0" : value);
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
            <Flex justifyContent="center">
              <Grid
                w={{
                  base: "full",
                  lg: "50%",
                }}
                alignItems="center"
                templateColumns="repeat(3, 1fr)"
                gap={4}
              >
                <Button
                  p={0}
                  variant="outline"
                  onClick={previousPage}
                  disabled={Number(page) === 0 ? true : false}
                >
                  Previous
                </Button>

                <Flex
                  alignItems="center"
                  gap={{
                    base: 2,
                    lg: 4,
                  }}
                >
                  <Input
                    min={0}
                    max={Math.floor(data.length / 10)}
                    value={Number(page)}
                    onChange={handlePage}
                    type="number"
                    w="50%"
                  />
                  <Flex justifyContent="center" w="50%">
                    of {Math.floor(data.length / 10)}
                  </Flex>
                </Flex>

                <Button
                  p={0}
                  variant="outline"
                  onClick={nextPage}
                  disabled={Number(page) === Math.floor(data.length / 10)}
                >
                  Next
                </Button>
              </Grid>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
