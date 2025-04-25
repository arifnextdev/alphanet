import Header from './products/_components/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Header />
      <main className="flex-1 p-6 overflow-hidden mt-16">{children}</main>
    </div>
  );
}
