import React from 'react';
import styled from 'styled-components';
import { useInfiniteScroll } from './infinite-scroll.hooks';

const Wrapper = styled.div`
  overflow-y: scroll;
  max-height: 400px;
  width: 100%;
`;

const WrapLoader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 0 0 0;
`;

const InfiniteScroll = ({
  next = cb => {
    cb();
  },
  hasMore,
  loader,
  style = {},
  children
}) => {
  const { scrollTarget, isLoading } = useInfiniteScroll({ next, hasMore });

  return (
    <Wrapper ref={scrollTarget} style={style}>
      {children}
      {isLoading && <WrapLoader>{loader || 'Loading...'}</WrapLoader>}
    </Wrapper>
  );
};

export default InfiniteScroll;
