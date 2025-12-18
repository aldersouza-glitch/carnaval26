import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { OPMS_DATA } from '../constants';
import ReasonChart from './ReasonChart';
import { AlertTriangle, TrendingDown, MousePointerClick } from 'lucide-react';

interface TopUnavailableViewProps {
  onSelectOPM?: (opmName: string) => void;
}

const TopUnavailableView: React.FC<TopUnavailableViewProps> = ({ onSelectOPM }) => {
  const top8Data = [...OPMS_DATA]
    .sort((a, b) => b.unavailable - a.unavailable)
    .slice(0, 8);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
               <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Top 8 OPMs com Maior Indisponibilidade</h2>
              <p className="text-sm text-slate-500">Unidades que demandam maior atenção.</p>
            </div>
          </div>
          {onSelectOPM && (
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
              <MousePointerClick className="w-4 h-4" />
              Clique na barra para detalhes
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={top8Data} 
                      layout="vertical" 
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={100} 
                            tick={{fontSize: 11, fill: '#475569', fontWeight: 500}} 
                            interval={0}
                        />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                          dataKey="unavailable" 
                          name="Indisponíveis" 
                          radius={[0, 4, 4, 0]} 
                          barSize={32}
                          onClick={(data) => onSelectOPM && onSelectOPM(data.name)}
                          className="cursor-pointer"
                        >
                            <LabelList dataKey="unavailable" position="right" fill="#64748b" fontSize={12} fontWeight="bold" />
                            {top8Data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill="#3b82f6" 
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                              />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* List/Table Mini */}
            <div className="bg-slate-50 rounded-lg p-4 h-[400px] overflow-y-auto border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide flex justify-between items-center">
                    <span>Ranking Detalhado</span>
                    <span className="text-xs text-slate-400 font-normal">Total / Indisp. / %</span>
                </h3>
                <div className="space-y-3">
                    {top8Data.map((item, idx) => {
                         const percent = item.total > 0 ? ((item.unavailable / item.total) * 100).toFixed(1) : '0.0';
                         return (
                            <div 
                              key={item.name} 
                              className="flex flex-col p-3 bg-white rounded shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                              onClick={() => onSelectOPM && onSelectOPM(item.name)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold mr-2 ${idx < 3 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.name}</span>
                                    </div>
                                    <div className="font-bold text-blue-600 text-lg">{item.unavailable}</div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${percent}%`}}></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Total: {item.total}</span>
                                    <span>{percent}% comprometido</span>
                                </div>
                            </div>
                         );
                    })}
                </div>
            </div>
        </div>
      </div>

      {/* Context Section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
             <AlertTriangle className="w-5 h-5 text-indigo-500" />
             <h3 className="font-bold text-slate-800">Contexto: Distribuição de Motivos (Corporação)</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6 max-w-3xl">
            O gráfico abaixo apresenta os principais motivos de indisponibilidade em toda a corporação. 
            Embora cada OPM tenha sua particularidade, estes são os fatores predominantes que impactam as unidades listadas acima.
          </p>
          <ReasonChart />
      </div>
    </div>
  );
};

export default TopUnavailableView;