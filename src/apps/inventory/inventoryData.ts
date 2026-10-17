export interface InventoryProduct {
  id: string;
  sku: string;
  name: string;
  category: 'Machined Parts' | 'Raw Materials' | 'Electronic Hardware' | 'Hydraulics' | 'Fasteners';
  supplier: string;
  quantity: number;
  reorderThreshold: number;
  unitCost: number;
  sellingPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  description?: string;
}

export interface StockMovementRecord {
  id: string;
  sku: string;
  productName: string;
  type: 'Inward Restock' | 'Production Outward' | 'Scrap / Write-off' | 'Audit Reconciliation';
  quantityChange: number; // positive or negative
  reason: string;
  reference: string;
  timestamp: string;
  operator: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  leadTimeDays: number;
}

export interface PurchaseOrderItem {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'Draft' | 'Ordered' | 'Received' | 'Cancelled';
  items: PurchaseOrderItem[];
  totalAmount: number;
}

export const INITIAL_PRODUCTS: InventoryProduct[] = [
  {
    id: 'PROD-101',
    sku: 'SKU-TITAN-401',
    name: 'Precision Titanium Impeller (Ti-6Al-4V)',
    category: 'Machined Parts',
    supplier: 'Coimbatore Precision Alloys',
    quantity: 42,
    reorderThreshold: 15,
    unitCost: 12500,
    sellingPrice: 19800,
    status: 'In Stock',
    lastUpdated: '2026-10-14',
    description: 'CNC 5-axis aerospace grade turbine rotor assembly',
  },
  {
    id: 'PROD-102',
    sku: 'SKU-HYD-802',
    name: 'Hydraulic Manifold Block 7075-T6',
    category: 'Hydraulics',
    supplier: 'Bangalore Fluid Systems',
    quantity: 8,
    reorderThreshold: 12,
    unitCost: 8400,
    sellingPrice: 14200,
    status: 'Low Stock',
    lastUpdated: '2026-10-12',
    description: 'High-pressure aerospace aluminum manifold block',
  },
  {
    id: 'PROD-103',
    sku: 'SKU-OPT-109',
    name: 'Optical Fiber SFP+ Transceiver 10Gbps',
    category: 'Electronic Hardware',
    supplier: 'Deccan Microelectronics Ltd',
    quantity: 110,
    reorderThreshold: 25,
    unitCost: 2800,
    sellingPrice: 4900,
    status: 'In Stock',
    lastUpdated: '2026-10-10',
    description: 'Industrial temperature rated optical network module',
  },
  {
    id: 'PROD-104',
    sku: 'SKU-DUP-550',
    name: 'Duplex Stainless Steel Valve Flange 2205',
    category: 'Raw Materials',
    supplier: 'Chennai Steel Extrusions',
    quantity: 0,
    reorderThreshold: 10,
    unitCost: 6500,
    sellingPrice: 11000,
    status: 'Out of Stock',
    lastUpdated: '2026-10-08',
    description: 'Corrosion resistant marine grade pipeline flange',
  },
  {
    id: 'PROD-105',
    sku: 'SKU-FST-991',
    name: 'Grade 12.9 High-Tensile Socket Cap Screws (M12x50)',
    category: 'Fasteners',
    supplier: 'Coimbatore Precision Alloys',
    quantity: 850,
    reorderThreshold: 200,
    unitCost: 45,
    sellingPrice: 85,
    status: 'In Stock',
    lastUpdated: '2026-10-06',
    description: 'Heat treated alloy steel metric mechanical fasteners',
  },
  {
    id: 'PROD-106',
    sku: 'SKU-BRG-204',
    name: 'Ceramic Hybrid Angular Contact Ball Bearing',
    category: 'Machined Parts',
    supplier: 'Bangalore Fluid Systems',
    quantity: 6,
    reorderThreshold: 10,
    unitCost: 4200,
    sellingPrice: 7500,
    status: 'Low Stock',
    lastUpdated: '2026-10-04',
    description: 'High speed CNC spindle spindle bearing',
  },
];

