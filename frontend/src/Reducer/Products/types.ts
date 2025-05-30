export type dimensionType = {
  width: number;
  height: number;
  depth: number;
};

export type reviewsType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type productsType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimension: dimensionType;
  warrentyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: reviewsType[];
  returnPolicy: string;
  minimumOrderQuantiy: number;
  images: string[];
  thumbnail: string;
};

export interface productsInterface {
  products: productsType[];
  selectedProduct: productsType | null;
}

export type cartType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimension: dimensionType;
  warrentyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: reviewsType[];
  returnPolicy: string;
  minimumOrderQuantiy: number;
  images: string[];
  thumbnail: string;
  quantity: number;
};
