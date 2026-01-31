/* eslint-disable react-refresh/only-export-components */
import { type PropsWithChildren, createContext } from "react";

export type ContextMenuContextType = {
  handleClose: () => void;
};

export const ContextMenuContext = createContext<ContextMenuContextType>({
  handleClose: () => {},
});

export default function ContextMenuProvider({
  handleClose,
  children,
}: PropsWithChildren<ContextMenuContextType>) {
  return (
    <ContextMenuContext.Provider value={{ handleClose }}>
      {children}
    </ContextMenuContext.Provider>
  );
}
