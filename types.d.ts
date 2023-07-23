interface CartTypes {
  product: {
    id: number;
    title: string;
    description: string;
    coverImage: StaticImageData;
  };
  price: number;
  quantity: number;
}

interface ProductTypes {
  id: number;
  title: string;
  description: string;
  coverImage: StaticImageData;
  rate: number;
  price: number;
  coverImage: StaticImageData;
  category: string;
  cookingTime: string;
  discount?: number;
  images: StaticImageData[];
  spiceLevel: string;
  size: string;
  numOfReview: number;
  restaurant: string;
  Availability: string;
}

interface ReviewTypes {
  id: number;
  content: string;
  date: string;
  user: {
    profileImg: StaticImageData;
    id: number;
    name: string;
  };
  rate: number;
}
