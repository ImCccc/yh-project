import { Button, Result } from 'antd';
import React, { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Comp: React.FC<any> = React.memo(
  ({ subTitle = '网络出问题, 请刷新试试', children }) => {
    const FallbackComponent = useCallback(() => {
      const extra = (
        <Button type="primary" onClick={() => window.location.reload()}>
          刷新
        </Button>
      );
      return <Result status="500" subTitle={subTitle} extra={extra} />;
    }, [subTitle]);
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        {children}
      </ErrorBoundary>
    );
  },
);

export default React.memo(Comp);
