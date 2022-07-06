import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { getScrollTop } from 'utils/client';

export const useScrollTop = (
  position: number,
  initialScrollTop: boolean = true,
) => {
  const [isScrollTop, setIsScrollTop] = useState(initialScrollTop);

  useEffect(
    () => {
      const onScroll = throttle(
        () => {
          const positionTop = getScrollTop();
          if (positionTop > position) {
            setIsScrollTop(false);
          } else {
            setIsScrollTop(true);
          }
        },
        50,
        { leading: false },
      );

      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return isScrollTop;
};
