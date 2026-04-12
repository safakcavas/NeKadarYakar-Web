import { Metadata } from 'next';
import { allCars } from '@/data';
import Calculator from '@/app/page';

type Props = {
  params: Promise<{ slug: string }> | { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Find car
  const match = allCars.find(c => `${c.make.toLowerCase()}-${c.model.toLowerCase()}`.replace(/\s+/g, '-') === slug);
  
  if (!match) {
    return { title: "Araç Bulunamadı - Ne Kadar Yakar" };
  }

  const title = `${match.make} ${match.model} Yakıt Tüketimi ve Yol Maliyeti Hesaplama`;
  const description = `${match.make} ${match.model} aracı için güncel otoyol geçiş ücretleri ve akaryakıt fiyatlarıyla detaylı yol masrafı (Dizel/Benzin) hesaplama aracı.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "tr_TR",
      type: "website",
    }
  };
}

export default async function AracPage({ params }: Props) {
  const resolvedParams = await params;
  const match = allCars.find(c => `${c.make.toLowerCase()}-${c.model.toLowerCase()}`.replace(/\s+/g, '-') === resolvedParams.slug);

  return (
    <>
      <Calculator presetSlug={resolvedParams.slug} />

      {match && (
        <article className="max-w-4xl mx-auto px-4 sm:px-10 pb-24 text-slate-700">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{match.make} {match.model} Yakıt Tüketimi Hakkında Her Şey</h2>
            <p className="mb-6 leading-relaxed">
              Uzun yola çıkmadan veya şehir içinde günlük kullanım sağlarken <strong>{match.make} {match.model}</strong> aracınızın ne kadar yakıt tükettiğini bilmek, bütçenizi yönetmeniz açısından kritik öneme sahiptir. Yukarıdaki hesaplama aracımızla, en güncel akaryakıt fiyatları ve otoyol geçiş ücretlerini hesaba katarak kusursuz bir öngörü oluşturabilirsiniz.
            </p>

            {/* AdSense Slot 1 (In-Article) */}
            <div className="w-full min-h-[90px] md:h-32 bg-slate-100 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 font-medium text-xs md:text-sm mb-6 relative overflow-hidden text-center p-4">
               <span className="relative z-10 block px-4 py-2 bg-white/80 rounded-lg">Reklam Alanı - Google AdSense (In-Article)</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">Ortalama Kullanım ve Optimizasyon</h3>
            <p className="mb-6 leading-relaxed">
              Katalog verilerine göre bu aracın temel tüketimi motor hacmine, model yılına ve hibrit durumlarına göre farklılık gösterir. Ancak genel olarak <strong>{match.make} {match.model}</strong> verimli bir aerodinamiye sahip olsa da kullanıcının gaza basma karakteri de harcanan yakıt (litre/100km) üzerinde doğrudan etkilidir. Sistemimiz, verileri hesaplarken güncel {match.model} fabrika verilerini baz alır; ancak isterseniz yukarıdaki araç kutusuna kendi gerçek ortalamanızı girebilirsiniz.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mb-3">Tasarruf İpuçları</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
               <li>Lastik basınçlarınızı fabrika çıkış değerlerine uygun olarak şişirdiğinizden emin olun. Bu tek başına yüzdelik tüketimde olumlu fark yaratabilir.</li>
               <li>Klima veya ısıtma sistemlerini uzun süreli ve yoğun kullanmak ortalama tüketiminizi 0.5 ile 1.5 Litre/100km oranında yükseltebilir.</li>
               <li>Eğer mümkünse otoyollarda sabit hızda (Cruise Control) giderek ciddi anlamda tasarruf yapabilirsiniz. Paralı yollar bazen hızlı gitseniz bile yüksek geçiş ücretleri yaratır; sitemizden alternatif ücretsiz D-100 rotalarını fiyat bazlı kıyaslamayı unutmayın.</li>
            </ul>

            {/* AdSense Slot 2 (Display/Multiplex Ad) */}
            <div className="w-full min-h-[250px] bg-slate-100 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 font-medium text-xs md:text-sm mb-2 relative overflow-hidden text-center p-4">
               <span className="relative z-10 block px-4 py-2 bg-white/80 rounded-lg shadow-sm">Reklam Alanı - Google AdSense (Multiplex/Display Ad)</span>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
