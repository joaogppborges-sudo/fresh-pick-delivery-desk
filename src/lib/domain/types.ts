/**
 * Formatos provisórios das entidades exibidas nas listas.
 * Serão substituídos pelos tipos gerados do banco na v1.1.0.
 */
import type {
  DeliveryStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ProductCategory,
} from "@/lib/domain/status";

export type OrderRow = {
  id: string;
  code: string;
  customerName: string;
  itemsCount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
};

export type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
  ordersCount: number;
};

export type ProductRow = {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  price: number;
  stock: number;
  active: boolean;
};

export type DeliveryRow = {
  id: string;
  sequence: number;
  customerName: string;
  address: string;
  paymentMethod: PaymentMethod;
  status: DeliveryStatus;
};

export type CashEntryRow = {
  id: string;
  description: string;
  method: PaymentMethod;
  amount: number;
};

export type UserRow = {
  id: string;
  name: string;
  phone: string;
  role: string;
};
