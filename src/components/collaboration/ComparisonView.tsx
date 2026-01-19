/**
 * ComparisonView Component
 * Side-by-side comparison of two DISC profiles
 */

import { Radar } from 'react-chartjs-2';
import { getComparisonRadarData, getDISCRadarOptions } from '../../lib/utils/chartConfig';
import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader } from '../common';

interface ComparisonViewProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function ComparisonView({ userResults, partnerResults }: ComparisonViewProps) {
  const chartData = getComparisonRadarData(userResults.scores, partnerResults.scores);
  const chartOptions = getDISCRadarOptions();

  return (
    <Card>
      <CardHeader
        title="프로필 비교"
        description="두 사람의 DISC 프로필을 시각적으로 비교"
      />

      <div className="relative" style={{ height: '300px' }}>
        <Radar data={chartData} options={chartOptions} />
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-blue-600 mr-2"></div>
          <span className="text-sm text-gray-700">나 ({userResults.primaryType}{userResults.secondaryType})</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-orange-500 mr-2"></div>
          <span className="text-sm text-gray-700">상대방 ({partnerResults.primaryType}{partnerResults.secondaryType})</span>
        </div>
      </div>

      {/* Score Comparison Table */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">점수 비교</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-600 font-medium">항목</th>
                <th className="text-center py-2 px-3 text-gray-600 font-medium">나</th>
                <th className="text-center py-2 px-3 text-gray-600 font-medium">상대방</th>
                <th className="text-center py-2 px-3 text-gray-600 font-medium">차이</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">지배 (D)</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-d">{userResults.scores.dominance}</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-d">{partnerResults.scores.dominance}</td>
                <td className="py-2 px-3 text-center text-gray-600">
                  {Math.abs(userResults.scores.dominance - partnerResults.scores.dominance)}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">영향 (I)</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-i">{userResults.scores.influence}</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-i">{partnerResults.scores.influence}</td>
                <td className="py-2 px-3 text-center text-gray-600">
                  {Math.abs(userResults.scores.influence - partnerResults.scores.influence)}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">안정 (S)</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-s">{userResults.scores.steadiness}</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-s">{partnerResults.scores.steadiness}</td>
                <td className="py-2 px-3 text-center text-gray-600">
                  {Math.abs(userResults.scores.steadiness - partnerResults.scores.steadiness)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-gray-700">신중 (C)</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-c">{userResults.scores.conscientiousness}</td>
                <td className="py-2 px-3 text-center font-semibold text-disc-c">{partnerResults.scores.conscientiousness}</td>
                <td className="py-2 px-3 text-center text-gray-600">
                  {Math.abs(userResults.scores.conscientiousness - partnerResults.scores.conscientiousness)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
