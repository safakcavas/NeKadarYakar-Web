import Image from 'next/image';
import Link from 'next/link';

export default function ElectricCarsPage() {
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
          <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full">Teknoloji & Gelecek</span>
          <span className="text-slate-500 text-sm font-medium">6 dk okuma</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Geleceğin Teknolojisi, Bugünün Gerçeği: En İyi Elektrikli Otomobiller (EV)
        </h1>
      </div>

      <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden mb-12 shadow-lg shadow-cyan-900/10 border border-slate-100">
        <Image src="/images/blog/ev-future.png" alt="Gelecek Teknolojisi Elektrikli Araçlar" priority fill className="object-cover" />
      </div>
      
      <article className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
          İçten yanmalı motorların yavaş yavaş tahtını bıraktığı günümüzde, otomotiv endüstrisinin geleceği tartışmasız elektrikte. Sıfır emisyon, anlık devasa tork gücü ve sessiz sürüş deneyimiyle elektrikli araçlar (EV), bilim kurgu filmlerinden fırlayıp hayatımızın tam merkezine yerleşti.
        </p>

        <p className="mb-10">
          Menzil kaygısını bitiren batarya teknolojileri ve giderek yaygınlaşan şarj istasyonlarıyla sektörün hızla parlayan yeni yıldızlarına hep beraber yakından bakalım.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Tesla Model S Plaid: Hızın Yeni Tanımı</h2>
        <p className="mb-8">
          Elektrikli otomobil devriminin öncüsü Tesla'nın ulaştığı son noktalardan biri. 1000 beygirin üzerindeki gücü ve 2 saniyenin altındaki 0-100 km/s hızlanmasıyla hiper araçları utandıran bir performansa sahip. Ayrıca teknolojik iç iskeleti ve sürekli güncelenen Otopilot sistemiyle kendi kendine yeten gerçek bir teknoloji istasyonu konumunda.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Porsche Taycan: Saf Sürüş Dinamikleri</h2>
        <p className="mb-8">
          Elektrikli bir otomobilin "Porsche" gibi hissettirip hissettiremeyeceği tartışmalarına verilmiş en güçlü cevap. İnanılmaz ağırlık merkezine, mükemmel şasi ayarına ve sürücüyle bütünleşen bir sürüş yapısına sahip. Elektrikli olmasının yanı sıra, safkan bir spor otomobil ruhunu her bir devrinde yaşatıyor.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hyundai Ioniq 5 & Kia EV6: Çizginin Dışında Tasarımlar</h2>
        <p className="mb-8">
          E-GMP platformu üzerine inşa edilen bu iki kardeş, retro-fütüristik tasarımları ve 800V ultra-hızlı şarj kapasiteleri ile öne çıkıyor. Özellikle iç mekandaki ferahlık (lounge stili) algısı ve aracı devasa bir güç bankası gibi kullanabilme (V2L) yetenekleri sayesinde geleneksel otomobil çizgilerini tamamen baştan çiziyorlar.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Togg T10X: Yeni Nesil Akıllı Cihaz</h2>
        <p className="mb-8">
          Yerli otomobil Togg, sadece basit bir ulaşım aracı olmaktan ziyade "Akıllı Cihaz (Smart Device)" vizyonuyla tasarlandı. Kullanıcı odaklı dijital asistanı, geniş yekpare ekran paneli ve bölgesel teknolojik entegrasyonlarıyla sürücülere tamamen bağlantılı bir dijital yaşam alanı sunuyor.
        </p>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-8 mt-12">
          <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">Dönüşüm Hızlanıyor</h3>
          <p className="m-0 text-slate-700">
            Otomotiv dünyası radikal bir şekilde kabuk değiştirirken, yazılım ve donanımın muhteşem uyumunu bu elektrikli araçlarda hep birlikte deneyimliyoruz. Gelecek nesillere daha temiz bir dünya bırakmak için devrim devam ediyor!
          </p>
        </div>
      </article>
    </main>
  );
}
