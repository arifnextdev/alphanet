'use client';
import ProductForm from '../../_components/productsForm';

export type ProductFormProps = {
  name: string;
  type: string;
  description?: string;
  price: number;
  billingCycle: string;
  isActive: boolean;
};

export default function EditProductPage() {
  const initialProduct = {
    name: 'Pro Hosting Plan',
    type: 'HOSTING',
    description: 'High-speed shared hosting.',
    price: 19.99,
    billingCycle: 'MONTHLY',
    isActive: true,
  };

  const handleUpdate = (values: ProductFormProps) => {
    console.log('Updating product:', values);
    // TODO: Connect to API
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <ProductForm initialData={initialProduct} onSubmit={handleUpdate} />
    </div>
  );
}
