
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { GLOBAL_STATS } from '../constants';

const data = [
  { name: 'Disponível', value: GLOBAL_STATS.available, color: '#16a34a' },
  { name: 'Disponível (Filho Esp.)', value: GLOBAL_STATS.availableSpecial, color: '#2563eb' },
  { name: 'Indisponível', value: GLOBAL_STATS.unavailable, color: '#dc2626' },
];

const AvailabilityChart: React.FC = () => {
  // Formata a legenda para exibir o valor ao lado do nome
  const renderLegend = (value: string) => {
    const item = data.find(d => d.name === value);
    return <span className="text-slate-700 font-medium text-xs">{value}: <span className="font-bold">{item?.value}</span></span>;
  };

  return (
    <div className="h-[320px] w-full relative">
      {/* Texto Central (Total) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-[-18px]">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
        <p className="text-3xl font-black text-slate-800">{GLOBAL_STATS.total}</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={105}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              percent
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 15;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#334155"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize="12"
                  fontWeight="800"
                >
                  {value} ({`${(percent * 100).toFixed(0)}%`})
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                className="hover:opacity-80 transition-opacity outline-none" 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} integrantes`, 'Quantidade']}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={renderLegend}
            wrapperStyle={{ paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AvailabilityChart;
