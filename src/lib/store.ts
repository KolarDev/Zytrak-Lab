"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEMO_USER, MOCK_ORDERS } from "@/lib/mock-data";
import type { MockOrder } from "@/types/mock.types";
import type { AuthStore, CartStore, OrderStore } from "@/types/store.types";

export const useAuthStore = create<AuthStore>(() => ({
  user: DEMO_USER
}));

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.productId === item.productId
                  ? { ...entry, quantity: entry.quantity + item.quantity }
                  : entry
              )
            };
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((entry) => entry.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((entry) => (entry.productId === productId ? { ...entry, quantity } : entry))
            .filter((entry) => entry.quantity > 0)
        })),
      clearCart: () => set({ items: [] })
    }),
    { name: "zytrak-cart" }
  )
);

const seededRecords = MOCK_ORDERS.filter((order) => order.txHash).map((order) => ({
  id: `seed-${order.id}`,
  txHash: order.txHash!,
  explorerUrl: `https://stellar.expert/explorer/testnet/tx/${order.txHash!}`,
  eventType: order.status === "confirmed_good" ? "goods_receipt" : "purchase_order_confirmed",
  entityId: order.id,
  dataHash: order.txHash!.slice(0, 64),
  createdAt: order.updatedAt ?? order.createdAt
}));

export const useOrderStore = create<OrderStore>((set) => ({
  orders: MOCK_ORDERS,
  records: seededRecords,
  approveSupplier: (_supplierId, record) =>
    set((state) => ({
      records: [record, ...state.records]
    })),
  addOrder: (order: MockOrder) =>
    set((state) => ({
      orders: [order, ...state.orders]
    })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order
      )
    })),
  attachRecord: (orderId, record, extra) =>
    set((state) => ({
      records: [record, ...state.records],
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              txHash: record.txHash,
              updatedAt: record.createdAt,
              ...extra
            }
          : order
      )
    }))
}));
