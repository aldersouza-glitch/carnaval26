import React, { useState } from 'react';
import { OPMS_DATA } from '../constants';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { OPMSData } from '../types';

type SortKey = keyof OPMSData | 'percentage';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const OPMSTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'available', direction: 'desc' });

  // Handle Sorting
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

  // Filter and Sort Data
  const sortedData = [...OPMS_DATA].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    let aValue: number | string = 0;
    let bValue: number | string = 0;

    if (sortConfig.key === 'percentage') {
      aValue = a.total > 0 ? (a.available / a.total) : 0;
      bValue = b.total > 0 ? (b.available / b.total) : 0;
    } else {
      aValue = a[sortConfig.key as keyof OPMSData];
      bValue = b[sortConfig.key as keyof OPMSData];
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-semibold text-slate-800">Detalhamento por OPM (Interativo)</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar OPM..."
            className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th 
                scope="col" 
                onClick={() => requestSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-1">
                  OPMS
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                scope="col" 
                onClick={() => requestSort('available')}
                className="px-6 py-3 text-center text-xs font-medium text-emerald-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              >
                 <div className="flex items-center justify-center gap-1">
                  Disponível
                  {getSortIcon('available')}
                </div>
              </th>
              <th 
                scope="col" 
                onClick={() => requestSort('unavailable')}
                className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  Indisponível
                  {getSortIcon('unavailable')}
                </div>
              </th>
              <th 
                scope="col" 
                onClick={() => requestSort('total')}
                className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  Total Geral
                  {getSortIcon('total')}
                </div>
              </th>
              <th 
                scope="col" 
                onClick={() => requestSort('percentage')}
                className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  % Disp.
                  {getSortIcon('percentage')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedData.map((item) => {
               const percentage = item.total > 0 ? ((item.available / item.total) * 100).toFixed(0) : 0;
               return (
                <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-emerald-600 font-semibold bg-emerald-50/50">
                    {item.available}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-blue-600 font-semibold bg-blue-50/50">
                    {item.unavailable}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-slate-900 font-bold">
                    {item.total}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      Number(percentage) > 70 ? 'bg-green-100 text-green-800' : 
                      Number(percentage) > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {percentage}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
        Mostrando {sortedData.length} unidades
      </div>
    </div>
  );
};

export default OPMSTable;