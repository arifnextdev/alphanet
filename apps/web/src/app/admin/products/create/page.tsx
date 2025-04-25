'use client';
import { ProductFormProps } from '../[id]/edit/page';
import ProductForm from '../_components/productsForm';

export default function CreateProductPage() {
  const handleCreate = (values: ProductFormProps) => {
    console.log('Creating product:', values);
    // TODO: Connect to API
  };

  return (
    <div className="p-6 container mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Create Product</h2>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
