/**
 * ShareResults Component
 * Allows users to share their results via URL
 */

import { useState } from 'react';
import { useResults } from '../../context';
import { generateShareUrl, generateShareText } from '../../lib/utils/dataCompression';
import { Card, CardHeader, CardBody, Button } from '../common';

export function ShareResults() {
  const { userResults, getShareableData } = useResults();
  const [copied, setCopied] = useState(false);

  const shareData = getShareableData();

  if (!shareData || !userResults) {
    return null;
  }

  const baseUrl = window.location.origin + import.meta.env.BASE_URL;
  const shareUrl = generateShareUrl(shareData, baseUrl);
  const shareText = generateShareText(shareData);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DISC 성격 유형 검사 결과',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    }
  };

  return (
    <Card>
      <CardHeader
        title="결과 공유하기"
        description="URL을 통해 동료와 검사 결과를 공유하세요"
      />

      <CardBody>
        {/* Share URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            공유 링크
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <Button onClick={handleCopyLink} variant={copied ? 'secondary' : 'primary'}>
              {copied ? '복사됨!' : '복사'}
            </Button>
          </div>
        </div>

        {/* Share Text Preview */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            공유할 텍스트
          </label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
              {shareText}
            </pre>
          </div>
        </div>

        {/* Native Share Button */}
        {'share' in navigator && (
          <Button onClick={handleShare} fullWidth variant="outline">
            공유하기
          </Button>
        )}

        {/* Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-700">
            💡 공유 링크를 받은 동료는 협업 분석 페이지에서 두 사람의 시너지를 확인할 수 있습니다.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
