export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-Us" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "JYP", label: "¥ Yen", locale: "ja-JP" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0];
