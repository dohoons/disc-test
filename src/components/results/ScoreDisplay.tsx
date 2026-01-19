/**
 * ScoreDisplay Component
 * Displays a summary of DISC scores with visual indicators
 */

import { DISCScores } from '../../lib/disc/scoring';
import { Card } from '../common';

interface ScoreDisplayProps {
  scores: DISCScores;
  primaryType: string;
  secondaryType: string;
}

export function ScoreDisplay({ scores, primaryType, secondaryType }: ScoreDisplayProps) {
  const scoresArray = [
    { label: '지배 (D)', value: scores.dominance, color: 'bg-disc-d', textColor: 'text-disc-d' },
    { label: '영향 (I)', value: scores.influence, color: 'bg-disc-i', textColor: 'text-disc-i' },
    { label: '안정 (S)', value: scores.steadiness, color: 'bg-disc-s', textColor: 'text-disc-s' },
    { label: '신중 (C)', value: scores.conscientiousness, color: 'bg-disc-c', textColor: 'text-disc-c' },
  ];

  return (
    <Card>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-disc-d via-disc-i to-disc-c mb-4">
          <span className="text-white font-bold text-3xl">
            {primaryType}
            {secondaryType}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {primaryType}{secondaryType} 유형
        </h2>
        <p className="text-gray-600 mt-1">
          주요: {primaryType} / 보조: {secondaryType}
        </p>
      </div>

      <div className="space-y-4">
        {scoresArray.map((score) => (
          <div key={score.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{score.label}</span>
              <span className={`text-sm font-bold ${score.textColor}`}>{score.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${score.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
