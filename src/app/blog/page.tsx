import Link from 'next/link';
import Image from 'next/image';

const posts = [
  {
    slug: 'gelecegin-teknolojisi-elektrikli-araclar',
    title: 'Geleceğin Teknolojisi, Bugünün Gerçeği: En İyi Elektrikli Otomobiller (EV)',
    excerpt: 'Sıfır emisyon, anlık devasa tork gücü ve sessiz sürüş deneyimiyle otomotivin yeni yıldızlarına yakından bakıyoruz.',
    image: '/images/blog/ev-future.png'
  },
  {
    slug: 'en-iyi-4x4-arazi-araclari',
    title: 'Arazi Tutkunları İçin Maceraya Hazır En İyi 4x4 Araçlar',
    excerpt: 'Çamurlu yollar, sarp kayalıklar veya karlı dik yokuşlar... Doğaya kaçışın en güçlü araçlarını sizin için derledik.',
    image: '/images/blog/4x4-offroad.png'
  },
  {
    slug: 'en-dayanikli-10-otomobil',
    title: 'Yıllara Meydan Okuyan: En Dayanıklı Otomobil Modelleri',
    excerpt: 'Sanayi yüzü görmeyen, yüz binlerce kilometreyi devirse de ilk günkü diriliğini koruyan otomotiv efsaneleri.',
    image: '/images/blog/durable-cars.png'
  }
];

export default function BlogIndex() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-10 py-12 md:py-20 flex-grow w-full">
      <div className="mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
          Otomobil ve Araç <span className="text-blue-600">Dünyası</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Sektördeki en güncel gelişmeler, araç incelemeleri ve sağlamlık raporlarını keşfedin. Ne Kadar Yakar ekibi tarafından özenle hazırlandı.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm flex-grow line-clamp-3 mb-6">
                {post.excerpt}
              </p>
              <div className="text-blue-600 font-medium text-sm flex items-center mt-auto">
                Makaleyi Oku 
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
