import type { Metadata } from "next";
import { CounterApiPage } from "@/components/pages/counter-server.page";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Counter",
  description: "Update counter value via API",
});

export default CounterApiPage;
