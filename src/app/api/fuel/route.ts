import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city'); 
  
  if (!city) {
    return NextResponse.json({ error: "Şehir parametresi eksik." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://hasanadiguzel.com.tr/api/akaryakit/sehir=${city}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`API Hatası: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.error) {
      return NextResponse.json({ error: data.error.text }, { status: 400 });
    }

    const pricesObj = data.data;
    if (!pricesObj) {
      throw new Error("Fiyat verisi bulunamadı.");
    }
    
    // Get the first entry of the data object
    const firstKey = Object.keys(pricesObj)[0];
    const prices = pricesObj[firstKey];

    // Parser helper: "43,50" -> 43.50
    const parsePrice = (strStr?: string) => {
      if (!strStr || strStr === "-") return 0;
      return parseFloat(strStr.replace(",", "."));
    }

    const gasolinePrice = prices["Motorin(Excellium_Eurodiesel)_TL/lt"] ? parsePrice(prices["Motorin(Excellium_Eurodiesel)_TL/lt"]) : parsePrice(prices["Kursunsuz_95(Excellium95)_TL/lt"]);
    const dieselPrice = prices["Motorin(Eurodiesel)_TL/lt"] ? parsePrice(prices["Motorin(Eurodiesel)_TL/lt"]) : 0;
    
    // Also keeping a fallback for LPG if needed
    const lpgKey = Object.keys(prices).find(k => k.toLowerCase().includes("otogaz"));
    const lpgPrice    = lpgKey      ? parsePrice(prices[lpgKey as keyof typeof prices]) : 0;

    return NextResponse.json({
      city: data.qualifications?.city || city,
      gasoline: gasolinePrice,
      diesel: dieselPrice,
      lpg: lpgPrice,
      raw: prices
    });
  } catch (error: any) {
    console.error("Fuel API Proxy Error:", error);
    return NextResponse.json({ error: "Akaryakıt fiyatları çekilemedi." }, { status: 500 });
  }
}
