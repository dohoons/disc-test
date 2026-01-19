/**
 * CommunicationStyleGuide Component
 * Displays personal communication style insights
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { getCommunicationStyle } from '../../lib/collaboration/communicationTips';
import { Card, CardHeader, CardBody } from '../common';

interface CommunicationStyleGuideProps {
  profile: DISCProfile;
}

export function CommunicationStyleGuide({ profile }: CommunicationStyleGuideProps) {
  const style = getCommunicationStyle(profile.primaryType);

  return (
    <Card>
      <CardHeader
        title="커뮤니케이션 스타일"
        description="나의 커뮤니케이션 특성 이해하기"
      />
      <CardBody>
        <div className="space-y-4">
          {/* Prefers */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              내가 선호하는 커뮤니케이션
            </h4>
            <ul className="space-y-1">
              {style.prefers.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Avoids */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              내가 피하는 커뮤니케이션
            </h4>
            <ul className="space-y-1">
              {style.avoids.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Best Practices */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              효과적인 커뮤니케이션 방법
            </h4>
            <ul className="space-y-1">
              {style.bestPractices.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              주의해야 할 신호
            </h4>
            <ul className="space-y-1">
              {style.redFlags.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-orange-600 mr-2">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips for improvement */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              커뮤니케이션 개발 팁
            </h4>
            <ul className="space-y-1">
              {getDevelopmentTips(profile.primaryType).map((tip, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-purple-600 mr-2">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function getDevelopmentTips(type: string): string[] {
  const tips: Record<string, string[]> = {
    D: [
      '타인의 의견을 경청하는 시간을 의식적으로 늘리기',
      '직접적인 피드백을 줄 때는 상대방의 감정도 고려하기',
      '신속한 결정의 장점을 유지하면서 필요한 정보 수집에도 시간 투자하기',
    ],
    I: [
      '브레인스토밍 후 실행 계획을 구체적으로 수립하기',
      '대화에서 상대방에게 더 많은 말할 기회 제공하기',
      '흥미로운 아이디어를 실현하기 위한 구체적 단계 생각하기',
    ],
    S: [
      '자신의 의견을 더 명확하고 직접적으로 표현하기',
      '변화 상황에서 미리 질문하고 준비하는 습관 들이기',
      '갈등이 필요할 때 피하지 않고 건설적으로 대처하기',
    ],
    C: [
      '완벽한 정보가 없을 때도 적절한 결정 내리기',
      '데이터뿐만 아니라 사람과 감정도 고려하기',
      '분석에 너무 많은 시간을 쓰지 않고 실행에 옮기기',
    ],
  };

  return tips[type] || [
    '자신의 강점을 더 발전시키기',
    '약점 영역에서 성장할 기회 찾기',
    '다양한 커뮤니케이션 스타일을 가진 사람들과 협업하기',
  ];
}
