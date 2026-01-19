/**
 * SynergyMeter Component
 * Visual display of synergy score between two profiles
 */

import { Doughnut } from 'react-chartjs-2';
import { getSynergyMeterData, getSynergyMeterOptions } from '../../lib/utils/chartConfig';
import { Card } from '../common';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SynergyMeterProps {
  synergyScore: number;
  compatibilityLevel: string;
}

export function SynergyMeter({ synergyScore, compatibilityLevel }: SynergyMeterProps) {
  const chartData = getSynergyMeterData(synergyScore);
  const chartOptions = getSynergyMeterOptions();

  const getCompatibilityColor = (level: string) => {
    switch (level) {
      case '훌륭한 조합':
        return 'text-green-600 bg-green-50';
      case '좋은 조합':
        return 'text-orange-600 bg-orange-50';
      case '보통의 조합':
        return 'text-yellow-600 bg-yellow-50';
      case '도전적인 조합':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompatibilityText = (level: string) => {
    return level;
  };

  const colorClass = getCompatibilityColor(compatibilityLevel);
  const compatibilityText = getCompatibilityText(compatibilityLevel);

  return (
    <Card>
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">시너지 점수</h3>
        <p className="text-sm text-gray-600">두 프로필 간의 협업 적합도</p>
      </div>

      <div className="relative flex justify-center items-center" style={{ height: '200px' }}>
        <Doughnut data={chartData} options={chartOptions} />
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{synergyScore}</div>
            <div className="text-xs text-gray-500">/ 100</div>
          </div>
        </div>
      </div>

      {/* Compatibility Level */}
      <div className="mt-6 text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClass}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-semibold">{compatibilityText}</span>
        </div>
      </div>
    </Card>
  );
}