export const INITIAL_MOVEMENTS: StockMovementRecord[] = [
  {
    id: 'MOV-9041',
    sku: 'SKU-TITAN-401',
    productName: 'Precision Titanium Impeller (Ti-6Al-4V)',
    type: 'Inward Restock',
    quantityChange: 20,
    reason: 'Purchase Order Receipt',
    reference: 'PO-2026-088',
    timestamp: '2026-10-14 09:30 IST',
    operator: 'R. Anand (Store Supervisor)',
  },
  {
    id: 'MOV-9042',
    sku: 'SKU-HYD-802',
    productName: 'Hydraulic Manifold Block 7075-T6',
    type: 'Production Outward',
    quantityChange: -4,
    reason: 'Issued to CNC Milling Line 2',
    reference: 'WO-8422',
    timestamp: '2026-10-12 14:15 IST',
    operator: 'M. Selvam (Shop Floor)',
  },
  {
    id: 'MOV-9043',
    sku: 'SKU-DUP-550',
    productName: 'Duplex Stainless Steel Valve Flange 2205',
    type: 'Production Outward',
    quantityChange: -12,
    reason: 'Assembly routing for dispatch',
    reference: 'WO-8423',
    timestamp: '2026-10-08 11:20 IST',
    operator: 'K. Rajan (Inventory Lead)',
  },
  {
    id: 'MOV-9044',
    sku: 'SKU-OPT-109',
    productName: 'Optical Fiber SFP+ Transceiver 10Gbps',
    type: 'Inward Restock',
    quantityChange: 50,
    reason: 'Stock Inwarding from Deccan Microelectronics',
    reference: 'PO-2026-085',
    timestamp: '2026-10-05 16:40 IST',
    operator: 'R. Anand (Store Supervisor)',
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-01',
    name: 'Coimbatore Precision Alloys',
    category: 'Titanium & Aerospace Fasteners',
    contactPerson: 'C. Murugesan',
    phone: '+91 94431 10294',
    email: 'orders@cbe-alloys.in',
    city: 'Coimbatore',
    leadTimeDays: 7,
  },
  {
    id: 'SUP-02',
    name: 'Bangalore Fluid Systems',
    category: 'Hydraulics & Spindle Bearings',
    contactPerson: 'S. Nanjappa',
    phone: '+91 98450 49102',
    email: 'supply@blrfluids.com',
    city: 'Bangalore',
    leadTimeDays: 5,
  },
  {
    id: 'SUP-03',
    name: 'Deccan Microelectronics Ltd',
    category: 'Optical Hardware & Transceivers',
    contactPerson: 'T. Krishnan',
    phone: '+91 97910 88201',
    email: 'logistics@deccan-micro.in',
    city: 'Chennai',
    leadTimeDays: 3,
  },
  {
    id: 'SUP-04',
    name: 'Chennai Steel Extrusions',
    category: 'Duplex Stainless & Heavy Bar Stock',
    contactPerson: 'V. Prakash',
    phone: '+91 98402 33918',
    email: 'prakash@chennaisteel.co.in',
    city: 'Chennai',
    leadTimeDays: 10,
  },
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO-2026-101',
    supplierName: 'Chennai Steel Extrusions',
    orderDate: '2026-10-10',
    expectedDelivery: '2026-10-20',
    status: 'Ordered',
    items: [
      {
        productId: 'PROD-104',
        sku: 'SKU-DUP-550',
        name: 'Duplex Stainless Steel Valve Flange 2205',
        quantity: 25,
        unitCost: 6500,
      },
    ],
    totalAmount: 162500,
  },
  {
    id: 'PO-2026-102',
    supplierName: 'Bangalore Fluid Systems',
    orderDate: '2026-10-12',
    expectedDelivery: '2026-10-18',
    status: 'Ordered',
    items: [
      {
        productId: 'PROD-102',
        sku: 'SKU-HYD-802',
        name: 'Hydraulic Manifold Block 7075-T6',
        quantity: 15,
        unitCost: 8400,
      },
      {
        productId: 'PROD-106',
        sku: 'SKU-BRG-204',
        name: 'Ceramic Hybrid Angular Contact Ball Bearing',
        quantity: 20,
        unitCost: 4200,
      },
    ],
    totalAmount: 210000,
  },
  {
    id: 'PO-2026-088',
    supplierName: 'Coimbatore Precision Alloys',
    orderDate: '2026-10-01',
    expectedDelivery: '2026-10-08',
    status: 'Received',
    items: [
      {
        productId: 'PROD-101',
        sku: 'SKU-TITAN-401',
        name: 'Precision Titanium Impeller (Ti-6Al-4V)',
        quantity: 20,
        unitCost: 12500,
      },
    ],
    totalAmount: 250000,
  },
];

const INVENTORY_STORAGE_KEY_PREFIX = 'als_inventory_control_';

export const loadInventoryData = () => {
  try {
    const p = localStorage.getItem(`${INVENTORY_STORAGE_KEY_PREFIX}products`);
    const m = localStorage.getItem(`${INVENTORY_STORAGE_KEY_PREFIX}movements`);
    const s = localStorage.getItem(`${INVENTORY_STORAGE_KEY_PREFIX}suppliers`);
    const po = localStorage.getItem(`${INVENTORY_STORAGE_KEY_PREFIX}orders`);
    return {
      products: p ? (JSON.parse(p) as InventoryProduct[]) : INITIAL_PRODUCTS,
      movements: m ? (JSON.parse(m) as StockMovementRecord[]) : INITIAL_MOVEMENTS,
      suppliers: s ? (JSON.parse(s) as Supplier[]) : INITIAL_SUPPLIERS,
      purchaseOrders: po ? (JSON.parse(po) as PurchaseOrder[]) : INITIAL_PURCHASE_ORDERS,
    };
  } catch {
    return {
      products: INITIAL_PRODUCTS,
      movements: INITIAL_MOVEMENTS,
      suppliers: INITIAL_SUPPLIERS,
      purchaseOrders: INITIAL_PURCHASE_ORDERS,
    };
  }
};

export const saveInventoryData = (data: {
  products: InventoryProduct[];
  movements: StockMovementRecord[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
}) => {
  try {
    localStorage.setItem(`${INVENTORY_STORAGE_KEY_PREFIX}products`, JSON.stringify(data.products));
    localStorage.setItem(`${INVENTORY_STORAGE_KEY_PREFIX}movements`, JSON.stringify(data.movements));
    localStorage.setItem(`${INVENTORY_STORAGE_KEY_PREFIX}suppliers`, JSON.stringify(data.suppliers));
    localStorage.setItem(`${INVENTORY_STORAGE_KEY_PREFIX}orders`, JSON.stringify(data.purchaseOrders));
  } catch (err) {
    console.error('Failed to save inventory data', err);
  }
};

export const resetInventoryData = () => {
  try {
    localStorage.removeItem(`${INVENTORY_STORAGE_KEY_PREFIX}products`);
    localStorage.removeItem(`${INVENTORY_STORAGE_KEY_PREFIX}movements`);
    localStorage.removeItem(`${INVENTORY_STORAGE_KEY_PREFIX}suppliers`);
    localStorage.removeItem(`${INVENTORY_STORAGE_KEY_PREFIX}orders`);
  } catch {}
};
