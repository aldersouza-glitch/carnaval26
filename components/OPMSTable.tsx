
import React, { useState } from 'react';
import { OPMS_DATA } from '../constants';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Building2, MousePointerClick } from 'lucide-react';
import { OPMSData } from '../types';

type SortKey = keyof OPMSData | 'percentage';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

interface OPMSTableProps {
  onSelectOPM: (name: string) => void;
}

const OPMSTable: React.FC<OPMSTableProps> = ({ onSelectOPM }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'unavailable', direction: 'desc' });

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: SortKey) => {
    if (sortConfig.key !== name) return <ArrowUpDown className="w-3 h-3 text-slate-400" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-blue-600" /> 
      : <ArrowDown className="w-3 h-3 text-blue-600" />;
  };

  const sortedData = [...OPMS_DATA].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    let aValue: number | string = 0;
    let bValue: number | string = 0;

    if (sortConfig.key === 'percentage') {
      aValue = a.total > 0 ? (a.unavailable / a.total) : 0;
      bValue = b.total > 0 ? (b.unavailable / b.total) : 0;
    } else {
      aValue = a[sortConfig.key as keyof OPMSData];
      bValue = b[sortConfig.key as keyof OPMSData];
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center bg-slate-50 gap-4">
        <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            <div>
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest leading-none">Mapa Geral de Unidades</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Clique em uma linha para detalhar a OPM</p>
            </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar unidade..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th scope="col" onClick={() => requestSort('name')} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-1">OPM {getSortIcon('name')}</div>
              </th>
              <th scope="col" onClick={() => requestSort('available')} className="px-6 py-4 text-center text-[10px] font-black text-emerald-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                 <div className="flex items-center justify-center gap-1">Disponível {getSortIcon('available')}</div>
              </th>
              <th scope="col" onClick={() => requestSort('special')} className="px-6 py-4 text-center text-[10px] font-black text-blue-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                 <div className="flex items-center justify-center gap-1">Filho Especial {getSortIcon('special')}</div>
              </th>
              <th scope="col" onClick={() => requestSort('unavailable')} className="px-6 py-4 text-center text-[10px] font-black text-red-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center gap-1">Indisponível {getSortIcon('unavailable')}</div>
              </th>
              <th scope="col" onClick={() => requestSort('percentage')} className="px-6 py-4 text-center text-[10px] font-black text-amber-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center gap-1">% Comprometido {getSortIcon('percentage')}</div>
              </th>
              <th scope="col" onClick={() => requestSort('total')} className="px-6 py-4 text-center text-[10px] font-black text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center gap-1">Total {getSortIcon('total')}</div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 font-mono text-xs">
            {sortedData.map((item) => {
              const percent = ((item.unavailable / item.total) * 100).toFixed(1);
              return (
                <tr 
                  key={item.name} 
                  className="hover:bg-blue-50 transition-colors cursor-pointer group"
                  onClick={() => onSelectOPM(item.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-black text-slate-900 group-hover:text-blue-700">{item.name}</td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600 bg-emerald-50/20">{item.available}</td>
                  <td className="px-6 py-4 text-center font-bold text-blue-500 bg-blue-50/30">{item.special}</td>
                  <td className="px-6 py-4 text-center font-bold text-red-600 bg-red-50/20">{item.unavailable}</td>
                  <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                          <span className={`font-black ${Number(percent) > 50 ? 'text-red-600' : 'text-slate-600'}`}>{percent}%</span>
                          <div className="w-16 bg-slate-100 rounded-full h-1 overflow-hidden">
                              <div className={`h-full ${Number(percent) > 50 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }}></div>
                          </div>
                      </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-slate-900 bg-slate-50/50 border-l border-slate-100">{item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OPMSTable;
