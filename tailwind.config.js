// tailwind.config.js
export default {
  content: ["./src/**/*.{html,ts}"],

  theme: {
    extend: {

      /* ================= BRAND CORE ================= */
      colors: {
        brand: {
          primary: "#3B82F6",
          secondary: "#1E40AF",
          accent: "#F59E0B",
        },

        /* ================= DARK SURFACE SYSTEM ================= */
        surface: {
          0: "#0B1220",
          1: "#111827",
          2: "#1F2937",
          3: "#374151",
        },

        /* ================= NEUTRAL TEXT SCALE ================= */
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        /* ================= CLINICAL SEMANTIC COLORS ================= */
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#38BDF8",

        /* ================= DOMAIN COLORS ================= */
        patient: "#22C55E",
        doctor: "#38BDF8",
        appointment: "#60A5FA",
        medication: "#FACC15",
        critical: "#EF4444",
      },

      /* ================= TYPOGRAPHY ================= */
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      /* ================= SPACING ================= */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      /* ================= RADIUS ================= */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      /* ================= SHADOWS ================= */
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.35)",
        soft: "0 2px 10px rgba(0,0,0,0.25)",
        glow: "0 0 0 1px rgba(59,130,246,0.25)",
      },

      /* ================= ANIMATION TOKENS (NEW) ================= */
      animation: {
        pageFlip: "pageFlip 0.4s ease-out",
      },

      keyframes: {
        pageFlip: {
          "0%": { opacity: "0", transform: "perspective(400px) rotateY(-8deg)" },
          "100%": { opacity: "1", transform: "perspective(400px) rotateY(0)" },
        },
      },

      transitionDuration: {
        250: "250ms",
      },
    },
  },

  plugins: [],
};