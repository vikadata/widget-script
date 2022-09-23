declare module '*.css' {
  const content: any;
  export default content;
}

declare module '!raw-loader!*' {
  const contents: string
  export = contents
}