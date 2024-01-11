import { ReactNode } from "react";
import MyNavbar from "../navbar";
import FooterComponent from "../footer";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <MyNavbar />
      {children}
      <FooterComponent />
    </>
  );
}
