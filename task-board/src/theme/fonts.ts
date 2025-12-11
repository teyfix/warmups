import { Geist, Geist_Mono } from "next/font/google";

export const fontSans = Geist({
  variable: "--app-font-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--app-font-mono",
  subsets: ["latin"],
});
