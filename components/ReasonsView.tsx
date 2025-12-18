
import React, { useState } from 'react';
import { UNAVAILABLE_REASONS, GLOBAL_STATS, CHART_COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { AlertCircle, ArrowUpDown, ArrowUp, ArrowDown, MousePointerClick, LayoutList } from 'lucide-react';

interface ReasonsViewProps {
  onSelectReason?: (reason: string) => void;
}

const ReasonsView: React.FC<ReasonsViewProps> = ({ onSelectReason }) => {
  // Sort Logic for the Table
  const [sortKey, setSortKey] = useState<'reason' | 'count' | 'percentage'>('count');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Prepare data with percentage
  const totalUnavailable = GLOBAL_STATS.unavailable;
  const enrichedData = UNAVAILABLE_REASONS.map(item => ({
    ...item,
    percentage: ((item.count / totalUnavailable) * 100).toFixed(1),
    numericPercentage: (item.count / totalUnavailable) * 100
  })).sort((a, b) => b.count - a.count);

  // Handle Sort Request
  const requestSort = (key: 'reason' | 'count' | 'percentage') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDir === 'asc') {
      direction = 'desc';
    }
    setSortKey(key);
    setSortDir(direction);
  };

  const sortedTableData = [...enrichedData].sort((a, b) => {
    const valA = keySelector(a, sortKey);
    const valB = keySelector(b, sortKey);

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  function keySelector(obj: any, key: string) {
    if (key === 'percentage') return obj.numericPercentage;
    return obj[key];
  }

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ArrowUpDown className="w-3 h-3 text-slate-400" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-600" /> : <ArrowDown className="w-3 h-3 text-indigo-600" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Summary Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-700 rounded-lg shadow-lg shadow-indigo-100">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Análise de Motivos (Corporação)</h2>
              <p className="text-slate-500 mt-1 max-w-2xl text-xs font-black uppercase tracking-widest leading-relaxed">
                  Monitoramento de <span className="text-indigo-600">{GLOBAL_STATS.unavailable}</span> policiais indisponíveis. 
                  O motivo principal é "<span className="text-indigo-600 uppercase italic font-black">{enrichedData[0].reason}</span>".
              </p>
            </div>
        </div>
        {onSelectReason && (
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 uppercase">
              <MousePointerClick className="w-4 h-4" />
              Clique nas barras para detalhar OPMs
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Chart Section - Distribuição de Motivos */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[550px] flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
             <div className="p-2 bg-indigo-50 rounded-lg">
               <LayoutList className="w-4 h-4 text-indigo-600" />
             </div>
             <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Contexto: Distribuição de Motivos</h3>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={enrichedData}
                margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
              >
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                    dataKey="reason" 
                    type="category" 
                    width={160} 
                    tick={{fontSize: 10, fill: '#1e293b', fontWeight: 900}}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip 
                     cursor={{ fill: '#f5f3ff' }}
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Bar 
                    dataKey="count" 
                    name="Quantidade" 
                    radius={[0, 6, 6, 0]}
                    barSize={28}
                    onClick={(data) => onSelectReason && onSelectReason(data.reason)}
                    className={onSelectReason ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                >
                   <LabelList dataKey="count" position="right" fill="#1e293b" fontSize={11} fontWeight="900" offset={10} />
                   {enrichedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                        className="cursor-pointer"
                      />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center pt-4 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4 text-indigo-500 animate-pulse" />
                  DICA: Clique na barra para detalhar quais unidades possuem este motivo
              </p>
          </div>
        </div>

        {/* Detailed Table Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[550px] overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
            <LayoutList className="w-4 h-4 text-slate-400" />
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Detalhamento dos Motivos</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => requestSort('reason')}
                  >
                    <div className="flex items-center gap-1">Motivo {getSortIcon('reason')}</div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => requestSort('count')}
                  >
                    <div className="flex items-center justify-end gap-1">Qtd. {getSortIcon('count')}</div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => requestSort('percentage')}
                  >
                     <div className="flex items-center justify-end gap-1">Impacto {getSortIcon('percentage')}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {sortedTableData.map((item, idx) => {
                  const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === item.reason);
                  const color = CHART_COLORS[originalIndex % CHART_COLORS.length];
                  
                  return (
                    <tr 
                      key={idx} 
                      className={`hover:bg-indigo-50/50 transition-colors group ${onSelectReason ? 'cursor-pointer' : ''}`}
                      onClick={() => onSelectReason && onSelectReason(item.reason)}
                    >
                      <td className="px-6 py-4 text-[11px] font-black text-slate-700 uppercase group-hover:text-indigo-700">{item.reason}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">{item.count}</td>
                      <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end gap-1">
                              <span className="text-[10px] font-black text-slate-500">{item.percentage}%</span>
                              <div className="w-16 bg-slate-100 rounded-full h-1 overflow-hidden">
                                  <div 
                                      className="h-full rounded-full" 
                                      style={{ width: `${item.percentage}%`, backgroundColor: color }}
                                  ></div>
                              </div>
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Análise de Indisponibilidade Pro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsView;
