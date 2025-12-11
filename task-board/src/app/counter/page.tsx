import type { Metadata } from "next";
import { CounterPage } from "@/components/pages/counter.page";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Counter",
  description: "Update counter value",
});

export default CounterPage;
