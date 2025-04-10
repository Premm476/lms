declare module 'clsx' {
  function clsx(...inputs: Array<string | number | boolean | null | undefined | Record<string, unknown>>): string;
  export = clsx;
}
