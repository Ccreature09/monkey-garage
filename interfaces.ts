import { Timestamp, FieldValue } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  queryName: string;
  images: string[];
  tags: string[];
  mainImage: string;
  description: string;
  price: string;
}
export interface Review {
  username: string;
  userUID: string;
  text: string;
  photoURL: string;
  stars: number;
  productImageURL: string;
  timestamp: FieldValue | Timestamp;
}
export interface Item {
  name: string;
  quantity: number;
  price: number;
  size?: string;
}

export interface Order {
  id: string;
  orderId: string;
  uid: string;
  email: string;
  name: string;
  surname: string;
  items: Item[];
  totalPrice: number;
  phoneNumber: number;
  address: string;
  orderStatus: string;
}

export interface ProductInfo {
  name: string;
  mainImage: string;
  price: number;
  quantity: number;
  size?: string;
}
