import type { MockOrder, OrderStatus, TemperatureProfile } from "@/types/mock.types";
import type { StellarRecord } from "@/types/stellar.types";

export interface AuthUser {
  id: string;
  name: string;
  role: "lab_manager" | "supplier_admin" | "platform_admin";
  facilityName: string;
  location: string;
}

export interface CartItem {
  productId: string;
  supplierId: string;
  supplierName: string;
  name: string;
  nafdacNumber: string;
  temperatureProfile: TemperatureProfile;
  unitPriceNgn: number;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface AuthStore {
  user: AuthUser;
}

export interface OrderStore {
  orders: MockOrder[];
  records: StellarRecord[];
  approveSupplier: (supplierId: string, record: StellarRecord) => void;
  addOrder: (order: MockOrder) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  attachRecord: (orderId: string, record: StellarRecord, extra?: Partial<MockOrder>) => void;
}
