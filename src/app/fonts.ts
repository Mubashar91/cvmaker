import localFont from "next/font/local";

/**
 * Archivo's Latin file, served from a hashed URL and preloaded on every page, so text usually
 * paints in Archivo from the start. It keeps the family name used by `--font` in globals.css,
 * where the Latin-ext and Vietnamese faces and the size-matched fallback are declared.
 */
export const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  variable: "--font-archivo",
  declarations: [
    { prop: "font-family", value: "Archivo Variable" },
    { prop: "font-stretch", value: "62% 125%" },
    { prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" },
  ],
});
