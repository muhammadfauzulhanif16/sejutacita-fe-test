import { Book, Bookmark } from "@emotion-icons/fluentui-system-regular";

export type NavListState = {
  as: any;
  text: string;
};

export const NavList: Array<NavListState> = [
  {
    as: Book,
    text: "Library",
  },
  {
    as: Bookmark,
    text: "Bookmark",
  },
];
