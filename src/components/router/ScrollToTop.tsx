/**
 * ScrollToTop Component
 * Scrolls to top on navigation, but preserves scroll position on back/forward
 */

import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // POP = back/forward, preserve browser's default scroll restoration
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}
