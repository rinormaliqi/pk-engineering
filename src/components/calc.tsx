// SolarCalculatorKosovo.tsx
import React, { useMemo, useState } from "react";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

type ConsumerType = "household" | "business";
type BusinessVoltage = "medium" | "high";

export default function SolarCalculatorKosovo() {
  const { t } = useTranslation();
  const DEFAULT_PRODUCTION_PER_KWP = 1400;
  const KPW_PER_M2 = 0.18;

  // Çmimet e energjisë elektrike në Kosovë (€/kWh)
  const HOUSEHOLD_PRICE_PER_KWH = 0.085; // 8.5 cent € për kWh për familje
  const BUSINESS_PRICES = {
    medium: 0.085, // 8.5 cent € për kWh për biznese me tension të mesëm
    high: 0.075    // 7.5 cent € për kWh për biznese me tension të lartë
  };

  const INSTALL_OPTIONS = [
    { 
      key: "tile", 
      label: t('calculator.installOptions.tile.label'), 
      priceEurPerKwp: 450, 
      description: t('calculator.installOptions.tile.description') 
    },
    { 
      key: "sandwich", 
      label: t('calculator.installOptions.sandwich.label'), 
      priceEurPerKwp: 600, 
      description: t('calculator.installOptions.sandwich.description') 
    },
    { 
      key: "tileRoof", 
      label: t('calculator.installOptions.tileRoof.label'), 
      priceEurPerKwp: 700, 
      description: t('calculator.installOptions.tileRoof.description') 
    },
  ];

  const [consumerType, setConsumerType] = useState<ConsumerType>("household");
  const [businessVoltage, setBusinessVoltage] = useState<BusinessVoltage>("medium");
  const [monthlyBill, setMonthlyBill] = useState<string>("100");
  const [roofArea, setRoofArea] = useState<string>("30");
  const [installKey, setInstallKey] = useState<string>("sandwich");
  const [grantEuro, setGrantEuro] = useState<string>("0");
  const [productionPerKwp, setProductionPerKwp] = useState<string>("1400");

  // Funksione për trajtimin e inputit
  const handleNumberInput = (value: string, setter: (val: string) => void) => {
    const cleaned = value.replace(/[^\d.-]/g, '');
    
    if (cleaned === '' || cleaned === '-') {
      setter('0');
      return;
    }
    
    let processed = cleaned;
    if (processed.length > 1 && processed[0] === '0' && processed[1] !== '.') {
      processed = processed.replace(/^0+/, '');
      if (processed === '') processed = '0';
    }
    
    const parts = processed.split('.');
    if (parts.length > 2) {
      processed = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setter(processed);
  };

  const parseSafeNumber = (value: string): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // Vlerat numerike të sigurta për llogaritje
  const monthlyBillNum = useMemo(() => parseSafeNumber(monthlyBill), [monthlyBill]);
  const roofAreaNum = useMemo(() => parseSafeNumber(roofArea), [roofArea]);
  const grantEuroNum = useMemo(() => parseSafeNumber(grantEuro), [grantEuro]);
  const productionPerKwpNum = useMemo(() => parseSafeNumber(productionPerKwp), [productionPerKwp]);

  // Çmimi i energjisë bazuar në llojin e konsumatorit
  const pricePerKwhEUR = useMemo(() => {
    if (consumerType === "business") {
      return BUSINESS_PRICES[businessVoltage];
    }
    return HOUSEHOLD_PRICE_PER_KWH;
  }, [consumerType, businessVoltage]);

  const pricePerKwpEur = useMemo(() => {
    const f = INSTALL_OPTIONS.find((i) => i.key === installKey);
    return f ? f.priceEurPerKwp : INSTALL_OPTIONS[0].priceEurPerKwp;
  }, [installKey]);

  // Llogaritjet
  const monthlyConsumptionKwh = useMemo(() => 
    pricePerKwhEUR > 0 ? monthlyBillNum / pricePerKwhEUR : 0, 
    [monthlyBillNum, pricePerKwhEUR]
  );

  const annualConsumptionKwh = useMemo(() => monthlyConsumptionKwh * 12, [monthlyConsumptionKwh]);
  const requiredKwp = useMemo(() => 
    productionPerKwpNum <= 0 ? 0 : annualConsumptionKwh / productionPerKwpNum, 
    [annualConsumptionKwh, productionPerKwpNum]
  );
  const maxKwpByArea = useMemo(() => roofAreaNum * KPW_PER_M2, [roofAreaNum]);
  const systemKwp = useMemo(() => Math.max(0, Math.min(requiredKwp, maxKwpByArea)), [requiredKwp, maxKwpByArea]);
  const annualProductionKwh = useMemo(() => systemKwp * productionPerKwpNum, [systemKwp, productionPerKwpNum]);
  const annualSavingsEUR = useMemo(() => annualProductionKwh * pricePerKwhEUR, [annualProductionKwh, pricePerKwhEUR]);
  const grossCostEuro = useMemo(() => systemKwp * pricePerKwpEur, [systemKwp, pricePerKwpEur]);
  const netCostEuro = useMemo(() => Math.max(0, grossCostEuro - grantEuroNum), [grossCostEuro, grantEuroNum]);
  const paybackYears = useMemo(() => 
    annualSavingsEUR <= 0 ? Infinity : netCostEuro / annualSavingsEUR, 
    [netCostEuro, annualSavingsEUR]
  );
  const limitedByRoof = useMemo(() => requiredKwp > maxKwpByArea + 1e-6, [requiredKwp, maxKwpByArea]);
  
  const fmt = (v: number) => (isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—");
  const fmtInt = (v: number) => Math.round(v).toLocaleString();

  // Stilet e printimit
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-container,
        .print-container * {
          visibility: visible;
        }
        .print-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: white;
          padding: 20px;
        }
        .no-print {
          display: none !important;
        }
        .print-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #059669;
          padding-bottom: 20px;
        }
        .print-results {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .print-section {
          background: #f9fafb;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById('printable-calculator');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PK ENGINEERING GROUP', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('RAPORT KURSIMESH SOLARE - KOSOVË', 105, 25, { align: 'center' });
    
    // Data
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Data: ${new Date().toLocaleDateString('sq-AL')}`, 14, 50);
    doc.text(`Koha: ${new Date().toLocaleTimeString('sq-AL')}`, 14, 56);
    
    let y = 70;
    
    // Të dhënat e klientit
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TË DHËNAT E KLIENTIT', 14, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Lloji i klientit: ${consumerType === 'household' ? 'Shtëpi' : 'Biznes'}`, 14, y);
    y += 6;
    doc.text(`Fatura mujore: ${monthlyBill} €`, 14, y);
    y += 6;
    doc.text(`Sipërfaqja e çatisë: ${roofArea} m²`, 14, y);
    y += 6;
    doc.text(`Lloji i instalimit: ${INSTALL_OPTIONS.find(opt => opt.key === installKey)?.label || ''}`, 14, y);
    y += 6;
    doc.text(`Subvencion: ${grantEuro} €`, 14, y);
    y += 15;
    
    // Rezultatet kryesore
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('REZULTATET KRYESORE', 14, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Kolona e majtë
    doc.text(`Madhësia e sistemit: ${fmt(systemKwp)} kWp`, 14, y);
    y += 6;
    doc.text(`Prodhim vjetor: ${fmtInt(annualProductionKwh)} kWh`, 14, y);
    y += 6;
    doc.text(`Konsumi mujor: ${fmtInt(monthlyConsumptionKwh)} kWh`, 14, y);
    y += 6;
    doc.text(`Çmimi i energjisë: ${fmt(pricePerKwhEUR * 100)} cent/kWh`, 14, y);
    y += 15;
    
    // Kolona e djathtë
    const rightColumnX = 110;
    let rightY = 80;
    doc.text(`Kursim mujor: €${fmt(annualSavingsEUR / 12)}`, rightColumnX, rightY);
    rightY += 6;
    doc.text(`Kursim vjetor: €${fmt(annualSavingsEUR)}`, rightColumnX, rightY);
    rightY += 6;
    doc.text(`Periudha e kthimit: ${isFinite(paybackYears) ? fmt(paybackYears) + ' vite' : '—'}`, rightColumnX, rightY);
    rightY += 15;
    
    // Investimi
    y = Math.max(y, rightY);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DETAJET E INVESTIMIT', 14, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Kosto e sistemit: €${fmt(grossCostEuro)}`, 14, y);
    y += 6;
    doc.text(`Subvencion: - €${fmt(grantEuroNum)}`, 14, y);
    y += 6;
    doc.text(`Kosto neto: €${fmt(netCostEuro)}`, 14, y);
    y += 6;
    
    y += 10;
    
    // Shënime
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SHËNIME', 14, y);
    y += 10;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const notes = [
      '• Ky raport është gjeneruar automatikisht dhe bazohet në të dhënat e pranuara',
      '• Vlerësimet bazohen në çmimet aktuale të energjisë në Kosovë',
      '• Për një analizë të detajuar, kontaktoni ekspertët tanë',
      `• Telefon: +383 44 123 456 | Email: info@pkengineering.com`
    ];
    
    notes.forEach(note => {
      doc.text(note, 14, y);
      y += 5;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('PK ENGINEERING GROUP - Zgjidhje të besueshme për energjinë diellore në Kosovë', 105, 290, { align: 'center' });
    
    doc.save(`Raport_Solar_PK_Engineering_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const resetCalculator = () => {
    setMonthlyBill("100");
    setRoofArea("30");
    setInstallKey("sandwich");
    setGrantEuro("0");
    setProductionPerKwp("1400");
  };

  return (
    <>
      {/* Printable Content (i fshehur për përdoruesit normal) */}
      <div id="printable-calculator" style={{ display: 'none' }}>
        <div className="print-container">
          <div className="print-header">
            <h1>PK ENGINEERING GROUP</h1>
            <h2>RAPORT KURSIMESH SOLARE - KOSOVË</h2>
            <p>Data: {new Date().toLocaleDateString('sq-AL')}</p>
          </div>
          
          <div className="print-section">
            <h3>Të Dhënat e Klientit</h3>
            <p><strong>Lloji:</strong> {consumerType === 'household' ? 'Shtëpi' : 'Biznes'}</p>
            <p><strong>Fatura mujore:</strong> {monthlyBill} €</p>
            <p><strong>Sipërfaqja e çatisë:</strong> {roofArea} m²</p>
            <p><strong>Lloji i instalimit:</strong> {INSTALL_OPTIONS.find(opt => opt.key === installKey)?.label}</p>
            {grantEuroNum > 0 && <p><strong>Subvencion:</strong> {grantEuro} €</p>}
          </div>

          <div className="print-results">
            <div className="print-section">
              <h3>Specifikimet e Sistemit</h3>
              <p><strong>Madhësia e sistemit:</strong> {fmt(systemKwp)} kWp</p>
              <p><strong>Prodhim vjetor:</strong> {fmtInt(annualProductionKwh)} kWh</p>
              <p><strong>Konsumi mujor:</strong> {fmtInt(monthlyConsumptionKwh)} kWh</p>
              <p><strong>Çmimi i energjisë:</strong> {fmt(pricePerKwhEUR * 100)} cent/kWh</p>
            </div>

            <div className="print-section">
              <h3>Kursimet</h3>
              <p><strong>Kursim mujor:</strong> €{fmt(annualSavingsEUR / 12)}</p>
              <p><strong>Kursim vjetor:</strong> €{fmt(annualSavingsEUR)}</p>
              <p><strong>Periudha e kthimit:</strong> {isFinite(paybackYears) ? fmt(paybackYears) + ' vite' : '—'}</p>
              {limitedByRoof && <p style={{color: '#d97706'}}><strong>⚠ Kufizuar nga çatia</strong></p>}
            </div>
          </div>

          <div className="print-section">
            <h3>Detajet e Investimit</h3>
            <p><strong>Kosto e sistemit:</strong> €{fmt(grossCostEuro)}</p>
            {grantEuroNum > 0 && <p><strong>Subvencion:</strong> - €{fmt(grantEuroNum)}</p>}
            <p><strong>Kosto neto:</strong> €{fmt(netCostEuro)}</p>
          </div>

          <div className="print-section">
            <h3>Kontakt</h3>
            <p><strong>PK ENGINEERING GROUP</strong></p>
            <p>📞 +383 44 123 456</p>
            <p>✉️ info@pkengineering.com</p>
          </div>
        </div>
      </div>

      {/* UI Normal */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('calculator.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INPUT CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                {t('calculator.input.title')}
              </h2>
              <button
                onClick={resetCalculator}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('calculator.input.reset')}
              </button>
            </div>

            {/* Lloji i Konsumatorit */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.clientType')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${
                      consumerType === "household" 
                      ? "border-green-500 bg-green-50 text-green-700 font-medium" 
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => setConsumerType("household")}
                  >
                    {t('calculator.input.household')}
                  </button>
                  <button
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${
                      consumerType === "business" 
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" 
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => setConsumerType("business")}
                  >
                    {t('calculator.input.business')}
                  </button>
                </div>
              </div>
            </div>

            {consumerType === "business" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.connectionType')}
                  <span className="text-xs text-gray-500 ml-1">{t('calculator.input.connectionNote')}</span>
                </label>
                <select 
                  value={businessVoltage} 
                  onChange={(e) => setBusinessVoltage(e.target.value as BusinessVoltage)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                >
                  <option value="medium">{t('calculator.input.mediumVoltage')} (8.5 cent/kWh)</option>
                  <option value="high">{t('calculator.input.highVoltage')} (7.5 cent/kWh)</option>
                </select>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.monthlyBill')}
                  <span className="text-xs text-gray-500 ml-1">{t('calculator.input.monthlyBillNote')}</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    value={monthlyBill} 
                    onChange={(e) => handleNumberInput(e.target.value, setMonthlyBill)} 
                    placeholder="100"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Çmimi aktual i energjisë: {fmt(pricePerKwhEUR * 100)} cent/kWh
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.roofArea')}
                  <span className="text-xs text-gray-500 ml-1">{t('calculator.input.roofAreaNote')}</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    value={roofArea} 
                    onChange={(e) => handleNumberInput(e.target.value, setRoofArea)} 
                    placeholder="30"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    📐
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    m²
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.installationType')}
                  <span className="text-xs text-gray-500 ml-1">{t('calculator.input.installationTypeNote')}</span>
                </label>
                <select 
                  value={installKey} 
                  onChange={(e) => setInstallKey(e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                >
                  {INSTALL_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label} - €{opt.priceEurPerKwp}/kWp • {opt.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calculator.input.grant')}
                  <span className="text-xs text-gray-500 ml-1">{t('calculator.input.grantNote')}</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    value={grantEuro} 
                    onChange={(e) => handleNumberInput(e.target.value, setGrantEuro)} 
                    placeholder="0"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    💰
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    €
                  </div>
                </div>
              </div>

              {/* Fushat e avancuara */}
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('calculator.input.advancedSettings')}
                </summary>
                <div className="mt-3 space-y-4 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('calculator.input.productionPerKwp')}
                      <span className="text-xs text-gray-500 ml-1">{t('calculator.input.productionPerKwpNote')}</span>
                    </label>
                    <input 
                      type="text" 
                      inputMode="decimal"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                      value={productionPerKwp} 
                      onChange={(e) => handleNumberInput(e.target.value, setProductionPerKwp)} 
                    />
                  </div>
                </div>
              </details>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-blue-700">
                  <strong>{t('calculator.input.tipTitle')}</strong> {t('calculator.input.tipText')}
                </div>
              </div>
            </div>
          </div>

          {/* RESULT CARD */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {t('calculator.result.title')}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{t('calculator.result.systemSize')}</div>
                <div className="text-2xl font-bold text-gray-900">{fmt(systemKwp)} kWp</div>
                {limitedByRoof && (
                  <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t('calculator.roofLimited')}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{t('calculator.result.annualProduction')}</div>
                <div className="text-2xl font-bold text-gray-900">{fmtInt(annualProductionKwh)} kWh</div>
                <div className="text-xs text-gray-400 mt-1">{t('calculator.result.cleanEnergy')}</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{t('calculator.result.monthlySavings')}</div>
                <div className="text-2xl font-bold text-emerald-600">
                  €{fmt(annualSavingsEUR / 12)}
                </div>
                <div className="text-xs text-gray-400 mt-1">{t('calculator.result.onYourBill')}</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{t('calculator.result.annualSavings')}</div>
                <div className="text-2xl font-bold text-emerald-600">
                  €{fmt(annualSavingsEUR)}
                </div>
                <div className="text-xs text-gray-400 mt-1">{t('calculator.result.totalPerYear')}</div>
              </div>
            </div>

            {/* Investment Details */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 mb-4">
              <h3 className="font-semibold text-gray-900 mb-4">{t('calculator.result.investmentDetails')}</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t('calculator.result.systemCost')}</span>
                  <span className="font-medium">€{fmt(grossCostEuro)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t('calculator.result.grantDeduction')}</span>
                  <span className="font-medium text-green-600">- €{fmt(grantEuroNum)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">{t('calculator.result.netCost')}</span>
                  <span className="text-xl font-bold text-gray-900">€{fmt(netCostEuro)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>{t('calculator.result.energyPriceUsed')}: <strong>{fmt(pricePerKwhEUR * 100)} cent/kWh</strong></div>
                  <div>{t('calculator.result.estimatedMonthlyConsumption')}: <strong>{fmtInt(monthlyConsumptionKwh)} kWh</strong></div>
                </div>
              </div>

              {/* Payback Period */}
              <div className="mt-4">
                <div className={`text-center py-3 rounded-xl ${
                  isFinite(paybackYears) && paybackYears <= 5 
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}>
                  <div className="text-sm font-medium">{t('calculator.result.paybackPeriod')}</div>
                  <div className="text-xl font-bold mt-1">
                    {isFinite(paybackYears) ? `${fmt(paybackYears)} vjet` : "—"}
                  </div>
                  {isFinite(paybackYears) && paybackYears <= 5 && (
                    <div className="text-xs mt-1">{t('calculator.result.excellentInvestment')}</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button 
                  onClick={handlePrint}
                  className="no-print flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl py-3 px-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  {t('calculator.result.printReport')}
                </button>
                <button 
                  onClick={generatePDF} 
                  className="no-print flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 px-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('calculator.result.downloadPDF')}
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('calculator.result.howItWorks')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('calculator.result.howItWorksText')}
              </p>
              <div className="mt-3 text-xs text-gray-500">
                {t('calculator.result.tip')}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{t('calculator.cta.title')}</h3>
            <p className="mb-4 opacity-90">{t('calculator.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/38344123456"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-400 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                {t('calculator.cta.phone')}
              </a>
              <a href="mailto:rmaliqi75@gmail.com" className="bg-white text-blue-400 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                {t('calculator.cta.email')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}