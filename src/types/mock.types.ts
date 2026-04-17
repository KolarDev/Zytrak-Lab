export type TemperatureProfile = "ambient" | "refrigerated" | "frozen" | "ultra_cold";
export type SupplierType = "local" | "international";
export type PaymentRail = "paystack" | "stellar";
export type ReorderStatus = "ok" | "low" | "critical" | "zero";
export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "packed"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "confirmed_good"
  | "disputed"
  | "cancelled";

export interface MockSupplier {
  id: string;
  name: string;
  state: string;
  nafdacLicence: string;
  performanceScore: number;
  type: SupplierType;
  isoCertification?: string;
  approvedAt?: string;
  stellarRecordId?: string;
}

export interface MockProduct {
  id: string;
  name: string;
  category: string;
  nafdacNumber: string;
  temperatureProfile: TemperatureProfile;
  unitPriceNgn: number;
  stockQuantity: number;
  supplierId: string;
  supplierName: string;
  description: string;
  storageInstructions: string;
}

export interface MockInventoryLot {
  id: string;
  lotNumber: string;
  batchNumber: string;
  quantity: number;
  receivedAt: string;
  expiryDate: string;
}

export interface MockInventoryItem {
  id: string;
  productId?: string;
  productName: string;
  category: string;
  currentQuantity: number;
  reorderPoint: number;
  unit: string;
  nafdacNumber: string;
  temperatureProfile: TemperatureProfile;
  expiryDate: string;
  reorderStatus: ReorderStatus;
  location: string;
  lots: MockInventoryLot[];
}

export interface MockOrderItem {
  productId?: string;
  productName: string;
  quantity: number;
  unitPriceNgn: number;
  temperatureProfile: TemperatureProfile;
  nafdacNumber: string;
}

export interface MockOrderTimelineEvent {
  label: string;
  timestamp: string;
  completed: boolean;
}

export interface MockOrder {
  id: string;
  labName: string;
  supplierId: string;
  supplierName: string;
  status: OrderStatus;
  paymentRail: PaymentRail;
  totalAmountNgn: number;
  createdAt: string;
  items: MockOrderItem[];
  destination: string;
  coldChainRequired: boolean;
  temperatureAtReceipt?: number;
  txHash?: string;
  updatedAt?: string;
}
