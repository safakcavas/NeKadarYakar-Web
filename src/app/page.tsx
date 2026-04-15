"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { RouteDetails } from "@/components/MapRouter";

import FAQ from "@/components/FAQ";

const MapRouter = dynamic(() => import("@/components/MapRouter"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] sm:h-[500px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center border border-border text-muted">Harita Yükleniyor...</div>
});

const CITIES = ["ADANA","ADIYAMAN","AFYON","AGRI","AKSARAY","AMASYA","ANKARA","ANTALYA","AYDIN","BALIKESIR","BARTIN","BATMAN","BILECIK","BOLU","BURDUR","BURSA","CANAKKALE","CANKIRI","CORUM","DENIZLI","DIYARBAKIR","DUZCE","EDIRNE","ELAZIĞ","ERZINCAN","ERZURUM","ESKISEHIR","GAZİANTEP","GIRESUN","HATAY","ISPARTA","ISTANBUL","IZMIR","İÇEL","K.MARAS","KARABUK","KARAMAN","KASTAMONU","KAYSERI","KIRIKKALE","KIRKLARELI","KIRSEHIR","KOCAELI","KONYA","KUTAHYA","MALATYA","MANISA","MARDİN","MUGLA","NEVSEHIR","NİĞDE","ORDU","OSMANIYE","RIZE","SAKARYA","SAMSUN","SIVAS","SİNOP","ŞANLIURFA","TEKIRDAG","TOKAT","TRABZON","USAK","VAN","YALOVA","YOZGAT","ZONGULDAK"];

export default function Home({ presetSlug }: { presetSlug?: string; params?: any }) {
  const [city, setCity] = useState("ISTANBUL");
  const [fuelPrices, setFuelPrices] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEngineId, setSelectedEngineId] = useState<number | "">("");
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  
  // New States
  const [passengerCount, setPassengerCount] = useState(1);
  const [tollCost, setTollCost] = useState<number>(0);
  const [customConsumption, setCustomConsumption] = useState<string>("");
  const [isCustomConsumptionChecked, setIsCustomConsumptionChecked] = useState<boolean>(false);

  // Fetch all cars initially
  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        const uniqueMakes = Array.from(new Set(data.map((c: any) => c.make)));
        setMakes(uniqueMakes as string[]);
        
        // Handle programmatic SEO slug
        if (presetSlug) {
           const match = data.find((c: any) => {
              const slug = `${c.make.toLowerCase()}-${c.model.toLowerCase()}`.replace(/\s+/g, '-');
              return slug === presetSlug;
           });
           if (match) {
             setSelectedMake(match.make);
             setSelectedModel(match.model);
             const firstEngine = data.find((c:any) => c.make === match.make && c.model === match.model);
             if (firstEngine) {
                 setSelectedEngineId(firstEngine.id);
                 setSelectedCar(firstEngine);
             }
             return; // Skip local storage logic
           }
        }
        
        // Load cached choices from localStorage (only if no presetSlug is forcing the UI)
        const savedCity = localStorage.getItem("yakit_city");
        const savedMake = localStorage.getItem("yakit_make");
        const savedModel = localStorage.getItem("yakit_model");
        const savedEngine = localStorage.getItem("yakit_engine");
        
        if (savedCity) setCity(savedCity);
        if (savedMake && uniqueMakes.includes(savedMake)) {
          setSelectedMake(savedMake);
          if (savedModel) setSelectedModel(savedModel);
          if (savedEngine) {
            const id = parseInt(savedEngine);
            setSelectedEngineId(id);
            const car = data.find((c: any) => c.id === id);
            setSelectedCar(car || null);
          }
        }
      });
  }, [presetSlug]);

  useEffect(() => {
    fetch(`/api/fuel?city=${city}`)
      .then(res => res.json())
      .then(data => setFuelPrices(data));
  }, [city]);

  // Handle Car Selection changes
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCity(val);
    localStorage.setItem("yakit_city", val);
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedMake(val);
    setSelectedModel("");
    setSelectedEngineId("");
    setSelectedCar(null);
    setCustomConsumption("");
    setIsCustomConsumptionChecked(false);
    localStorage.setItem("yakit_make", val);
    localStorage.removeItem("yakit_model");
    localStorage.removeItem("yakit_engine");
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedModel(val);
    setSelectedEngineId("");
    setSelectedCar(null);
    setCustomConsumption("");
    setIsCustomConsumptionChecked(false);
    localStorage.setItem("yakit_model", val);
    localStorage.removeItem("yakit_engine");
  };

  const handleEngineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedEngineId(id);
    const car = cars.find((c: any) => c.id === id);
    setSelectedCar(car || null);
    setCustomConsumption("");
    setIsCustomConsumptionChecked(false);
    localStorage.setItem("yakit_engine", id.toString());
  };

  // Toll heuristics
  useEffect(() => {
    if (routeDetails?.isToll) {
      // Rough heuristic: 1.5 TL per km for toll roads as a placeholder
      setTollCost(Math.round(routeDetails.distanceKm * 1.5));
    } else {
      setTollCost(0);
    }
  }, [routeDetails]);

  // Calculations
  const activeConsumption = (isCustomConsumptionChecked && customConsumption && !isNaN(parseFloat(customConsumption.replace(',', '.')))) ? parseFloat(customConsumption.replace(',', '.')) : selectedCar?.consumption;

  const baseFuelCost = (routeDetails?.distanceKm && routeDetails.distanceKm > 0 && selectedCar && fuelPrices && activeConsumption) 
    ? (routeDetails.distanceKm / 100) * activeConsumption * (selectedCar.fuel === "Benzin" ? fuelPrices.gasoline : fuelPrices.diesel)
    : 0;

  const totalCost = baseFuelCost + tollCost;
  const costPerPerson = totalCost / passengerCount;

  return (
    <div className="min-h-screen p-4 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Ne Kadar Yakar?</h1>
        <p className="text-muted mt-2">Harita üzerinden nereden nereye gideceğinizi seçin, aracınızın gerçek motor değerlerine göre yakıt maliyetinizi anında hesaplayın.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar - Inputs */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-slate-800">1. Şehir ve Akaryakıt</h2>
            <select 
              value={city} 
              onChange={handleCityChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 cursor-pointer"
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {fuelPrices && (
              <div className="flex justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span>Benzin: <strong className="text-slate-900">{fuelPrices.gasoline}₺</strong></span>
                <span>Dizel: <strong className="text-slate-900">{fuelPrices.diesel}₺</strong></span>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-slate-800">2. Aracınızı Seçin</h2>
            <div className="flex flex-col gap-3">
              <select 
                value={selectedMake} 
                onChange={handleMakeChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Marka Seçiniz</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>

              <select 
                value={selectedModel} 
                onChange={handleModelChange}
                disabled={!selectedMake}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
              >
                <option value="">Model Seçiniz</option>
                {Array.from(new Set(cars.filter(c => c.make === selectedMake).map(c => c.model))).map(mod => (
                  <option key={mod as string} value={mod as string}>{mod as string}</option>
                ))}
              </select>

              <select 
                value={selectedEngineId} 
                onChange={handleEngineChange}
                disabled={!selectedModel}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
              >
                <option value="">Motor Seçiniz</option>
                {cars.filter(c => c.make === selectedMake && c.model === selectedModel).map(c => (
                  <option key={c.id} value={c.id}>{c.engine} ({c.fuel})</option>
                ))}
              </select>
            </div>
            {selectedCar && (
              <div className="mt-4 text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col gap-1">
                <span>Motor: <strong className="text-blue-900">{selectedCar.engine} ({selectedCar.fuel})</strong></span>
                <span>Tüketim: <strong className="text-blue-900">{activeConsumption} L / 100km</strong></span>
              </div>
            )}
          </div>
          
          {selectedCar && (
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-slate-800">3. Seyahat ve Maliyet Ayarları</h2>
            
            <div className="mb-4">
               <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2 cursor-pointer select-none">
                 <input 
                   type="checkbox"
                   checked={isCustomConsumptionChecked}
                   onChange={(e) => setIsCustomConsumptionChecked(e.target.checked)}
                   className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                 />
                 Yakıt tüketimi verisini kendim girmek istiyorum
               </label>
               
               {isCustomConsumptionChecked && (
                 <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                   <label className="text-sm font-medium text-slate-600 mb-2 block">Ortalama Yakıt Tüketimi (L/100km)</label>
                   <input 
                     type="text"
                     placeholder={selectedCar.consumption.toString()}
                     value={customConsumption} 
                     onChange={(e) => setCustomConsumption(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                   />
                   <p className="text-xs text-slate-400 mt-2">Standart katalog verisi: <strong>{selectedCar.consumption} L</strong>. Kendi gerçek verinizi buraya yazarak hesabı özelleştirebilirsiniz.</p>
                 </div>
               )}
            </div>

            <div className="mb-4 pt-4 border-t border-slate-100 mt-2">
               <label className="text-sm font-medium text-slate-600 mb-2 block">Yolcu Sayısı (Masraf Bölüşme)</label>
               <div className="flex items-center gap-3">
                 <button onClick={() => setPassengerCount(p => Math.max(1, p - 1))} className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-bold transition-colors">-</button>
                 <div className="flex-1 text-center font-bold text-lg text-slate-800">{passengerCount} Kişi</div>
                 <button onClick={() => setPassengerCount(p => p + 1)} className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-bold transition-colors">+</button>
               </div>
            </div>

            {routeDetails?.isToll && (
              <div className="pt-4 border-t border-slate-100 mt-2">
                 <label className="text-sm font-medium text-slate-600 mb-2 flex items-center justify-between">
                   <span>Otoyol Geçiş Tahmini (₺)</span>
                   <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded uppercase font-bold">ÜCRETLİ YOL</span>
                 </label>
                 <input 
                   type="number" 
                   value={tollCost} 
                   onChange={(e) => setTollCost(parseInt(e.target.value) || 0)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                 />
                 <p className="text-xs text-slate-400 mt-1">KM bazlı varsayılan otoyol ücreti atandı. Kesin gişe fiyatını biliyorsanız değiştirebilirsiniz.</p>
              </div>
            )}

          </div>
          )}

        </div>

        {/* Right Side - Map & Result */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          <div className="bg-white p-2 rounded-2xl border border-border shadow-sm">
            <MapRouter onRouteCalculated={(d) => setRouteDetails(d)} />
          </div>

          {routeDetails && selectedCar ? (
            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg shadow-blue-600/30 flex flex-col items-center relative overflow-hidden transition-all duration-300">
               <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
               
               <h3 className="text-blue-100 font-medium mb-1 relative z-10">Tahmini Toplam Maliyet</h3>
               <div className="text-5xl md:text-6xl font-bold tracking-tight relative z-10 flex items-start gap-1">
                 {totalCost.toFixed(2)}
                 <span className="text-2xl mt-3 font-normal opacity-80">₺</span>
               </div>
               
               {passengerCount > 1 && (
                 <div className="mt-4 py-2 px-5 bg-white/20 backdrop-blur-md rounded-full text-blue-50 text-sm font-medium border border-white/20 relative z-10">
                   Kişi Başı Düşen: <strong className="text-white text-lg md:text-xl ml-2">{costPerPerson.toFixed(2)} ₺</strong>
                 </div>
               )}

               <div className="flex flex-wrap gap-4 md:gap-8 mt-6 pt-6 border-t border-blue-400/30 w-full justify-center relative z-10">
                 <div className="text-center">
                   <div className="text-blue-200 text-xs md:text-sm mb-1 uppercase tracking-wider">Mesafe</div>
                   <div className="font-semibold text-base md:text-lg">{routeDetails.distanceKm.toFixed(1)} km</div>
                 </div>
                 <div className="text-center">
                   <div className="text-blue-200 text-xs md:text-sm mb-1 uppercase tracking-wider">Yolculuk</div>
                   <div className="font-semibold text-base md:text-lg">{(routeDetails.durationMin / 60).toFixed(1)} sa</div>
                 </div>
                 <div className="text-center">
                   <div className="text-blue-200 text-xs md:text-sm mb-1 uppercase tracking-wider">Harcanan</div>
                   <div className="font-semibold text-base md:text-lg">{routeDetails?.distanceKm ? ((routeDetails.distanceKm/100) * activeConsumption).toFixed(1) : "0.0"} L</div>
                 </div>
                 {tollCost > 0 && (
                   <div className="text-center">
                     <div className="text-orange-200 text-xs md:text-sm mb-1 uppercase tracking-wider">Geçiş</div>
                     <div className="font-semibold text-base md:text-lg text-orange-200">+{tollCost} ₺</div>
                   </div>
                 )}
               </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-8 text-center text-slate-500 font-medium h-[150px] flex items-center justify-center">
               Hesaplama için öncelikle araç seçimi yapın ve haritadan rotanızı belirleyin.
            </div>
          )}

        </div>

      </div>

      <section className="mt-16 w-full max-w-5xl mx-auto px-4 md:px-0">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Popüler Araç İncelemeleri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {['Fiat Egea', 'Renault Megane', 'Toyota Corolla', 'Volkswagen Golf', 'Hyundai i20', 'Peugeot 208', 'Honda Civic', 'Dacia Duster'].map((carName) => {
             const slug = carName.toLowerCase().replace(/\s+/g, '-');
             return (
               <Link href={`/arac/${slug}`} key={slug} className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center justify-center text-center">
                 <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{carName}</span>
                 <span className="text-xs text-slate-400 mt-1">Yakıt Tüketimi</span>
               </Link>
             )
           })}
        </div>
      </section>

      <FAQ />

    </div>
  );
}
