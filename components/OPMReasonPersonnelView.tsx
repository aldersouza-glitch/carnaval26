
import React, { useState } from 'react';
import { DETAILED_PERSONNEL, OPMS_DATA, UNAVAILABLE_REASONS } from '../constants';
import { ArrowLeft, User, Search, Building2, FileWarning, Info, AlertTriangle } from 'lucide-react';

interface OPMReasonPersonnelViewProps {
  opmName: string;
  reasonName: string;
  onBack: () => void;
}

const OPMReasonPersonnelView: React.FC<OPMReasonPersonnelViewProps> = ({ opmName, reasonName, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar o efetivo real que temos na base detalhada
  const personnel = DETAILED_PERSONNEL.filter(p => p.opm === opmName && p.reason === reasonName);
  
  // Buscar os dados totais para exibir no header
  const opmData = OPMS_DATA.find(o => o.name === opmName);
  const reasonData = UNAVAILABLE_REASONS.find(r => r.reason === reasonName);

  // Filtragem local de busca
  const filteredPersonnel = personnel.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.observation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Efetivo: {reasonName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                <Building2 className="w-3 h-3" /> {opmName}
             </span>
             <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Total: {personnel.length} identificados nominais
             </span>
          </div>
        </div>
      </div>

      {/* Alerta de Escala Interna (Caso de dados massivos não detalhados na planilha) */}
      {reasonName === 'ESCALA INTERNA' && personnel.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4">
             <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
             <div>
                <h4 className="font-bold text-amber-800 text-sm uppercase tracking-tight">Detalhamento Nominal Indisponível</h4>
                <p className="text-sm text-amber-700 mt-1">
                    A planilha original fornece o quantitativo total para este motivo (Escala Interna), porém não lista os nomes individuais neste documento. 
                    Para acessar a relação nominal, é necessário consultar o sistema de escalas da unidade.
                </p>
             </div>
          </div>
      )}

      {/* Main Table Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Relação Nominal Registrada
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Pesquisar por nome ou posto..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredPersonnel.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posto/Grad</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome do Militar</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">OPM</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Observação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredPersonnel.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{item.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600">{item.opm}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.observation || reasonName}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 p-8 text-center">
              <Info className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm font-bold">Nenhum detalhamento nominal encontrado para este filtro.</p>
              <p className="text-xs mt-1 max-w-sm">
                Os dados quantitativos estão corretos e sincronizados com a planilha, mas a listagem nominal depende de registros específicos no anexo de detalhamento.
              </p>
              <button 
                onClick={onBack}
                className="mt-6 text-sm font-bold text-blue-600 hover:underline"
              >
                Voltar para visão da OPM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OPMReasonPersonnelView;
