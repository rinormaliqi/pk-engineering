import React, { useState } from 'react';

interface SolarEstimate {
  systemSize: number;
  annualProduction: number;
  monthlySavings: number;
  annualSavings: number;
  systemCost: number;
  netCost: number;
  paybackPeriod: number;
}

export default function SolarCalculator() {
  const [bill, setBill] = useState<number>(0);
  const [roofArea, setRoofArea] = useState<number>(0);
  const [roofType, setRoofType] = useState<'solete' | 'tjegull' | 'sanduic'>('solete');
  const [consumerType, setConsumerType] = useState<'shtepi' | 'biznes'>('shtepi');
  const [estimate, setEstimate] = useState<SolarEstimate | null>(null);

  const calculateSavings = () => {
    // Çmimet e instaluara për Shqipërinë
    const installPrices = {
      solete: 450, // €/kWp pa TVSH
      tjegull: 700, // €/kWp
      sanduic: 600, // €/kWp
    };

    // Çmimet e energjisë elektrike
    const priceHome = bill <= 700 ? 8.5 : 9.5; // lek/kWh për shtëpi
    const priceBusiness = 18.8; // lek/kWh për biznese të tensionit mesëm

    // Konvertime
    const lekToEuro = 0.0097; // 1 lek ≈ 0.0097 €
    const pricePerKwhEuro = consumerType === 'shtepi' ? priceHome * lekToEuro : priceBusiness * lekToEuro;

    // Kapaciteti i sistemit sipas sipërfaqes së çatisë
    const kwpPerSqm = 0.15; // 1m² ≈ 0.15 kWp
    const systemSize = roofArea * kwpPerSqm;

    // Prodhimi vjetor
    const annualProduction = systemSize * 1400; // 1400 kWh për kWp në vit (mesatare Shqipëri)

    // Kursimet
    const annualSavings = annualProduction * pricePerKwhEuro;
    const monthlySavings = annualSavings / 12;

    // Kosto e sistemit
    const systemCost = systemSize * installPrices[roofType];

    // Supozojmë subvencionim ose përfitim tatimor 10%
    const subsidy = systemCost * 0.1;
    const netCost = systemCost - subsidy;

    // Kthimi i investimit
    const paybackPeriod = netCost / annualSavings;

    setEstimate({
      systemSize,
      annualProduction,
      monthlySavings,
      annualSavings,
      systemCost,
      netCost,
      paybackPeriod,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Llogarit Kursimet e tua Solare ☀️</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Merr një përllogaritje të menjëhershme të kostos së instalimit dhe kursimeve potenciale nga energjia diellore në Shqipëri.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Input Panel */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Kalkulatori i Kursimeve</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fatura mujore (€)</label>
          <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full border rounded-lg p-2 mb-4" />

          <label className="block text-sm font-medium text-gray-700 mb-1">Sipërfaqja e çatisë (m²)</label>
          <input type="number" value={roofArea} onChange={(e) => setRoofArea(Number(e.target.value))} className="w-full border rounded-lg p-2 mb-4" />

          <label className="block text-sm font-medium text-gray-700 mb-1">Lloji i çatisë</label>
          <select value={roofType} onChange={(e) => setRoofType(e.target.value as any)} className="w-full border rounded-lg p-2 mb-4">
            <option value="solete">Solete (450€/kWp)</option>
            <option value="tjegull">Tjegull (700€/kWp)</option>
            <option value="sanduic">Sanduiç (600€/kWp)</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Lloji i konsumatorit</label>
          <select value={consumerType} onChange={(e) => setConsumerType(e.target.value as any)} className="w-full border rounded-lg p-2 mb-6">
            <option value="shtepi">Shtëpi Private</option>
            <option value="biznes">Biznes</option>
          </select>

          <button onClick={calculateSavings} className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">
            Llogarit Kursimet ⚡
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Përllogaritja Jote</h2>
          {estimate ? (
            <div className="space-y-2">
              <div className="flex justify-between"><span>Kapaciteti i sistemit:</span><span className="font-semibold">{estimate.systemSize.toFixed(1)} kWp</span></div>
              <div className="flex justify-between"><span>Prodhimi vjetor:</span><span className="font-semibold">{estimate.annualProduction.toFixed(0)} kWh</span></div>
              <div className="flex justify-between"><span>Kursim mujor:</span><span className="font-semibold">€{estimate.monthlySavings.toFixed(0)}</span></div>
              <div className="flex justify-between"><span>Kursim vjetor:</span><span className="font-semibold">€{estimate.annualSavings.toFixed(0)}</span></div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between"><span>Kosto totale:</span><span className="font-semibold">€{estimate.systemCost.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Subvencion (10%):</span><span className="font-semibold">-€{(estimate.systemCost * 0.1).toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Kosto neto:</span><span className="font-semibold text-green-600">€{estimate.netCost.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Periudha e kthimit:</span><span className="font-semibold">{estimate.paybackPeriod.toFixed(1)} vite</span></div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Plotëso të dhënat për të parë rezultatet.</p>
          )}
        </div>
      </div>

      <div className="mt-10 max-w-3xl text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Supozimet dhe Formulat</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Çmimi i energjisë për shtëpi: 8.5 lek/kWh deri në 700 kWh, 9.5 lek/kWh mbi 700 kWh.</li>
          <li>Çmimi i energjisë për biznese: 18.8 lek/kWh (tension mesëm).</li>
          <li>Konvertimi: 1 lek ≈ 0.0097 €.</li>
          <li>Çmimi i instalimit: Solete 450€/kWp, Tjegull 700€/kWp, Sanduiç 600€/kWp.</li>
          <li>Kapaciteti i sistemit: 1m² ≈ 0.15 kWp.</li>
          <li>Prodhimi vjetor: 1 kWp ≈ 1400 kWh/vit.</li>
          <li>Subvencion i supozuar: 10% e kostos totale.</li>
          <li>Periudha e kthimit = Kosto neto / Kursime vjetore.</li>
        </ul>
      </div>
    </div>
  );
}
