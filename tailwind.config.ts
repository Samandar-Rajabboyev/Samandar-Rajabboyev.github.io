import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Extended color palette for calm themes
        sage: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Custom color palette
        // XCode's theme
        // custom: {
        //   50:  "#F0F5F9", // Keep your lightest for light mode
        //   100: "#E8F0F6", // Light variant for backgrounds
        //   200: "#D1E1ED", // Light gray/blue
        //   300: "#C9D6DF", // Muted blue-gray
        
        //   // Adjusted darks to match Xcode Dark vibes:
        //   400: "#8E9BAA", // Subtle text/secondary
        //   500: "#5F6C7A", // Borders / subtle UI
        //   600: "#3C4753", // Panel backgrounds
        //   700: "#2E3741", // Main background (like Xcode editor)
        //   800: "#1F262E", // Secondary dark background
        //   900: "#14191F", // Deep background for contrast
        //   950: "#0B0E12", // Almost black, reserved for overlays
        // }
        
        // Android Studio's theme
        custom: {
          50:  "#F5F5F5", // Very light gray
          100: "#ECECEC", // Light gray background
          200: "#DADADA", // Light gray for borders
          300: "#BFBFBF", // Muted gray
        
          // Android Studio / Darcula dark tones:
          400: "#9A9A9A", // Disabled text
          500: "#6C6C6C", // Subtle borders / line numbers
          600: "#3C3F41", // Main editor background
          700: "#2B2B2B", // Panels / tool windows
          800: "#1E1E1E", // Deep background
          900: "#141414", // Almost black shadows
          950: "#0A0A0A", // Overlays or modals
        }

        // Fleet's theme
        // custom: {
        //   50:  "#F4F7FA", // Very light gray for backgrounds
        //   100: "#E8ECF2", // Light gray (border/background)
        //   200: "#D4DAE4", // Muted light gray
        //   300: "#A9B4C2", // Muted cool gray for secondary text
        //   400: "#8892A0", // Cooler gray, matches Fleet sidebars
        //   500: "#5F6B7A", // Medium gray for inactive text
        //   600: "#3C4652", // Editor background
        //   700: "#2C333C", // Sidebar & panel background
        //   800: "#1F242B", // Deep background
        //   900: "#15191F", // Near-black, almost navy
        //   950: "#0C0E12", // Pure dark overlay
        // }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
