import Image from 'next/image';
import Link from 'next/link';

export default function OffroadCarsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-10 py-10 flex-grow w-full">
      <Link href="/blog" className="text-sm text-blue-600 font-medium mb-8 inline-flex items-center hover:underline group">
        <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Blog'a Dön
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Off-Road</span>
          <span className="text-slate-500 text-sm font-medium">4 dk okuma</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Arazi Tutkunları İçin Maceraya Hazır En İyi 4x4 Araçlar
        </h1>
      </div>

      <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
        <Image src="/images/blog/4x4-offroad.png" alt="En İyi 4x4 Araçlar" priority fill className="object-cover" />
      </div>
      
      <article className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
          Şehrin gürültüsünden ve asfaltın monotonluğundan sıkılanlar için doğaya kaçışın en güçlü anahtarı gerçek bir 4x4 arazi aracıdır. Çamurlu yollar, sarp kayalıklar veya karlı dik yokuşlar... Bu araçlar için hepsi sadece aşılmayı bekleyen ufak birer pürüz.
        </p>

        <p className="mb-10">
          Peki doğa ve off-road tutkunlarının kalbinde taht kuran en iyi 4x4 modeller hangileri? İstisnasız herkesin kabul ettiği o devler listesine göz atalım.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Land Rover Defender: Bir İkonun Doğuşu</h2>
        <p className="mb-8">
          Geleneksel hatları, safkan arazi yetenekleri ve minimalist yapısıyla Land Rover Defender, off-road dünyasının yaşayan efsanesidir. Modern versiyonları daha teknolojik olsa da, klasik Defender'ın o sert ve mekanik hissi hala bir numaralı tercih sebebidir. Suda ilerleme derinliği (wading depth) ve yaklaşma/uzaklaşma açılarıyla engelleri birer birer aşar.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Jeep Wrangler: Çatıyı Çıkar, Doğaya Karış</h2>
        <p className="mb-8">
          Amerikan arazi kültürünün temel taşı. Çıkarılabilir kapıları ve tavanıyla doğrudan doğanın içine girmenizi sağlar. Merdiven tipi şasisi ve sağlam dana dingilleriyle (solid axles) kayaların üzerinde adeta dans eder. Rubicon donanımı, fabrikasyon haliyle bile en zorlu off-road parkurlarının üstesinden gelebilecek niteliktedir.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Ford F-150 Raptor: Çöllerin Yırtıcısı</h2>
        <p className="mb-8">
          Geleneksel off-road mantığından ziyade yüksek hızda arazi sürüşü için yaratılmış bir canavar. Fox Racing süspansiyonları, genişletilmiş iz genişliği ve çift turbolu güçlü motoru sayesinde sadece dağa tırmanmakla kalmaz, çölde uçarcasına ilerler.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Suzuki Jimny: Küçük Dev</h2>
        <p className="mb-8">
          Boyutlarına aldanmamak gerekiyor! Hafif yapısı, kısa aks mesafesi, merdiven şasisi ve rijit akslarıyla devasa V8'lerin kaldığı çamurlardan hafifliği sayesinde süzülerek çıkar. Hem şehirde park sorunu yaratmaz hem de hafta sonu arazide devleşir.
        </p>
        
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 mt-12 italic text-slate-700">
          <p className="m-0">
            <strong>Sonuç olarak;</strong> vahşi doğada güvenilir bir yoldaşa sahip olmak ve sınırları zorlarken yolda kalmamak için 4x4 seçimi büyük önem taşıyor. Ekipmanlarınızı hazırlayın, çünkü hafta sonu yaklaşıyor!
          </p>
        </div>
      </article>
    </main>
  );
}
