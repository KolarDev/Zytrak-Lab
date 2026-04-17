"use client";

import { Button } from "@/components/ui/Button";

export function Pagination({
  page,
  totalPages,
  onPageChange
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      <Button variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
          <button
            key={item}
            className={`h-10 w-10 rounded-full text-sm font-medium ${
              item === page ? "bg-brand-navy text-white" : "bg-white text-slate-600"
            }`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
