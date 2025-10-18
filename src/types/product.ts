export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  img: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
