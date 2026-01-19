/**
 * DISCRadarChart Component
 * Displays DISC scores as a radar chart
 */

import { Radar } from 'react-chartjs-2';
import { getDISCRadarData, getDISCRadarOptions } from '../../lib/utils/chartConfig';
import { DISCScores } from '../../lib/disc/scoring';
import { Card } from '../common';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface DISCRadarChartProps {
  scores: DISCScores;
  className?: string;
}

export function DISCRadarChart({ scores, className = '' }: DISCRadarChartProps) {
  const chartData = getDISCRadarData(scores);
  const chartOptions = getDISCRadarOptions();

  return (
    <Card className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">DISC 프로필</h3>
        <p className="text-sm text-gray-600">네 가지 차원의 상대적 강도</p>
      </div>

      <div className="relative" style={{ height: '300px' }}>
        <Radar data={chartData} options={chartOptions} />
      </div>

      {/* Score Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-disc-d">{scores.dominance}</div>
          <div className="text-xs text-gray-600">지배 (D)</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-disc-i">{scores.influence}</div>
          <div className="text-xs text-gray-600">영향 (I)</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-disc-s">{scores.steadiness}</div>
          <div className="text-xs text-gray-600">안정 (S)</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-disc-c">{scores.conscientiousness}</div>
          <div className="text-xs text-gray-600">신중 (C)</div>
        </div>
      </div>
    </Card>
  );
}
