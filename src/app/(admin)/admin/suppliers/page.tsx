"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { PageHeader } from "@/components/shared/PageHeader";
import { StellarBadge } from "@/components/shared/StellarBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_SUPPLIERS } from "@/lib/mock-data";
import { useOrderStore } from "@/lib/store";
import { writeProvenanceRecord } from "@/lib/stellar";

export default function AdminSuppliersPage() {
  const records = useOrderStore((state) => state.records);
  const approveSupplier = useOrderStore((state) => state.approveSupplier);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Supplier approval queue" subtitle="Approvals are only complete once the provenance record lands on Stellar Testnet." />
      <div className="grid gap-5 xl:grid-cols-2">
        {MOCK_SUPPLIERS.map((supplier) => {
          const record = records.find(
            (entry) =>
              entry.entityId === supplier.id && entry.eventType === "supplier_approved"
          );

          return (
            <div key={supplier.id} className="rounded-[32px] border border-white/70 bg-white/90 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-brand-navy">{supplier.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{supplier.state}</p>
                </div>
                <Badge variant={supplier.type === "international" ? "stellar" : "success"}>
                  {supplier.type}
                </Badge>
              </div>
              <p className="mt-4 font-mono text-sm text-slate-500">{supplier.nafdacLicence}</p>
              {supplier.isoCertification ? (
                <p className="mt-3 text-sm text-slate-600">{supplier.isoCertification}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {record ? <StellarBadge href={record.explorerUrl} /> : null}
                <Button
                  loading={loadingId === supplier.id}
                  disabled={Boolean(record)}
                  onClick={async () => {
                    try {
                      setLoadingId(supplier.id);
                      const newRecord = await writeProvenanceRecord("supplier_approved", supplier.id, {
                        supplier_name: supplier.name,
                        nafdac_licence: supplier.nafdacLicence,
                        approved_by: "Zytrak Admin"
                      });
                      approveSupplier(supplier.id, newRecord);
                      toast.success("Supplier approval written to Stellar");
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Approval failed");
                    } finally {
                      setLoadingId(null);
                    }
                  }}
                >
                  {record ? "Approved on Stellar" : "Approve supplier"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
