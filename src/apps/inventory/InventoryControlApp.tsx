import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Package,
  History,
  Truck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  RotateCcw,
  X,
  FileCheck,
  Building2,
  Sliders,
} from 'lucide-react';
import { AppShell, NavItem } from '../common/AppShell';
import {
  InventoryProduct,
  StockMovementRecord,
  Supplier,
  PurchaseOrder,
  loadInventoryData,
  saveInventoryData,
  resetInventoryData,
  INITIAL_PRODUCTS,
  INITIAL_MOVEMENTS,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASE_ORDERS,
} from './inventoryData';

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Warehouse Overview', icon: Boxes },
  { id: 'products', label: 'Product Catalog', icon: Package },
  { id: 'movements', label: 'Stock Movement Ledger', icon: History },
  { id: 'orders', label: 'Purchase Orders', icon: FileCheck },
  { id: 'suppliers', label: 'Supplier Network', icon: Truck },
];

export const InventoryControlApp: React.FC = () => {
  const [data, setData] = useState(() => loadInventoryData());
  const [activeTab, setActiveTab] = useState('overview');

  // Search and filter states
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [movementSearch, setMovementSearch] = useState('');

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isCreatePoOpen, setIsCreatePoOpen] = useState(false);

  // Selected item for modals
  const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);

  // Form states
  const [productForm, setProductForm] = useState({
    sku: '',
    name: '',
    category: 'Machined Parts' as InventoryProduct['category'],
    supplier: data.suppliers[0]?.name || 'Coimbatore Precision Alloys',
    quantity: '10',
    reorderThreshold: '10',
    unitCost: '5000',
    sellingPrice: '8500',
    description: '',
  });

  const [adjustmentForm, setAdjustmentForm] = useState({
    type: 'Inward Restock' as 'Inward Restock' | 'Production Outward' | 'Scrap / Write-off' | 'Audit Reconciliation',
    quantityChange: '5',
    reason: 'Routine Stock Replenishment',
    reference: 'ADJ-2026-01',
  });

  const [poForm, setPoForm] = useState({
    supplierName: data.suppliers[0]?.name || '',
    expectedDelivery: '2026-10-25',
    productId: data.products[0]?.id || '',
    quantity: '20',
  });

  const [supplierForm, setSupplierForm] = useState({
    name: '',
    category: 'Machined Castings',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Chennai',
    leadTimeDays: '7',
  });

  const [skuError, setSkuError] = useState<string | null>(null);
  const [adjustError, setAdjustError] = useState<string | null>(null);

  useEffect(() => {
    saveInventoryData(data);
  }, [data]);

  // Derived metrics
  const totalProducts = data.products.length;
  const totalUnits = data.products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValuation = data.products.reduce((acc, p) => acc + p.quantity * p.unitCost, 0);
  const lowStockCount = data.products.filter((p) => p.status === 'Low Stock').length;
  const outOfStockCount = data.products.filter((p) => p.status === 'Out of Stock').length;

  const handleReset = () => {
    resetInventoryData();
    setData({
      products: INITIAL_PRODUCTS,
      movements: INITIAL_MOVEMENTS,
      suppliers: INITIAL_SUPPLIERS,
      purchaseOrders: INITIAL_PURCHASE_ORDERS,
    });
  };

  // Helper to re-derive status
  const deriveStatus = (qty: number, threshold: number): InventoryProduct['status'] => {
    if (qty <= 0) return 'Out of Stock';
    if (qty <= threshold) return 'Low Stock';
    return 'In Stock';
  };

  // Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setSkuError(null);

    const cleanSku = productForm.sku.trim().toUpperCase();
    if (data.products.some((p) => p.sku.toUpperCase() === cleanSku)) {
      setSkuError(`SKU "${cleanSku}" already exists in product database.`);
      return;
    }

    const qty = parseInt(productForm.quantity) || 0;
    const threshold = parseInt(productForm.reorderThreshold) || 5;
    const cost = parseFloat(productForm.unitCost) || 0;
    const price = parseFloat(productForm.sellingPrice) || 0;

    const newProd: InventoryProduct = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      sku: cleanSku,
      name: productForm.name.trim(),
      category: productForm.category,
      supplier: productForm.supplier,
      quantity: Math.max(0, qty),
      reorderThreshold: threshold,
      unitCost: cost,
      sellingPrice: price,
      status: deriveStatus(qty, threshold),
      lastUpdated: new Date().toISOString().split('T')[0],
      description: productForm.description,
    };

    // If initial quantity > 0, log an initial stock inward movement
    const newMovement: StockMovementRecord = {
      id: `MOV-${Math.floor(1000 + Math.random() * 9000)}`,
      sku: newProd.sku,
      productName: newProd.name,
      type: 'Inward Restock',
      quantityChange: qty,
      reason: 'Initial SKU Catalog Entry',
      reference: 'INIT-CATALOG',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      operator: 'Enterprise Operator',
    };

    setData((prev) => ({
      ...prev,
      products: [newProd, ...prev.products],
      movements: qty > 0 ? [newMovement, ...prev.movements] : prev.movements,
    }));

    setIsAddProductOpen(false);
    setProductForm({
      sku: '',
      name: '',
      category: 'Machined Parts',
      supplier: data.suppliers[0]?.name || '',
      quantity: '10',
      reorderThreshold: '10',
      unitCost: '5000',
      sellingPrice: '8500',
      description: '',
    });
  };

  // Edit Product
  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const threshold = parseInt(productForm.reorderThreshold) || 5;
    const cost = parseFloat(productForm.unitCost) || 0;
    const price = parseFloat(productForm.sellingPrice) || 0;

    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id !== selectedProduct.id) return p;
        return {
          ...p,
          name: productForm.name,
          category: productForm.category,
          supplier: productForm.supplier,
          reorderThreshold: threshold,
          unitCost: cost,
          sellingPrice: price,
          description: productForm.description,
          status: deriveStatus(p.quantity, threshold),
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }),
    }));

    setIsEditProductOpen(false);
    setSelectedProduct(null);
  };

  // Delete Product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== selectedProduct.id),
    }));
    setIsDeleteProductOpen(false);
    setSelectedProduct(null);
  };

  // Adjust Stock
  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setAdjustError(null);

    const changeQty = parseInt(adjustmentForm.quantityChange) || 0;
    if (changeQty === 0) return;

    const isNegative =
      adjustmentForm.type === 'Production Outward' ||
      adjustmentForm.type === 'Scrap / Write-off';
    const delta = isNegative ? -Math.abs(changeQty) : Math.abs(changeQty);

    const newQty = selectedProduct.quantity + delta;
    if (newQty < 0) {
      setAdjustError(
        `Insufficient stock: Cannot remove ${Math.abs(delta)} units. Available is ${selectedProduct.quantity}.`
      );
      return;
    }

    const newStatus = deriveStatus(newQty, selectedProduct.reorderThreshold);

    const newMovement: StockMovementRecord = {
      id: `MOV-${Math.floor(1000 + Math.random() * 9000)}`,
      sku: selectedProduct.sku,
      productName: selectedProduct.name,
      type: adjustmentForm.type,
      quantityChange: delta,
      reason: adjustmentForm.reason || 'Manual Inventory Adjustment',
      reference: adjustmentForm.reference || 'MANUAL-ADJ',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      operator: 'Enterprise Operator',
    };

    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              quantity: newQty,
              status: newStatus,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : p
      ),
      movements: [newMovement, ...prev.movements],
    }));

    setIsAdjustStockOpen(false);
    setSelectedProduct(null);
  };

  // Receive Purchase Order
  const handleReceivePo = (poId: string) => {
    const targetPo = data.purchaseOrders.find((po) => po.id === poId);
    if (!targetPo || targetPo.status === 'Received') return;

    // Create stock movements and update quantities
    const newMovements: StockMovementRecord[] = [];
    const updatedProducts = [...data.products];

    targetPo.items.forEach((item) => {
      const prodIndex = updatedProducts.findIndex((p) => p.id === item.productId || p.sku === item.sku);
      if (prodIndex >= 0) {
        const p = updatedProducts[prodIndex];
        const newQty = p.quantity + item.quantity;
        updatedProducts[prodIndex] = {
          ...p,
          quantity: newQty,
          status: deriveStatus(newQty, p.reorderThreshold),
          lastUpdated: new Date().toISOString().split('T')[0],
        };

        newMovements.push({
          id: `MOV-${Math.floor(1000 + Math.random() * 9000)}`,
          sku: p.sku,
          productName: p.name,
          type: 'Inward Restock',
          quantityChange: item.quantity,
          reason: `PO Receipt Fulfillment #${targetPo.id}`,
          reference: targetPo.id,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          operator: 'Receiving Dock Lead',
        });
      }
    });

    setData((prev) => ({
      ...prev,
      products: updatedProducts,
      movements: [...newMovements, ...prev.movements],
      purchaseOrders: prev.purchaseOrders.map((po) =>
        po.id === poId ? { ...po, status: 'Received' as const } : po
      ),
    }));
  };

  // Create Purchase Order
  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = data.products.find((p) => p.id === poForm.productId);
    if (!prod) return;

    const qty = parseInt(poForm.quantity) || 10;
    const total = qty * prod.unitCost;

    const newPo: PurchaseOrder = {
      id: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      supplierName: poForm.supplierName,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: poForm.expectedDelivery,
      status: 'Ordered',
      items: [
        {
          productId: prod.id,
          sku: prod.sku,
          name: prod.name,
          quantity: qty,
          unitCost: prod.unitCost,
        },
      ],
      totalAmount: total,
    };

    setData((prev) => ({
      ...prev,
      purchaseOrders: [newPo, ...prev.purchaseOrders],
    }));

    setIsCreatePoOpen(false);
  };

  // Add Supplier
  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierForm.name.trim()) return;

    const newSup: Supplier = {
      id: `SUP-${Math.floor(10 + Math.random() * 90)}`,
      name: supplierForm.name.trim(),
      category: supplierForm.category,
      contactPerson: supplierForm.contactPerson || 'Authorized Rep',
      phone: supplierForm.phone || '+91 98400 00000',
      email: supplierForm.email || 'supply@vendor.in',
      city: supplierForm.city,
      leadTimeDays: parseInt(supplierForm.leadTimeDays) || 7,
    };

    setData((prev) => ({
      ...prev,
      suppliers: [newSup, ...prev.suppliers],
    }));

    setIsAddSupplierOpen(false);
    setSupplierForm({
      name: '',
      category: 'Machined Castings',
      contactPerson: '',
      phone: '',
      email: '',
      city: 'Chennai',
      leadTimeDays: '7',
    });
  };

  return (
    <AppShell
      appName="ALS Inventory Control"
      appCategory="Multi-Warehouse & Supply Chain"
      appVersion="v2.4.0"
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onResetData={handleReset}
      primaryAction={
        activeTab === 'products'
          ? {
              label: 'Add Product SKU',
              onClick: () => setIsAddProductOpen(true),
              icon: Plus,
            }
          : activeTab === 'movements'
          ? {
              label: 'Adjust Stock',
              onClick: () => {
                if (data.products.length > 0) {
                  setSelectedProduct(data.products[0]);
                  setIsAdjustStockOpen(true);
                }
              },
              icon: Sliders,
            }
          : activeTab === 'orders'
          ? {
              label: 'New Purchase Order',
              onClick: () => setIsCreatePoOpen(true),
              icon: Plus,
            }
          : {
              label: 'Add Product SKU',
              onClick: () => setIsAddProductOpen(true),
              icon: Plus,
            }
      }
    >
      {/* TAB 1: WAREHOUSE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Warehouse Stock &amp; Supply Chain Overview
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Centralized inventory levels, valuation benchmarks, and fulfillment operations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus size={13} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Total Catalog SKUs
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {totalProducts} Items
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                Across 5 product categories
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Total Physical Units
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {totalUnits.toLocaleString('en-IN')} Units
              </div>
              <div className="text-[11px] text-emerald-700 mt-1 font-mono font-medium">
                Warehouse Hub Chennai
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Inventory Asset Valuation
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{totalValuation.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                Calculated at weighted unit cost
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Reorder Critical Alerts
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2 flex items-center gap-2">
                <span>{lowStockCount + outOfStockCount}</span>
                {lowStockCount + outOfStockCount > 0 && (
                  <span className="text-xs font-mono px-2 py-0.5 bg-neutral-900 text-white uppercase font-normal">
                    {outOfStockCount} Out
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {lowStockCount} below reorder threshold
              </div>
            </div>
          </div>

          {/* Quick Grids: Low Stock Warning & Recent Movements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Low stock alerts */}
            <div className="lg:col-span-6 bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={15} className="text-black" />
                  <h3 className="font-serif font-medium text-base text-black">
                    Reorder Threshold Alerts
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('Low Stock');
                    setActiveTab('products');
                  }}
                  className="text-xs uppercase font-mono text-black hover:underline cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="divide-y divide-[#EAEAEA]">
                {data.products
                  .filter((p) => p.status === 'Low Stock' || p.status === 'Out of Stock')
                  .slice(0, 4)
                  .map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-serif font-medium text-black">{p.name}</div>
                        <div className="text-[10px] text-[#777777] font-mono">
                          {p.sku} &middot; Supplier: {p.supplier}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right font-mono">
                          <span className="font-bold text-black">{p.quantity}</span> / {p.reorderThreshold} min
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsAdjustStockOpen(true);
                          }}
                          className="px-2 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase"
                        >
                          Restock
                        </button>
                      </div>
                    </div>
                  ))}
                {data.products.filter((p) => p.status !== 'In Stock').length === 0 && (
                  <div className="py-6 text-center text-[#777777] text-xs font-serif">
                    All inventory items are currently above safety thresholds.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Stock Inward/Outward Ledger */}
            <div className="lg:col-span-6 bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                <h3 className="font-serif font-medium text-base text-black">
                  Recent Movement Audits
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('movements')}
                  className="text-xs uppercase font-mono text-black hover:underline cursor-pointer"
                >
                  View History &rarr;
                </button>
              </div>

              <div className="divide-y divide-[#EAEAEA]">
                {data.movements.slice(0, 4).map((mov) => (
                  <div key={mov.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-serif font-medium text-black">{mov.productName}</div>
                      <div className="text-[10px] text-[#777777] font-mono">
                        {mov.type} &middot; Ref: {mov.reference}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono font-bold text-sm ${
                          mov.quantityChange > 0 ? 'text-emerald-700' : 'text-neutral-900'
                        }`}
                      >
                        {mov.quantityChange > 0 ? `+${mov.quantityChange}` : mov.quantityChange}
                      </span>
                      <div className="text-[10px] text-[#777777] font-mono">{mov.timestamp.split(' ')[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT CATALOG */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Product SKU Directory &amp; Stock Levels
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Complete engineering bill-of-materials with live quantity controls and pricing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddProductOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Create Product SKU</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#EAEAEA]">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#777777]" />
              <input
                type="text"
                placeholder="Search by SKU, product name, or supplier..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs font-serif focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-[#777777]">Stock:</span>
              {(['ALL', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 text-[10px] uppercase font-mono border cursor-pointer ${
                    statusFilter === st
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-black border-[#EAEAEA] hover:border-black'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">In Stock</th>
                  <th className="p-3 text-right">Cost (INR)</th>
                  <th className="p-3 text-right">Price (INR)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.products
                  .filter((p) => {
                    const matchesSearch =
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.supplier.toLowerCase().includes(productSearch.toLowerCase());
                    const matchesCategory =
                      categoryFilter === 'ALL' || p.category === categoryFilter;
                    const matchesStatus =
                      statusFilter === 'ALL' || p.status === statusFilter;
                    return matchesSearch && matchesCategory && matchesStatus;
                  })
                  .map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="p-3 font-mono font-medium text-black">{product.sku}</td>
                      <td className="p-3 font-medium text-black">
                        <div>{product.name}</div>
                        <div className="text-[10px] text-[#777777] font-normal truncate max-w-xs">
                          {product.supplier}
                        </div>
                      </td>
                      <td className="p-3 text-[#555555]">{product.category}</td>
                      <td className="p-3 text-right font-mono font-bold text-black">
                        {product.quantity}
                        <span className="text-[10px] text-[#777777] font-normal ml-1">
                          (min: {product.reorderThreshold})
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono text-black">
                        ₹{product.unitCost.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono text-black">
                        ₹{product.sellingPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase font-mono border ${
                            product.status === 'In Stock'
                              ? 'bg-black text-white border-black'
                              : product.status === 'Out of Stock'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                              : 'bg-white text-black border-black font-semibold'
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsAdjustStockOpen(true);
                            }}
                            className="px-2 py-1 border border-[#EAEAEA] hover:border-black text-[10px] font-mono uppercase"
                            title="Adjust quantity"
                          >
                            Adjust
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductForm({
                                sku: product.sku,
                                name: product.name,
                                category: product.category,
                                supplier: product.supplier,
                                quantity: product.quantity.toString(),
                                reorderThreshold: product.reorderThreshold.toString(),
                                unitCost: product.unitCost.toString(),
                                sellingPrice: product.sellingPrice.toString(),
                                description: product.description || '',
                              });
                              setIsEditProductOpen(true);
                            }}
                            className="p-1 border border-[#EAEAEA] hover:border-black text-black"
                            title="Edit Product"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteProductOpen(true);
                            }}
                            className="p-1 border border-[#EAEAEA] hover:border-black text-black"
                            title="Delete SKU"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STOCK MOVEMENT LEDGER */}
      {activeTab === 'movements' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Stock Movement &amp; Audit Trail
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Cryptographically verifiable inward restocks, production dispatches, and manual adjustments.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (data.products.length > 0) {
                  setSelectedProduct(data.products[0]);
                  setIsAdjustStockOpen(true);
                }
              }}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sliders size={13} />
              <span>Record Stock Adjustment</span>
            </button>
          </div>

          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">Log ID</th>
                  <th className="p-3">SKU / Item</th>
                  <th className="p-3">Movement Type</th>
                  <th className="p-3 text-right">Units Changed</th>
                  <th className="p-3">Reason / Purpose</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.movements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="p-3 font-mono font-medium text-black">{mov.id}</td>
                    <td className="p-3 font-medium text-black">
                      <div>{mov.productName}</div>
                      <div className="text-[10px] text-[#777777] font-mono">{mov.sku}</div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#FAFAFA] border border-[#EAEAEA]">
                        {mov.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-right">
                      <span
                        className={mov.quantityChange > 0 ? 'text-emerald-700' : 'text-neutral-900'}
                      >
                        {mov.quantityChange > 0 ? `+${mov.quantityChange}` : mov.quantityChange}
                      </span>
                    </td>
                    <td className="p-3 text-[#444444]">{mov.reason}</td>
                    <td className="p-3 font-mono text-[#555555]">{mov.reference}</td>
                    <td className="p-3 font-mono text-[#777777]">{mov.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PURCHASE ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Purchase Orders &amp; Inward Shipments
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Supplier procurement requisitions and automated warehouse stock replenishment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatePoOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Create Purchase Order</span>
            </button>
          </div>

          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">PO #</th>
                  <th className="p-3">Vendor Supplier</th>
                  <th className="p-3">Procurement Items</th>
                  <th className="p-3">Order Date</th>
                  <th className="p-3">Delivery ETA</th>
                  <th className="p-3 text-right">Total (INR)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="p-3 font-mono font-medium text-black">{po.id}</td>
                    <td className="p-3 font-medium text-black">{po.supplierName}</td>
                    <td className="p-3">
                      {po.items.map((it, idx) => (
                        <div key={idx} className="text-[11px] text-[#444444]">
                          {it.quantity}x {it.name}
                        </div>
                      ))}
                    </td>
                    <td className="p-3 font-mono text-[#555555]">{po.orderDate}</td>
                    <td className="p-3 font-mono text-[#555555]">{po.expectedDelivery}</td>
                    <td className="p-3 font-mono text-black text-right font-medium">
                      ₹{po.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[9px] uppercase font-mono border ${
                          po.status === 'Received'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black font-semibold'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {po.status === 'Ordered' ? (
                        <button
                          type="button"
                          onClick={() => handleReceivePo(po.id)}
                          className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] uppercase font-mono cursor-pointer"
                        >
                          Receive Shipment &rarr;
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-[#777777]">Fulfilled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SUPPLIERS */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Approved Supplier &amp; Vendor Network
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Tier-1 component manufacturers, foundries, and raw material distributors.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddSupplierOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Enroll Supplier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.suppliers.map((sup) => (
              <div
                key={sup.id}
                className="bg-white border border-[#EAEAEA] p-5 shadow-xs flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#777777]">
                    <span>{sup.id} &middot; {sup.city}</span>
                    <span>{sup.leadTimeDays}d Lead Time</span>
                  </div>
                  <h3 className="text-lg font-serif font-normal text-black mt-2">{sup.name}</h3>
                  <div className="text-xs text-[#555555] mt-1 font-serif">{sup.category}</div>
                  <div className="mt-3 pt-3 border-t border-[#EAEAEA] space-y-1 text-xs">
                    <div>Contact: {sup.contactPerson}</div>
                    <div className="font-mono text-[11px] text-[#777777]">{sup.email}</div>
                    <div className="font-mono text-[11px] text-[#777777]">{sup.phone}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAEAEA]">
                  <button
                    type="button"
                    onClick={() => {
                      setPoForm((prev) => ({ ...prev, supplierName: sup.name }));
                      setIsCreatePoOpen(true);
                    }}
                    className="w-full py-1.5 border border-[#EAEAEA] hover:border-black text-[10px] font-mono uppercase transition-colors"
                  >
                    Raise Purchase Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT SKU */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Add Product SKU to Catalog</h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            {skuError && (
              <div className="p-3 mb-4 bg-[#FAFAFA] border border-black text-xs text-neutral-900 flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{skuError}</span>
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    SKU Code * (Unique)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SKU-CNC-990"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as InventoryProduct['category'],
                      })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Machined Parts">Machined Parts</option>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Electronic Hardware">Electronic Hardware</option>
                    <option value="Hydraulics">Hydraulics</option>
                    <option value="Fasteners">Fasteners</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Product / Component Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inconel 718 Exhaust Manifold Flange"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Initial Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.quantity}
                    onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Reorder Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.reorderThreshold}
                    onChange={(e) =>
                      setProductForm({ ...productForm, reorderThreshold: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Unit Cost (INR)
                  </label>
                  <input
                    type="number"
                    value={productForm.unitCost}
                    onChange={(e) => setProductForm({ ...productForm, unitCost: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Selling Price (INR)
                  </label>
                  <input
                    type="number"
                    value={productForm.sellingPrice}
                    onChange={(e) => setProductForm({ ...productForm, sellingPrice: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Primary Supplier
                </label>
                <select
                  value={productForm.supplier}
                  onChange={(e) => setProductForm({ ...productForm, supplier: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.suppliers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Add SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADJUST STOCK */}
      {isAdjustStockOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-md w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <div>
                <h3 className="text-xl font-normal">Adjust Physical Stock</h3>
                <div className="text-[10px] font-mono text-[#777777]">
                  {selectedProduct.sku} &middot; {selectedProduct.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdjustStockOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            {adjustError && (
              <div className="p-3 mb-4 bg-[#FAFAFA] border border-black text-xs text-neutral-900 flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{adjustError}</span>
              </div>
            )}

            <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA] text-xs mb-4">
              <span className="text-[#777777]">Current On-Hand Stock: </span>
              <span className="font-mono font-bold text-black">{selectedProduct.quantity} units</span>
            </div>

            <form onSubmit={handleAdjustStock} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Adjustment Type
                </label>
                <select
                  value={adjustmentForm.type}
                  onChange={(e) =>
                    setAdjustmentForm({
                      ...adjustmentForm,
                      type: e.target.value as any,
                    })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  <option value="Inward Restock">Inward Restock (+ Add Stock)</option>
                  <option value="Production Outward">Production Outward (- Deduct Stock)</option>
                  <option value="Scrap / Write-off">Scrap / Write-off (- Deduct Stock)</option>
                  <option value="Audit Reconciliation">Audit Reconciliation (+ Adjust)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Quantity Units *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={adjustmentForm.quantityChange}
                  onChange={(e) =>
                    setAdjustmentForm({ ...adjustmentForm, quantityChange: e.target.value })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Reason / Purpose
                </label>
                <input
                  type="text"
                  required
                  value={adjustmentForm.reason}
                  onChange={(e) =>
                    setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Reference Document ID
                </label>
                <input
                  type="text"
                  value={adjustmentForm.reference}
                  onChange={(e) =>
                    setAdjustmentForm({ ...adjustmentForm, reference: e.target.value })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsAdjustStockOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Apply Stock Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE PRODUCT CONFIRMATION */}
      {isDeleteProductOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-sm w-full p-6 shadow-2xl text-black font-serif">
            <h3 className="text-xl font-normal mb-2">Delete Product SKU?</h3>
            <p className="text-xs text-[#555555] font-light leading-relaxed mb-4">
              Are you sure you want to remove <strong>{selectedProduct.sku}</strong> (
              {selectedProduct.name}) from inventory? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
              <button
                type="button"
                onClick={() => setIsDeleteProductOpen(false)}
                className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
              >
                Delete SKU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE PURCHASE ORDER */}
      {isCreatePoOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-md w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Raise Purchase Order</h3>
              <button
                type="button"
                onClick={() => setIsCreatePoOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePo} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Vendor Supplier
                </label>
                <select
                  value={poForm.supplierName}
                  onChange={(e) => setPoForm({ ...poForm, supplierName: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.suppliers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Select Product Item to Procure
                </label>
                <select
                  value={poForm.productId}
                  onChange={(e) => setPoForm({ ...poForm, productId: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.sku} &middot; {p.name} (₹{p.unitCost})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Order Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={poForm.quantity}
                    onChange={(e) => setPoForm({ ...poForm, quantity: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Delivery ETA
                  </label>
                  <input
                    type="date"
                    required
                    value={poForm.expectedDelivery}
                    onChange={(e) => setPoForm({ ...poForm, expectedDelivery: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsCreatePoOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Dispatch PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
};
