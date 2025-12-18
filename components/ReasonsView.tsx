
import React, { useState } from 'react';
import { UNAVAILABLE_REASONS, GLOBAL_STATS, CHART_COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, Line } from 'recharts';
import { AlertCircle, ArrowUpDown, ArrowUp, ArrowDown, MousePointerClick } from 'lucide-react';

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
  }));

  // Calculate Pareto Cumulative Data
  let cumulative = 0;
  const paretoData = [...enrichedData]
    .sort((a, b) => b.count - a.count)
    .map(item => {
      cumulative += item.numericPercentage;
      return {
        ...item,
        cumulative: cumulative.toFixed(1)
      };
    });

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
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
            <h2 className="text-lg font-bold text-slate-900">Análise de Indisponibilidade</h2>
            <p className="text-slate-600 mt-1">
                Atualmente existem <span className="font-bold text-indigo-600">{GLOBAL_STATS.unavailable}</span> policiais indisponíveis. 
                O motivo principal, "{paretoData[0].reason}", representa <span className="font-bold">{paretoData[0].percentage}%</span> deste total.
            </p>
            </div>
        </div>
        {onSelectReason && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-indigo-100">
              <MousePointerClick className="w-4 h-4" />
              Clique no gráfico/tabela para detalhar OPMs
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart Section - Pareto / Analysis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[500px] flex flex-col">
          <div className="mb-4">
             <h3 className="font-semibold text-slate-800">Distribuição e Impacto (Pareto)</h3>
             <p className="text-xs text-slate-500">Barras coloridas: Quantidade Absoluta | Linha: % Acumulado</p>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={paretoData}
                margin={{ top: 20, right: 20, bottom: 60, left: 0 }}
              >
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                    dataKey="reason" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    tick={{fontSize: 10, fill: '#64748b', fontWeight: 500}}
                    height={80}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis yAxisId="right" orientation="right" unit="%" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                    yAxisId="left" 
                    dataKey="count" 
                    name="Quantidade" 
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => onSelectReason && onSelectReason(data.reason)}
                    className={onSelectReason ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                >
                   {paretoData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                        className="cursor-pointer"
                      />
                    ))}
                </Bar>
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="cumulative" 
                  name="% Acumulada" 
                  stroke="#334155" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#334155', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Detalhamento dos Motivos</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                    onClick={() => requestSort('reason')}
                  >
                    <div className="flex items-center gap-1">Motivo {getSortIcon('reason')}</div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                    onClick={() => requestSort('count')}
                  >
                    <div className="flex items-center justify-end gap-1">Qtd. {getSortIcon('count')}</div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                    onClick={() => requestSort('percentage')}
                  >
                     <div className="flex items-center justify-end gap-1">Impacto (%) {getSortIcon('percentage')}</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Visual
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedTableData.map((item, idx) => {
                  // Find original index to get original color
                  const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === item.reason);
                  const color = CHART_COLORS[originalIndex % CHART_COLORS.length];
                  
                  return (
                    <tr 
                      key={idx} 
                      className={`hover:bg-slate-50 transition-colors ${onSelectReason ? 'cursor-pointer' : ''}`}
                      onClick={() => onSelectReason && onSelectReason(item.reason)}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{item.reason}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">{item.count}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">{item.percentage}%</td>
                      <td className="px-6 py-4 text-sm text-slate-600 w-32">
                          <div className="w-full bg-slate-100 rounded-full h-2">
                              <div 
                                  className="h-2 rounded-full" 
                                  style={{ width: `${item.percentage}%`, backgroundColor: color }}
                              ></div>
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsView;
