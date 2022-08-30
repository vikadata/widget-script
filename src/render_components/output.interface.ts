export interface Output {
  text: (name: string) => void;
  table: (data: (string | number | Object)[]) => void;
  markdown: (source: string) => void;
  clear: () => void;
}