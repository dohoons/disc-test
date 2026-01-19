/**
 * HomePage Component
 * Landing page for the DISC assessment
 */

import { Link } from 'react-router-dom';
import { Button, Card } from '../components/common';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            DISC 성격 유형 검사
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            자신의 행동 스타일을 이해하고<br className="sm:hidden" />
            팀 협업을 개선하세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/assessment">
              <Button size="lg" variant="primary">
                검사 시작하기
              </Button>
            </Link>
            <Link to="/collaborate">
              <Button size="lg" variant="outline">
                협업 분석하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            왜 DISC 검사인가요?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-disc-d/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-disc-d" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">간편하고 빠른 검사</h3>
              <p className="text-gray-600">
                24개의 질문으로 5-10분 안에 자신의 성격 유형을 파악할 수 있습니다.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-disc-i/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-disc-i" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">시각적 결과 분석</h3>
              <p className="text-gray-600">
                레이더 차트와 상세한 설명으로 자신의 성격을 명확하게 이해할 수 있습니다.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-disc-s/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-disc-s" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">팀 협업 개선</h3>
              <p className="text-gray-600">
                동료와의 시너지 분석으로 더 나은 협업 방법을 찾을 수 있습니다.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* DISC Types Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            DISC 4가지 유형
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="D">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-disc-d flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">지배형</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Dominance
              </p>
              <p className="text-sm text-gray-700">
                직설적이고 결단력이 강하며 목표 지향적입니다.
              </p>
            </Card>

            <Card variant="I">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-disc-i flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">영향형</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Influence
              </p>
              <p className="text-sm text-gray-700">
                사교적이고 열정적이며 낙관적입니다.
              </p>
            </Card>

            <Card variant="S">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-disc-s flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">안정형</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Steadiness
              </p>
              <p className="text-sm text-gray-700">
                인내심 있고 신뢰할 수 있으며 지원적입니다.
              </p>
            </Card>

            <Card variant="C">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-disc-c flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">신중형</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Conscientiousness
              </p>
              <p className="text-sm text-gray-700">
                분석적이고 정확하며 내성적입니다.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              지금 바로 자신의 성격 유형을 알아보세요!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              5-10분이면 충분합니다. 결과는 즉시 확인 가능합니다.
            </p>
            <Link to="/assessment">
              <Button size="lg" variant="primary">
                무료로 검사 시작하기
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
