import type {
  MockInventoryItem,
  MockOrder,
  MockProduct,
  MockSupplier
} from "@/types/mock.types";

const now = Date.now();

export const DEMO_USER = {
  id: "usr-001",
  name: "Dr. Adeyemi",
  role: "lab_manager" as const,
  facilityName: "Lagos Medical Laboratory",
  location: "Lagos, Nigeria"
};

export const MOCK_SUPPLIERS: MockSupplier[] = [
  {
    id: "sup-001",
    name: "MedTech Solutions Ltd",
    state: "Lagos",
    nafdacLicence: "NAFDAC/DL/23/00847",
    performanceScore: 97,
    type: "local",
    approvedAt: new Date(now - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "sup-002",
    name: "DiagnoPath Nigeria",
    state: "Abuja",
    nafdacLicence: "NAFDAC/DL/22/01203",
    performanceScore: 94,
    type: "local",
    approvedAt: new Date(now - 16 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "sup-003",
    name: "BioReagents International (China)",
    state: "Shanghai, China",
    nafdacLicence: "Import Reg. Pending",
    performanceScore: 99,
    type: "international",
    isoCertification: "ISO 13485:2016"
  }
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prd-001",
    name: "Giemsa Stain 500mL",
    category: "reagents_stains",
    nafdacNumber: "A7-0234",
    temperatureProfile: "ambient",
    unitPriceNgn: 8500,
    stockQuantity: 45,
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    description: "Standard Giemsa stain for blood film examination and malaria diagnosis.",
    storageInstructions: "Store at 15-25C. Keep tightly sealed and protect from light."
  },
  {
    id: "prd-002",
    name: "HIV 1+2 Rapid Test Kit 25 tests",
    category: "diagnostic_kits",
    nafdacNumber: "B3-1892",
    temperatureProfile: "refrigerated",
    unitPriceNgn: 12000,
    stockQuantity: 12,
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    description: "Rapid assay for simultaneous detection of HIV-1 and HIV-2 antibodies.",
    storageInstructions: "Store at 2-8C. Do not freeze. Use quickly after opening."
  },
  {
    id: "prd-003",
    name: "Widal Test Antigen Set",
    category: "diagnostic_kits",
    nafdacNumber: "A7-0891",
    temperatureProfile: "refrigerated",
    unitPriceNgn: 9800,
    stockQuantity: 0,
    supplierId: "sup-002",
    supplierName: "DiagnoPath Nigeria",
    description: "Slide agglutination test for typhoid and paratyphoid fever.",
    storageInstructions: "Store at 2-8C. Bring to room temperature before use."
  },
  {
    id: "prd-004",
    name: "PCR 96-Well Plate Pack of 10",
    category: "molecular_biology",
    nafdacNumber: "N/A - equipment consumable",
    temperatureProfile: "ambient",
    unitPriceNgn: 45000,
    stockQuantity: 8,
    supplierId: "sup-003",
    supplierName: "BioReagents International (China)",
    description: "Low-profile 96-well PCR plates for major thermal cyclers.",
    storageInstructions: "Store at ambient temperature in sealed packaging."
  },
  {
    id: "prd-005",
    name: "Gram Stain Reagent Kit Complete",
    category: "reagents_stains",
    nafdacNumber: "A7-1102",
    temperatureProfile: "ambient",
    unitPriceNgn: 7200,
    stockQuantity: 22,
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    description: "Complete kit with crystal violet, iodine, decolouriser, and safranin.",
    storageInstructions: "Store at 15-25C away from open flames."
  },
  {
    id: "prd-006",
    name: "Malaria RDT Pf/PAN 25 tests",
    category: "diagnostic_kits",
    nafdacNumber: "B3-0774",
    temperatureProfile: "ambient",
    unitPriceNgn: 8900,
    stockQuantity: 55,
    supplierId: "sup-002",
    supplierName: "DiagnoPath Nigeria",
    description: "WHO prequalified rapid test for falciparum and pan-species malaria.",
    storageInstructions: "Store at 2-30C. Avoid moisture and direct sunlight."
  },
  {
    id: "prd-007",
    name: "Blood Agar Base 500g",
    category: "culture_media",
    nafdacNumber: "A5-3301",
    temperatureProfile: "refrigerated",
    unitPriceNgn: 15500,
    stockQuantity: 18,
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    description: "Dehydrated base for preparing blood agar plates.",
    storageInstructions: "Store at 2-8C in a tightly sealed container."
  },
  {
    id: "prd-008",
    name: "HbA1c Reagent Kit 50 tests",
    category: "clinical_chemistry",
    nafdacNumber: "B3-4421",
    temperatureProfile: "refrigerated",
    unitPriceNgn: 28000,
    stockQuantity: 6,
    supplierId: "sup-003",
    supplierName: "BioReagents International (China)",
    description: "Immunoturbidimetric assay for HbA1c measurement.",
    storageInstructions: "Store at 2-8C. Stable until labelled expiry."
  },
  {
    id: "prd-009",
    name: "Ziehl-Neelsen Carbol Fuchsin 500mL",
    category: "reagents_stains",
    nafdacNumber: "A7-0512",
    temperatureProfile: "ambient",
    unitPriceNgn: 6800,
    stockQuantity: 30,
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    description: "Ready-to-use staining solution for tuberculosis detection.",
    storageInstructions: "Store at room temperature away from heat."
  },
  {
    id: "prd-010",
    name: "Haematocrit Capillary Tubes 100pk",
    category: "haematology",
    nafdacNumber: "C1-0892",
    temperatureProfile: "ambient",
    unitPriceNgn: 4500,
    stockQuantity: 120,
    supplierId: "sup-002",
    supplierName: "DiagnoPath Nigeria",
    description: "Plain and heparinised capillary tubes for PCV determination.",
    storageInstructions: "Store at ambient temperature away from direct sunlight."
  }
];

export const MOCK_INVENTORY: MockInventoryItem[] = [
  {
    id: "inv-001",
    productId: "prd-001",
    productName: "Giemsa Stain",
    category: "Reagents & Stains",
    currentQuantity: 3,
    reorderPoint: 10,
    unit: "bottles",
    nafdacNumber: "A7-0234",
    temperatureProfile: "ambient",
    expiryDate: "2026-09-15",
    reorderStatus: "critical",
    location: "Main Lab",
    lots: [
      {
        id: "lot-001",
        lotNumber: "LOT-GS-001",
        batchNumber: "BAT-9301",
        quantity: 2,
        receivedAt: new Date(now - 16 * 24 * 60 * 60 * 1000).toISOString(),
        expiryDate: "2026-09-15"
      }
    ]
  },
  {
    id: "inv-002",
    productId: "prd-002",
    productName: "HIV 1+2 Rapid Test Kits",
    category: "Diagnostic Kits",
    currentQuantity: 0,
    reorderPoint: 5,
    unit: "packs",
    nafdacNumber: "B3-1892",
    temperatureProfile: "refrigerated",
    expiryDate: "2026-11-20",
    reorderStatus: "zero",
    location: "Testing Room",
    lots: []
  },
  {
    id: "inv-003",
    productId: "prd-003",
    productName: "Widal Test Antigen Set",
    category: "Diagnostic Kits",
    currentQuantity: 2,
    reorderPoint: 8,
    unit: "kits",
    nafdacNumber: "A7-0891",
    temperatureProfile: "refrigerated",
    expiryDate: "2026-05-10",
    reorderStatus: "critical",
    location: "Main Lab",
    lots: []
  },
  {
    id: "inv-004",
    productName: "EDTA Blood Collection Tubes 100pk",
    category: "Consumables",
    currentQuantity: 45,
    reorderPoint: 20,
    unit: "packs",
    nafdacNumber: "C1-2341",
    temperatureProfile: "ambient",
    expiryDate: "2027-08-30",
    reorderStatus: "ok",
    location: "Phlebotomy",
    lots: []
  },
  {
    id: "inv-005",
    productId: "prd-005",
    productName: "Gram Stain Reagent Set",
    category: "Reagents & Stains",
    currentQuantity: 6,
    reorderPoint: 10,
    unit: "sets",
    nafdacNumber: "A7-1102",
    temperatureProfile: "ambient",
    expiryDate: "2026-05-15",
    reorderStatus: "low",
    location: "Micro Lab",
    lots: []
  },
  {
    id: "inv-006",
    productId: "prd-006",
    productName: "Malaria RDT Pf/PAN 25 tests",
    category: "Diagnostic Kits",
    currentQuantity: 0,
    reorderPoint: 10,
    unit: "boxes",
    nafdacNumber: "B3-0774",
    temperatureProfile: "ambient",
    expiryDate: "2026-10-01",
    reorderStatus: "zero",
    location: "Testing Room",
    lots: []
  },
  {
    id: "inv-007",
    productId: "prd-007",
    productName: "Blood Agar Base 500g",
    category: "Culture Media",
    currentQuantity: 4,
    reorderPoint: 8,
    unit: "bottles",
    nafdacNumber: "A5-3301",
    temperatureProfile: "refrigerated",
    expiryDate: "2026-06-20",
    reorderStatus: "low",
    location: "Micro Lab",
    lots: []
  },
  {
    id: "inv-008",
    productName: "Nitrile Gloves Medium 100pk",
    category: "PPE & Safety",
    currentQuantity: 18,
    reorderPoint: 5,
    unit: "boxes",
    nafdacNumber: "N/A",
    temperatureProfile: "ambient",
    expiryDate: "2028-03-01",
    reorderStatus: "ok",
    location: "Store",
    lots: []
  },
  {
    id: "inv-009",
    productName: "Microscope Slides 144pk",
    category: "Glassware",
    currentQuantity: 9,
    reorderPoint: 4,
    unit: "boxes",
    nafdacNumber: "N/A",
    temperatureProfile: "ambient",
    expiryDate: "2030-01-01",
    reorderStatus: "ok",
    location: "Main Lab",
    lots: []
  },
  {
    id: "inv-010",
    productName: "Hepatitis B Surface Antigen Kit",
    category: "Diagnostic Kits",
    currentQuantity: 1,
    reorderPoint: 5,
    unit: "kits",
    nafdacNumber: "B3-2210",
    temperatureProfile: "refrigerated",
    expiryDate: "2026-05-01",
    reorderStatus: "critical",
    location: "Testing Room",
    lots: []
  },
  {
    id: "inv-011",
    productName: "Sahli Haemoglobin Set",
    category: "Haematology",
    currentQuantity: 14,
    reorderPoint: 6,
    unit: "sets",
    nafdacNumber: "A7-0456",
    temperatureProfile: "ambient",
    expiryDate: "2027-04-15",
    reorderStatus: "ok",
    location: "Haem Lab",
    lots: []
  },
  {
    id: "inv-012",
    productId: "prd-009",
    productName: "Ziehl-Neelsen Carbol Fuchsin 500mL",
    category: "Reagents & Stains",
    currentQuantity: 5,
    reorderPoint: 8,
    unit: "bottles",
    nafdacNumber: "A7-0512",
    temperatureProfile: "ambient",
    expiryDate: "2026-07-20",
    reorderStatus: "low",
    location: "Micro Lab",
    lots: []
  }
];

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-001",
    labName: "Lagos Medical Laboratory",
    supplierId: "sup-001",
    supplierName: "MedTech Solutions Ltd",
    status: "dispatched",
    paymentRail: "paystack",
    totalAmountNgn: 47500,
    createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now - 10 * 60 * 60 * 1000).toISOString(),
    destination: "12 Adeola Odeku Street, Victoria Island, Lagos",
    coldChainRequired: true,
    items: [
      {
        productId: "prd-001",
        productName: "Giemsa Stain 500mL",
        quantity: 5,
        unitPriceNgn: 8500,
        temperatureProfile: "ambient",
        nafdacNumber: "A7-0234"
      },
      {
        productId: "prd-002",
        productName: "HIV 1+2 Rapid Test Kit",
        quantity: 1,
        unitPriceNgn: 12000,
        temperatureProfile: "refrigerated",
        nafdacNumber: "B3-1892"
      }
    ]
  },
  {
    id: "ord-002",
    labName: "Lagos Medical Laboratory",
    supplierId: "sup-003",
    supplierName: "BioReagents International (China)",
    status: "confirmed_good",
    paymentRail: "stellar",
    totalAmountNgn: 180000,
    createdAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
    destination: "12 Adeola Odeku Street, Victoria Island, Lagos",
    coldChainRequired: false,
    txHash: "82f5ecf1b98b5c4d6d0f69b2bb4d3c21c80ee98f6250a7d4f854ed8432d2abcd",
    items: [
      {
        productId: "prd-004",
        productName: "PCR 96-Well Plate Pack of 10",
        quantity: 4,
        unitPriceNgn: 45000,
        temperatureProfile: "ambient",
        nafdacNumber: "N/A - equipment consumable"
      }
    ]
  },
  {
    id: "ord-003",
    labName: "Lagos Medical Laboratory",
    supplierId: "sup-002",
    supplierName: "DiagnoPath Nigeria",
    status: "paid",
    paymentRail: "paystack",
    totalAmountNgn: 33300,
    createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
    destination: "12 Adeola Odeku Street, Victoria Island, Lagos",
    coldChainRequired: true,
    items: [
      {
        productId: "prd-006",
        productName: "Malaria RDT Pf/PAN 25 tests",
        quantity: 2,
        unitPriceNgn: 8900,
        temperatureProfile: "ambient",
        nafdacNumber: "B3-0774"
      },
      {
        productId: "prd-007",
        productName: "Blood Agar Base 500g",
        quantity: 1,
        unitPriceNgn: 15500,
        temperatureProfile: "refrigerated",
        nafdacNumber: "A5-3301"
      }
    ]
  }
];
