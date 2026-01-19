/**
 * Chart.js Configuration Utilities
 * Provides consistent chart styling and configuration
 */

import { ChartOptions, ChartData } from 'chart.js';

/**
 * DISC colors for charts
 */
export const discColors = {
  D: {
    background: 'rgba(239, 68, 68, 0.2)',
    border: 'rgb(239, 68, 68)',
    solid: '#ef4444',
  },
  I: {
    background: 'rgba(249, 115, 22, 0.2)',
    border: 'rgb(249, 115, 22)',
    solid: '#f97316',
  },
  S: {
    background: 'rgba(34, 197, 94, 0.2)',
    border: 'rgb(34, 197, 94)',
    solid: '#22c55e',
  },
  C: {
    background: 'rgba(59, 130, 246, 0.2)',
    border: 'rgb(59, 130, 246)',
    solid: '#3b82f6',
  },
};

/**
 * Get DISC radar chart data
 */
export function getDISCRadarData(scores: {
  dominance: number;
  influence: number;
  steadiness: number;
  conscientiousness: number;
}): ChartData<'radar'> {
  return {
    labels: ['지배 (D)', '영향 (I)', '안정 (S)', '신중 (C)'],
    datasets: [
      {
        label: 'DISC 프로필',
        data: [scores.dominance, scores.influence, scores.steadiness, scores.conscientiousness],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: [
          discColors.D.solid,
          discColors.I.solid,
          discColors.S.solid,
          discColors.C.solid,
        ],
        pointBorderColor: [
          discColors.D.solid,
          discColors.I.solid,
          discColors.S.solid,
          discColors.C.solid,
        ],
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
}

/**
 * Get DISC radar chart options
 */
export function getDISCRadarOptions(): ChartOptions<'radar'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
          },
          color: '#6b7280',
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#374151',
        },
        grid: {
          color: '#e5e7eb',
        },
        angleLines: {
          color: '#e5e7eb',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed.r || 0;
            return `${label}: ${value}/100`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
  };
}

/**
 * Get comparison radar chart data
 */
export function getComparisonRadarData(
  userScores: { dominance: number; influence: number; steadiness: number; conscientiousness: number },
  partnerScores?: { dominance: number; influence: number; steadiness: number; conscientiousness: number }
): ChartData<'radar'> {
  const datasets = [
    {
      label: '내 프로필',
      data: [userScores.dominance, userScores.influence, userScores.steadiness, userScores.conscientiousness],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
      pointBackgroundColor: discColors.D.solid,
      pointBorderColor: discColors.D.solid,
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ];

  if (partnerScores) {
    datasets.push({
      label: '상대방 프로필',
      data: [partnerScores.dominance, partnerScores.influence, partnerScores.steadiness, partnerScores.conscientiousness],
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      borderColor: 'rgb(249, 115, 22)',
      borderWidth: 2,
      pointBackgroundColor: discColors.I.solid,
      pointBorderColor: discColors.I.solid,
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    });
  }

  return {
    labels: ['지배 (D)', '영향 (I)', '안정 (S)', '신중 (C)'],
    datasets,
  };
}

/**
 * Get behavioral bar chart data
 */
export function getBehavioralBarData(indicators: {
  decisiveness: number;
  sociability: number;
  patience: number;
  precision: number;
}): ChartData<'bar'> {
  return {
    labels: ['결단력', '사교성', '인내심', '정확성'],
    datasets: [
      {
        label: '행동 지표',
        data: [indicators.decisiveness, indicators.sociability, indicators.patience, indicators.precision],
        backgroundColor: [
          discColors.D.background,
          discColors.I.background,
          discColors.S.background,
          discColors.C.background,
        ],
        borderColor: [
          discColors.D.border,
          discColors.I.border,
          discColors.S.border,
          discColors.C.border,
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };
}

/**
 * Get behavioral bar chart options
 */
export function getBehavioralBarOptions(): ChartOptions<'bar'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
          },
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          font: {
            size: 13,
          },
          color: '#374151',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y || 0;
            return `점수: ${value}/100`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
  };
}

/**
 * Get synergy meter chart data
 */
export function getSynergyMeterData(synergyScore: number): ChartData<'doughnut'> {
  return {
    labels: ['시너지', '차이'],
    datasets: [
      {
        data: [synergyScore, 100 - synergyScore],
        backgroundColor: [
          synergyScore >= 80 ? 'rgb(34, 197, 94)' :
          synergyScore >= 65 ? 'rgb(249, 115, 22)' :
          synergyScore >= 50 ? 'rgb(234, 179, 8)' :
          'rgb(239, 68, 68)',
          'rgba(229, 231, 235, 0.5)',
        ],
        borderColor: [
          synergyScore >= 80 ? 'rgb(34, 197, 94)' :
          synergyScore >= 65 ? 'rgb(249, 115, 22)' :
          synergyScore >= 50 ? 'rgb(234, 179, 8)' :
          'rgb(239, 68, 68)',
          'rgba(229, 231, 235, 0.5)',
        ],
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };
}

/**
 * Get synergy meter chart options
 */
export function getSynergyMeterOptions(): ChartOptions<'doughnut'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
  };
}
