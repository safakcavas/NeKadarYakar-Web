"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface RouteDetails {
  distanceKm: number;
  durationMin: number;
  isToll: boolean;
}

interface RouteOption {
  index: number;
  distanceKm: number;
  durationMin: number;
  coordinates: [number, number][];
}

interface MapProps {
  onRouteCalculated: (details: RouteDetails) => void;
}

export default function MapRouter({ onRouteCalculated }: MapProps) {
  const [mapObj, setMapObj] = useState<L.Map | null>(null);
  
  const [originStr, setOriginStr] = useState("");
  const [destStr, setDestStr] = useState("");

  const [originLatLng, setOriginLatLng] = useState<L.LatLng | null>(null);
  const [destLatLng, setDestLatLng] = useState<L.LatLng | null>(null);
  const [originMarker, setOriginMarker] = useState<L.Marker | null>(null);
  const [destMarker, setDestMarker] = useState<L.Marker | null>(null);

  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number | null>(null);
  const [polylines, setPolylines] = useState<L.Polyline[]>([]);
  
  const [loading, setLoading] = useState(false);

  // Initialize Map
  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).setView([39.92077, 32.85411], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OSM contributors",
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    setMapObj(map);
    return () => { map.remove(); };
  }, []);

  // Geocoding Function
  const geocodeAddress = async (address: string): Promise<L.LatLng | null> => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        return L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
      }
      return null;
    } catch {
      return null;
    }
  };

  const clearMapRoutes = () => {
    polylines.forEach(pl => pl.remove());
    setPolylines([]);
    setRoutes([]);
    setSelectedRouteIdx(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originStr || !destStr || !mapObj) return;

    setLoading(true);
    clearMapRoutes();

    const oLL = await geocodeAddress(originStr);
    const dLL = await geocodeAddress(destStr);

    if (!oLL || !dLL) {
      alert("Belirtilen adreslerden biri veya ikisi bulunamadı. Lütfen daha belirgin yazarak tekrar deneyin.");
      setLoading(false);
      return;
    }

    setOriginLatLng(oLL);
    setDestLatLng(dLL);

    if (originMarker) originMarker.remove();
    if (destMarker) destMarker.remove();

    const newOM = L.marker(oLL).addTo(mapObj).bindPopup("<b>Kalkış:</b><br/>" + originStr).openPopup();
    const newDM = L.marker(dLL).addTo(mapObj).bindPopup("<b>Varış:</b><br/>" + destStr);
    
    setOriginMarker(newOM);
    setDestMarker(newDM);

    fetchRoutes(oLL, dLL);
  };

  const fetchRoutes = async (o: L.LatLng, d: L.LatLng) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${o.lng},${o.lat};${d.lng},${d.lat}?overview=full&geometries=geojson&alternatives=true`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const parsedRoutes: RouteOption[] = data.routes.map((rt: any, idx: number) => ({
          index: idx,
          distanceKm: rt.distance / 1000,
          durationMin: rt.duration / 60,
          coordinates: rt.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]])
        }));

        setRoutes(parsedRoutes);
        drawRoutes(parsedRoutes, 0); // select 0 by default
      } else {
        alert("Üzgünüz, iki nokta arası uygun karayolu rotası bulunamadı.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Rotayı çizerken bir hata oluştu.");
      setLoading(false);
    }
  };

  const drawRoutes = (rts: RouteOption[], selectedIndex: number) => {
    if (!mapObj) return;

    // Clear old ones
    polylines.forEach(pl => pl.remove());
    
    const newPolylines: L.Polyline[] = [];

    // Draw unselected first so they appear below the selected one
    rts.forEach(rt => {
      if (rt.index !== selectedIndex) {
        const isToll = rt.index === 0 && rts.length > 1;
        const color = isToll ? "#fb923c" : "#4ade80"; // lighter orange & green for unselected
        const pl = L.polyline(rt.coordinates, { color: color, weight: 5, opacity: 0.7 }).addTo(mapObj);
        newPolylines.push(pl);
      }
    });

    // Draw selected (on top)
    const selectedRt = rts.find(r => r.index === selectedIndex)!;
    const isSelectedToll = selectedRt.index === 0 && rts.length > 1;
    const activeColor = isSelectedToll ? "#ea580c" : "#16a34a"; // darker orange & green for selected
    
    const activePl = L.polyline(selectedRt.coordinates, { color: activeColor, weight: 7, opacity: 1.0 }).addTo(mapObj);
    newPolylines.push(activePl);
    
    mapObj.fitBounds(activePl.getBounds(), { padding: [50, 50] });

    setPolylines(newPolylines);
    setSelectedRouteIdx(selectedIndex);
    onRouteCalculated({
      distanceKm: selectedRt.distanceKm,
      durationMin: selectedRt.durationMin,
      isToll: isSelectedToll
    });
    setLoading(false);
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] border border-border rounded-2xl overflow-hidden shadow-sm">
      <div id="map" className="w-full h-full z-0 font-sans" />
      
      {/* Floating Search Window */}
      <div className="absolute top-4 left-4 z-[400] w-[calc(100%-32px)] sm:w-[320px]">
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-3">
          <input 
            type="text"
            required
            value={originStr}
            onChange={(e) => setOriginStr(e.target.value)}
            placeholder="Nereden (Örn: Kadıköy, İstanbul)"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text"
            required
            value={destStr}
            onChange={(e) => setDestStr(e.target.value)}
            placeholder="Nereye (Örn: Çankaya, Ankara)"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Aranıyor..." : "Rotayı Bul"}
          </button>
        </form>
      </div>

      {/* Alternative Routes Picker */}
      {routes.length > 0 && selectedRouteIdx !== null && (
        <div className="absolute bottom-4 left-4 z-[400] w-[calc(100%-32px)] sm:w-[320px]">
          <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Alternatif Rotalar</h4>
            {routes.map(rt => {
              // Basit bir kural: OSRM'den dönen yollardan süresi en kısa olan genelde Paralı Otoyol'dur.
              // Diğer, süresi daha uzun olan yollar D-100 gibi (ücretsiz) devlet yollarıdır.
              const isFastest = rt.index === 0; // OSRM en hızlıyı ilk sıraya koyar
              const isToll = isFastest && routes.length > 1;
              const routeLabel = isToll ? "Otoyol (Ücretli Mümkün)" : "D-100 / Ücretsiz Yol";
              const routeColorString = isToll ? "text-orange-600 bg-orange-50 border-orange-200" : "text-green-700 bg-green-50 border-green-200";

              return (
                <button 
                  key={rt.index}
                  onClick={() => drawRoutes(routes, rt.index)}
                  className={`text-left p-3 rounded-lg border transition-all flex flex-col gap-1 ${
                    selectedRouteIdx === rt.index 
                    ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-500' // Selected
                    : `border-slate-200 hover:border-slate-300 hover:bg-slate-50 opacity-80 hover:opacity-100` // Unselected
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className={`font-bold text-sm ${selectedRouteIdx === rt.index ? 'text-blue-900' : 'text-slate-700'}`}>
                      Seçenek {rt.index + 1}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${routeColorString}`}>
                      {routeLabel}
                    </span>
                  </div>
                  <div className={`text-xs flex gap-3 ${selectedRouteIdx === rt.index ? 'text-blue-800' : 'text-slate-500'} mt-1`}>
                    <span>Mesafe: <b>{rt.distanceKm.toFixed(1)} km</b></span>
                    <span>Süre: <b>{(rt.durationMin / 60).toFixed(1)} saat</b></span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
