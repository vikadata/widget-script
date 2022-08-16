export interface Output {
  text: (name: string) => void;
  markdown: (source: string) => void;
  clear: () => void;
}