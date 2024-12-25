declare module 'react-contexify' {
  import * as React from 'react';

  export interface MenuProps {
    id: string;
    children: React.ReactNode;
  }

  export interface ItemProps {
    onClick: (params: { event: React.MouseEvent; props: any }) => void;
    children: React.ReactNode;
  }

  export interface ContextMenuProps {
    id: string;
  }

  export interface ShowContextMenuParams<T = unknown> {
    event: React.MouseEvent;
    props?: T;
  }

  export function Menu(props: MenuProps): JSX.Element;
  export function Item(props: ItemProps): JSX.Element;
  export const contextMenu: {
    show: (params: ShowContextMenuParams) => void;
  };
  export function useContextMenu(props: ContextMenuProps): {
    show: (params: ShowContextMenuParams) => void;
  };
}
