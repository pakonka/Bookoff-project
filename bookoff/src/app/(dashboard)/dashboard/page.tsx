import ECommerce from "../../../components/dashboard/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

function Home() {
  return (
    <>
    <ECommerce />
       
    </>
  );
}

export default Home;
