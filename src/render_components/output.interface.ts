export interface Output {
  text: (label: string) => void;
  table: (data: (string | number | Object)[]) => void;
  markdown: (source: string) => void;
  clear: () => void;
}