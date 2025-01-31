// bookoff/src/@types/jsvectormap.d.ts
declare module "jsvectormap" {
  interface JsVectorMap extends object {
    // Define the properties and methods of the jsVectorMap here
    // Example:
    // set: (options: any) => void;
    set: (options: { [key: string]: unknown }) => void;
  }

  const jsVectorMap: JsVectorMap;
  export default jsVectorMap;
}
