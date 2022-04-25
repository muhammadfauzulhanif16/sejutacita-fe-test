import { FC } from "react";
import {
  Icon,
  IconProps,
  Tooltip,
  TooltipProps,
  Button,
  ButtonProps,
  Text,
  TextProps,
  Spinner,
} from "@chakra-ui/react";

export interface IconButtonProps {
  tooltipProps?: TooltipProps;
  buttonProps?: ButtonProps;
  textProps?: TextProps;
  iconProps?: IconProps;
  text?: string;
  as: any;
}

export const IconButton: FC<IconButtonProps> = ({
  text,
  tooltipProps,
  buttonProps,
  textProps,
  iconProps,
  as,
}: IconButtonProps): JSX.Element => {
  return (
    <Tooltip hasArrow {...tooltipProps} rounded={8}>
      <Button
        {...buttonProps}
        _focus={{
          shadow: "none",
        }}
        _active={{
          bgColor: "none",
        }}
        rounded={12}
      >
        <Icon {...iconProps} as={as} />

        <Text {...textProps}>{text}</Text>
      </Button>
    </Tooltip>
  );
};
