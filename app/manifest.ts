import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eleven Star Gold — Engineering Services",
    short_name: "Eleven Star Gold",
    description: "Engineering Services — We Build For You.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFAF7",
    theme_color: "#545454",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
