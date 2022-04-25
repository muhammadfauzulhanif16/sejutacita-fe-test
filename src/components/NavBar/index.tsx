import { Box, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { IconButton } from "../IconButton";
import { useRouter } from "next/router";
import { Theme } from "../Theme";
import { NavList, NavListState } from "./NavList";

export const NavBar: FC<{}> = () => {
  const router = useRouter();

  const gray = {
    "100-800": useColorModeValue("gray.100", "gray.800"),
    "200-600": useColorModeValue("gray.200", "gray.600"),
  };

  return (
    <Flex
      justifyContent="space-between"
      my={{
        base: 4,
        sm: 2,
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {NavList.map(({ as, text }: NavListState, id: number) => (
          <IconButton
            key={id}
            as={as}
            iconProps={{
              w: 6,
              h: 6,
            }}
            text={text}
            textProps={{
              ml: 2,
            }}
            buttonProps={{
              _hover: {
                bgColor: gray["200-600"],
              },
              bgColor: gray["100-800"],
              onClick: () =>
                router.push(`/${text === "Library" ? "" : text.toLowerCase()}`),
              w: "full",
            }}
          />
        ))}
      </Grid>

      <Theme />
    </Flex>
  );
};
