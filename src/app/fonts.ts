import localFont from "next/font/local";

export const neueMontreal = localFont({
  src: [
    {
      path: "../fonts/NeueMontreal-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeueMontreal-Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const ppEditorialItalic = localFont({
  src: "../fonts/PPEditorialNew-Italic.woff",
  weight: "400",
  style: "italic",
  variable: "--font-pp-editorial",
  display: "swap",
});
