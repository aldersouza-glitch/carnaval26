
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { RANK_DATA } from '../constants';

const RankChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={RANK_DATA}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={70}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="rank" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#475569', fontWeight: 600 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
          <Tooltip 
             cursor={{ fill: '#f8fafc' }}
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="available" name="Disponível" stackId="a" fill="#16a34a" radius={[0, 0, 6, 6]}>
            <LabelList dataKey="available" position="center" fill="#fff" fontSize={13} fontWeight="700" />
          </Bar>
          <Bar dataKey="special" name="Filho Especial" stackId="a" fill="#2563eb">
            <LabelList 
              dataKey="special" 
              position="center" 
              fill="#fff" 
              fontSize={14} 
              fontWeight="900" 
              formatter={(value: number) => value > 0 ? value : ''}
            />
          </Bar>
          <Bar dataKey="unavailable" name="Indisponível" stackId="a" fill="#dc2626" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="unavailable" position="center" fill="#fff" fontSize={13} fontWeight="700" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankChart;
