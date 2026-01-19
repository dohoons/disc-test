/**
 * BehavioralIndicators Component
 * Displays behavioral indicators as bar charts
 */

import { Bar } from 'react-chartjs-2';
import { calculateBehavioralIndicators } from '../../lib/disc/scoring';
import { getBehavioralBarData, getBehavioralBarOptions } from '../../lib/utils/chartConfig';
import { DISCScores } from '../../lib/disc/scoring';
import { Card, CardHeader } from '../common';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BehavioralIndicatorsProps {
  scores: DISCScores;
}

export function BehavioralIndicators({ scores }: BehavioralIndicatorsProps) {
  const indicators = calculateBehavioralIndicators(scores);
  const chartData = getBehavioralBarData(indicators);
  const chartOptions = getBehavioralBarOptions();

  return (
    <Card>
      <CardHeader
        title="행동 지표"
        description="DISC 점수에서 도출된 4가지 행동 특성"
      />

      <div className="relative" style={{ height: '250px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Indicator Descriptions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900 text-sm">결단력</span>
            <span className="text-lg font-bold text-disc-d">{indicators.decisiveness}</span>
          </div>
          <p className="text-xs text-gray-600">
            목표 지향적이고 단호한 성향 (지배형)
          </p>
        </div>

        <div className="p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900 text-sm">사교성</span>
            <span className="text-lg font-bold text-disc-i">{indicators.sociability}</span>
          </div>
          <p className="text-xs text-gray-600">
            대인 관계와 사회적 활동 성향 (영향형)
          </p>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900 text-sm">인내심</span>
            <span className="text-lg font-bold text-disc-s">{indicators.patience}</span>
          </div>
          <p className="text-xs text-gray-600">
            안정과 평화를 위한 인내 성향 (안정형)
          </p>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900 text-sm">정확성</span>
            <span className="text-lg font-bold text-disc-c">{indicators.precision}</span>
          </div>
          <p className="text-xs text-gray-600">
            분석과 정확성을 위한 성향 (신중형)
          </p>
        </div>
      </div>
    </Card>
  );
}
