import Image from 'next/image';
import Link from 'next/link';

export default function DurableCarsPage() {
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
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Rehber</span>
          <span className="text-slate-500 text-sm font-medium">5 dk okuma</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Yıllara Meydan Okuyan: En Dayanıklı Otomobil Modelleri
        </h1>
      </div>

      <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
        <Image src="/images/blog/durable-cars.png" alt="En Dayanıklı Otomobiller" priority fill className="object-cover" />
      </div>
      
      <article className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
          Otomobil satın alırken performans, tasarım ve yakıt tüketimi kadar önemli bir diğer kriter şüphesiz "dayanıklılık"tır. Sanayi yüzü görmeyen, yüz binlerce kilometreyi devirse de ilk günkü diriliğini koruyan arabalar her zaman efsaneleşmiştir.
        </p>

        <p className="mb-10">
          İşte motor ömrü, şasi sağlamlığı ve parça kalitesiyle yıllara meydan okuyan dünyanın en dayanıklı otomobil konseptlerinden bazıları:
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Toyota Land Cruiser & Hilux Serisi</h2>
        <p className="mb-8">
          Otomotiv dünyasında "kırılamayan" araç dendiğinde akla ilk gelen markalardan biri Toyota'dır. Özellikle Land Cruiser efsanesi ve Hilux pikapları, çöl sıcaklarından kutup soğuklarına kadar her türlü koşulda çalışacak şekilde dizayn edilmiştir. Sağlam şasi yapısı ve sorunsuz atmosferik motorlarıyla tam bir uzun ömür ustasıdır.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Volvo ve Çelik Şasi Geleneği</h2>
        <p className="mb-8">
          Güvenlik denince akla gelen ilk marka olan Volvo, sadece kaza anında değil, uzun yıllar kullanıma dayanıklı materyal seçimiyle de öne çıkar. Özellikle 90'lı yılların sonu ve 2000'lerin başındaki köşeli tasarımları, milyon kilometreleri deviren efsaneler arasındadır.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Mercedes-Benz W124 - Alman Tankı</h2>
        <p className="mb-8">
          Bir zamanların "Alman tankı" olarak anılan W124 kasası, mekanik sağlamlığın zirvelerinden biri kabul edilir. Günümüzde hala bazı Afrika ve Orta Doğu ülkelerinde taksi olarak hizmet veren modellerini görmek mümkündür.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Honda Civic ve Sorunsuz Şanzımanlar</h2>
        <p className="mb-8">
          Japon mühendisliğinin pratik örneklerinden olan Civic serisi, bakımları düzenli yapıldığı sürece kullanıcısını yarı yolda bırakmayan VTEC motor teknolojisi ve sorunsuz şanzımanıyla öne çıkar. Yüksek devir çevirmeye olan dayanıklılıkları efsanedir.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-12 italic text-slate-600">
          <p className="m-0">
            <strong>Özetle;</strong> dayanıklı bir araç seçmek, uzun vadede sanayi masraflarından tasarruf etmenin en garantili yoludur. Yeni nesil araçlar daha teknolojik olsa da, bu eski efsanelerin mekanik sadeliği ve dayanıklılığı her zaman aranmaya devam edecektir.
          </p>
        </div>
      </article>
    </main>
  );
}
