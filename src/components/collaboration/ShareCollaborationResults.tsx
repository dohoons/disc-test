/**
 * ShareCollaborationResults Component
 * Allows users to share their collaboration analysis via URL
 */

import { useState } from 'react';
import { useResults } from '../../context';
import { generateCollaborationShareUrl } from '../../lib/utils/dataCompression';
import { Card, CardHeader, CardBody, Button } from '../common';

export function ShareCollaborationResults() {
  const { userResults, partnerResults, getCollaborationShareableData } = useResults();
  const [copied, setCopied] = useState(false);

  const collaborationData = getCollaborationShareableData();

  if (!collaborationData || !userResults || !partnerResults) {
    return null;
  }

  // Build base URL without trailing slash to avoid double slashes
  const baseUrl = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');

  // Path already starts with /, so just concatenate
  const shareData = getCollaborationShareableData();
  const shareUrl = shareData ? generateCollaborationShareUrl(shareData, baseUrl) : '';

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
          title: 'DISC 협업 분석 결과',
          text: `${userResults.profileName}와 ${partnerResults.profileName}의 협업 분석 결과를 확인하세요!`,
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
        title="협업 분석 결과 공유하기"
        description="URL을 통해 협업 분석 결과를 공유하세요"
      />

      <CardBody>
        {/* Share URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            협업 분석 공유 링크
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

        {/* Native Share Button */}
        {'share' in navigator && (
          <Button onClick={handleShare} fullWidth variant="outline">
            공유하기
          </Button>
        )}

        {/* Info */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-gray-700">
            이 링크를 받은 사람은 협업 분석 결과를 바로 확인할 수 있습니다.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
