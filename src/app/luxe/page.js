import LuxeCategories from '@/components/LuxeCategories';
import EditorsPicks from '@/components/EditorsPicks';
import LuxeBrands from '@/components/LuxeBrands';

export default function LuxePage() {
  return (
    <main className="min-h-screen bg-white">
      <LuxeBrands />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center py-6">Luxe Beauty</h1>
        <LuxeCategories />
        <EditorsPicks />
      </div>
    </main>
  );
} 