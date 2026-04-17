"use client";

import * as StellarSdk from "@stellar/stellar-sdk";

import { sha256Hex } from "@/lib/utils";
import type { StellarRecord } from "@/types/stellar.types";

const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet";
const secret = process.env.NEXT_PUBLIC_STELLAR_DEMO_SECRET;
const explorerBase =
  process.env.NEXT_PUBLIC_STELLAR_EXPLORER ?? "https://stellar.expert/explorer/testnet/tx";
const horizonUrl =
  network === "public"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const server = new StellarSdk.Horizon.Server(horizonUrl);
const passphrase =
  network === "public" ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET;

export function buildExplorerUrl(txHash: string) {
  return `${explorerBase}/${txHash}`;
}

export async function writeProvenanceRecord(
  eventType: string,
  entityId: string,
  payload: Record<string, unknown>
): Promise<StellarRecord> {
  if (!secret) {
    throw new Error("NEXT_PUBLIC_STELLAR_DEMO_SECRET is missing.");
  }

  const keypair = StellarSdk.Keypair.fromSecret(secret);
  const account = await server.loadAccount(keypair.publicKey());
  const createdAt = new Date().toISOString();
  const body = JSON.stringify({ eventType, entityId, payload, createdAt });
  const dataHash = await sha256Hex(body);

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: passphrase
  })
    .addOperation(
      StellarSdk.Operation.manageData({
        name: `${eventType.slice(0, 16)}:${entityId.slice(0, 10)}`,
        value: dataHash.slice(0, 64)
      })
    )
    .addMemo(StellarSdk.Memo.text(`${eventType}:${entityId}`.slice(0, 28)))
    .setTimeout(30)
    .build();

  transaction.sign(keypair);
  const response = await server.submitTransaction(transaction);

  return {
    id: `${eventType}-${entityId}-${Date.now()}`,
    txHash: response.hash,
    explorerUrl: buildExplorerUrl(response.hash),
    eventType,
    entityId,
    dataHash,
    createdAt,
    memo: `${eventType}:${entityId}`
  };
}
