import React, { useState, useEffect } from 'react';
import { Calculator, Users, Building2, IndianRupee, PieChart, CheckCircle, Wallet, ArrowRight } from 'lucide-react';

const RealEstateCalculator = () => {
  // State for inputs
  const [pricePerSqFt, setPricePerSqFt] = useState(4900);
  const [totalSqFt, setTotalSqFt] = useState(1200);
  const [numPeople, setNumPeople] = useState(2);
  const [advancePercent, setAdvancePercent] = useState(20);

  // State for calculated values
  const [totalPrice, setTotalPrice] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  
  const [perPersonTotal, setPerPersonTotal] = useState(0);
  const [perPersonAdvance, setPerPersonAdvance] = useState(0);
  const [perPersonBalance, setPerPersonBalance] = useState(0);

  // Calculate whenever inputs change
  useEffect(() => {
    const price = parseFloat(pricePerSqFt) || 0;
    const area = parseFloat(totalSqFt) || 0;
    // Ensure people is at least 1 to avoid division by zero
    const people = Math.max(1, parseInt(numPeople) || 1); 
    const percent = parseFloat(advancePercent) || 0;

    const total = price * area;
    const advance = total * (percent / 100);
    const balance = total - advance;

    setTotalPrice(total);
    setAdvanceAmount(advance);
    setBalanceAmount(balance);

    setPerPersonTotal(total / people);
    setPerPersonAdvance(advance / people);
    setPerPersonBalance(balance / people);

  }, [pricePerSqFt, totalSqFt, numPeople, advancePercent]);

  // Currency formatter for INR
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">રિયલ એસ્ટેટ કેલ્ક્યુલેટર</h1>
            <p className="text-slate-500 text-sm md:text-base">મિલકતનો ખર્ચ અને પેમેન્ટ શેડ્યૂલની ગણતરી કરો.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* INPUT SECTION */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-5 text-slate-700">
                <Calculator className="w-5 h-5 text-blue-500" />
                મિલકતની વિગતો
              </h2>

              <div className="space-y-5">
                {/* Price Per Sq Ft */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">ભાવ (પ્રતિ ચો.ફૂટ)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      // Allow both string and number inputs for smooth state flow
                      value={String(pricePerSqFt)} 
                      onChange={(e) => setPricePerSqFt(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 transition-all"
                    />
                  </div>
                </div>

                {/* Total Area */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">કુલ વિસ્તાર (ચો.ફૂટ)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={String(totalSqFt)}
                      onChange={(e) => setTotalSqFt(e.target.value)}
                      className="block w-full px-4 py-3 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-5 text-slate-700">
                <Users className="w-5 h-5 text-indigo-500" />
                ગ્રુપ અને શરતો
              </h2>

              <div className="space-y-5">
                {/* Number of People */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-600">રોકાણકારોની સંખ્યા</label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{numPeople} વ્યક્તિ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={String(numPeople)}
                    onChange={(e) => setNumPeople(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                   <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                {/* Advance Payment Percentage */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-600">એડવાન્સ પેમેન્ટ (%)</label>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{advancePercent}% એડવાન્સ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={String(advancePercent)}
                    onChange={(e) => setAdvancePercent(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                    <span>40%</span>
                    <span>60%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Total Project Overview */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg text-white p-6">
              <h3 className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-4">કુલ પ્રોજેક્ટ કિંમત</h3>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {formatCurrency(totalPrice)}
              </div>
              <p className="text-slate-400 text-sm mb-6">
                {totalSqFt} ચો.ફૂટ × {formatCurrency(pricePerSqFt)}/ચો.ફૂટ
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-700 pt-6">
                <div>
                  <p className="text-slate-400 text-xs uppercase mb-1">કુલ એડવાન્સ ({advancePercent}%)</p>
                  <p className="text-xl md:text-2xl font-semibold text-emerald-400">{formatCurrency(advanceAmount)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase mb-1">કુલ બાકી રકમ ({100 - (parseFloat(advancePercent) || 0)}%)</p>
                  <p className="text-xl md:text-2xl font-semibold text-amber-400">{formatCurrency(balanceAmount)}</p>
                </div>
              </div>
            </div>

            {/* Individual Breakdown */}
            <div className="bg-white border border-indigo-100 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-indigo-50/50 p-4 border-b border-indigo-100">
                <h2 className="flex items-center gap-2 text-lg font-bold text-indigo-900">
                  <Users className="w-5 h-5" />
                  દરેક વ્યક્તિનો હિસ્સો
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-slate-500 text-sm">કુલ ખર્ચમાં ભાગ</p>
                    <p className="text-3xl font-bold text-slate-800">{formatCurrency(perPersonTotal)}</p>
                  </div>
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                    1/{numPeople}
                  </div>
                </div>

                {/* Payment Timeline Visual */}
                <div className="relative pt-4 pb-8">
                    <div className="flex mb-2 items-center justify-between text-sm font-medium">
                        <span className="text-emerald-700 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> એડવાન્સ</span>
                        <span className="text-amber-700 flex items-center gap-1"><Wallet className="w-4 h-4"/> બાકી</span>
                    </div>
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-500" 
                          style={{ width: `${advancePercent}%` }}
                          aria-label={`Advance payment percentage: ${advancePercent}%`}
                        ></div>
                        <div 
                          className="bg-amber-400 h-full transition-all duration-500" 
                          style={{ width: `${100 - (parseFloat(advancePercent) || 0)}%` }}
                          aria-label={`Balance payment percentage: ${100 - (parseFloat(advancePercent) || 0)}%`}
                        ></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-emerald-800 font-medium text-sm mb-1">તમારે અત્યારે ભરવાના</p>
                            <p className="text-emerald-600 text-xs mb-2">એડવાન્સ ભાગ</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-2xl font-bold text-emerald-700">{formatCurrency(perPersonAdvance)}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-amber-800 font-medium text-sm mb-1">તમારે પછી ભરવાના</p>
                            <p className="text-amber-600 text-xs mb-2">બાકી રહેલો ભાગ</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-2xl font-bold text-amber-700">{formatCurrency(perPersonBalance)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>ગણતરી: {totalSqFt} ચો.ફૂટ {numPeople} લોકો વચ્ચે સમાન રીતે વહેંચાયેલ છે.</p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateCalculator;