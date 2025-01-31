import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // borderColor: {
    //   default: "#fff",
    //   customGray: "#dfdede",
    // },
    backgroundColor: {
      default: "#fff",
      customBlue: "#003894",
      customOrange: "#ef7000",
      customRed: "#e60009",
    },

    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },

    extend: {
      boxShadow: {
        custom: "0px 2px 6px rgba(0, 0, 0, 0.3)", // Custom shadow
      },
      fontFamily: {
        meiryo: ['"Meiryo UI"', "sans-serif"],
      },
      backgroundPosition: {
        arrive: "28.2328% 0",
        discount: "64.0537% 42.8571%",
        movie: "87.9343% 0px",
        drama: "11.9403% 71.4286%",
        anime: "11.9403% 14.2857%",
      },
      backgroundImage: {
        "custom-sprite":
          "url('https://shopping.bookoff.co.jp/library/common/sprite/sprite-icon-bg.svg')",
      },
      colors: {
        customBlue: "#003894",
        customOrange: "#ef7000",
        customRed: "#e60009",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Existing value
        md: "calc(var(--radius) - 2px)", // Existing value
        sm: "calc(var(--radius) - 4px)", // Existing value
        // Add custom rounded values
        xl: "1rem", // Example for extra-large rounding
        "2xl": "1.5rem", // Example for larger rounding
        "3xl": "2rem", // Example for even larger rounding
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
