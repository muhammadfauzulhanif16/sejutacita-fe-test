import { useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { IconButton } from "../IconButton";

interface IconProps {
  as: any;
  onClick: () => void;
  label: string;
}

export const Icon: FC<IconProps> = ({ as, onClick, label }) => {
  const gray = {
    "100-800": useColorModeValue("gray.100", "gray.800"),
  };

  return (
    <IconButton
      as={as}
      buttonProps={{
        bgColor: gray["100-800"],
        _hover: {
          transform: "scale(1.1)",
        },
        position: "absolute",
        top: 0,
        right: 0,
        m: 4,
        p: 0,
        onClick: onClick,
      }}
      tooltipProps={{
        children: null,
        label: `${label}`,
      }}
    />
  );
};
