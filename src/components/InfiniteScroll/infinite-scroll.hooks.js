import { useState, useEffect, useRef } from 'react';

export const useInfiniteScroll = ({
  next = cb => {
    cb();
  },
  hasMore = false
}) => {
  const scrollTarget = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const target = scrollTarget.current;

  const onScroll = () => {
    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight &&
      hasMore
    ) {
      setLoading(true);
      next(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (target) {
      target.addEventListener('scroll', onScroll);
      target.addEventListener('load', onScroll);
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', onScroll);
        target.removeEventListener('load', onScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, hasMore]);

  return { scrollTarget, isLoading };
};
