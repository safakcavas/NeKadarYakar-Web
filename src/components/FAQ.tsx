import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Yakıt hesaplama nasıl yapılır?",
      a: "Aracınızın 100 kilometrede harcadığı ortalama yakıt tüketimini rotanızın mesafesiyle çarparak maliyeti hesaplayabilirsiniz. Sistemimiz bu hesabı OSRM haritaları ve güncel yakıt fiyatları üzerinden otomatik olarak yapar."
    },
    {
      q: "Otoyol ve gişe ücretleri hesaplamaya dahil mi?",
      a: "Evet! Çizilen rota ücretli bir otoyol içeriyorsa sistemimiz tahmini bir geçiş ücreti çıkarır. Gideceğiniz otoyolun kesin ücretini biliyorsanız, hesaplama ekranından bu tutarı serbestçe güncelleyebilirsiniz."
    },
    {
      q: "Araç masrafları nasıl bölüşülür? (Alman Usulü)",
      a: "Hesaplama ekranındaki 'Yolcu Sayısı' bölümünü kullanarak toplam maliyeti kişi sayısına bölebilir, araçtaki kişi başı düşen akaryakıt payını anında görebilirsiniz."
    },
    {
      q: "Hangi marka ve model araçları seçebilirim?",
      a: "Veri tabanımızda Hyundai, Volkswagen, Toyota, Renault, Fiat, Audi, Skoda, Peugeot ve çok daha fazla markanın güncel ve geçmiş yıllara ait popüler modelleri bulunmaktadır. Elektrikli ve hibrit araçların tüketimleri otomatik optimize edilir."
    }
  ];

  return (
    <section className="mt-16 mb-8 w-full max-w-5xl mx-auto px-4 md:px-0">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Sıkça Sorulan Sorular</h2>
      <div className="flex flex-col gap-3 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-200">
            <button 
              className="w-full text-left p-5 flex justify-between items-center font-medium text-slate-700 hover:bg-slate-50 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="pr-4">{faq.q}</span>
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
            </button>
            {openIndex === idx && (
              <div className="p-5 pt-0 text-slate-600 leading-relaxed text-sm animate-fade-in border-t border-slate-100 mt-2">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
