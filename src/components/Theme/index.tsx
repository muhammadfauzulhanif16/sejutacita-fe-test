import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import {
  WeatherMoon,
  WeatherSunny,
} from "@emotion-icons/fluentui-system-regular";
import { IconButton, IconButtonProps } from "../IconButton";
import { FC } from "react";

// type ThemeProps = Omit<IconButtonProps, "aria-label">;

export const Theme: FC<{}> = () => {
  const { toggleColorMode } = useColorMode(),
    SwitchIcon = useColorModeValue(WeatherMoon, WeatherSunny);

  const gray = {
    "100-800": useColorModeValue("gray.100", "gray.800"),
  };

  return (
    <IconButton
      as={SwitchIcon}
      iconProps={{
        w: 6,
        h: 6,
      }}
      buttonProps={{
        variant: "none",
        _hover: {
          bgColor: gray["100-800"],
        },
        p: 0,
        onClick: toggleColorMode,
      }}
    />
  );
};
