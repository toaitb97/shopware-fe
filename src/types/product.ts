export type Product = {
  title: string;
  description: string;
  reviews: number;
  discount: number;
  price: number;
  discountedPrice: number;
  id: number;
  img: string;
  ages: string[];
  ageGroup: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
