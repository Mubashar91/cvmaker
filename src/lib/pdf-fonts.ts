import type { TFontDictionary } from "pdfmake/interfaces";

export const SERIF_FONT_FILES = [
  "Tinos-Regular.ttf",
  "Tinos-Bold.ttf",
  "Tinos-Italic.ttf",
  "Tinos-BoldItalic.ttf",
] as const;

export const PDF_FONTS: TFontDictionary = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  Tinos: {
    normal: "Tinos-Regular.ttf",
    bold: "Tinos-Bold.ttf",
    italics: "Tinos-Italic.ttf",
    bolditalics: "Tinos-BoldItalic.ttf",
  },
};
