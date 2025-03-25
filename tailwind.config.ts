import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundColor: "#0B101B",
        paragraphClr: "#C9CED6",
        inputBordr: "#353C4A",
        inputBg: "#181E29",
        btnPrimary: "#144EE3",
        theadClr: "#0D1117",
        tableBackGround: "#151A24",
        rowBg: "#1A2333",
        leafGreen: "#1EB036",
        goldenOchre: "#B0901E",
        deepPine: "#132B20",
        vintageBrown: "#2F2C1D",
        blushRose: "#EB568E",
      },
    },
  },
  plugins: [],
} satisfies Config;
