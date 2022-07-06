import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import throttle from 'lodash.throttle';

import Subscribable from 'utils/subscribable';
import { getScrollTop } from 'utils/client';

const subscribers = new Subscribable<string | undefined>();

export const useActiveHash = () => {
  const { asPath } = useRouter();
  const initialHash = '#' + asPath.split('#')[1];
  const [activeHash, setActiveHash] = useState<string | undefined>(initialHash);

  useEffect(() => subscribers.add(setActiveHash), []);

  return activeHash;
};

export const updateActiveHash = (hash: string | undefined) =>
  subscribers.call(hash);

export const useHeadingRouteUpdates = (headingHashes: Array<string>) => {
  useEffect(
    () => {
      const onScroll = throttle(
        () => {
          const offset = window.scrollY + window.innerHeight; // the bottom of the viewport
          const pageHeight = document.documentElement.scrollHeight; // the height of the entire page

          if (getScrollTop() <= 20) {
            return updateActiveHash(undefined);
          }

          if (offset >= pageHeight) {
            return updateActiveHash(headingHashes.at(-1));
          }

          const results = headingHashes.map((hash) => {
            if (hash) {
              const headingEl = document.querySelector(hash);

              if (headingEl) {
                return {
                  pos:
                    headingEl.getBoundingClientRect().top - (
                      window.innerHeight * 0.25 // 25% of the viewport
                    ),
                  hash,
                };
              }
            }

            return { pos: 1, hash };
          },).filter(({ pos }) => pos < 0);

          const currentHash = results.at(-1);

          if (currentHash) {
            updateActiveHash(currentHash.hash);
          } else {
            updateActiveHash(undefined);
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
};
