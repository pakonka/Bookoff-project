import { ProductProps } from "./models";

export const sortProducts = (products: ProductProps[], sortOption: string) => {
  switch (sortOption) {
    case "priceAsc":
      return [...products].sort((a, b) => a.price - b.price);
    case "priceDesc":
      return [...products].sort((a, b) => b.price - a.price);
    case "dateNew":
      return [...products].sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    case "dateOld":
      return [...products].sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );
    default:
      return products;
  }
};
