import LinkButton from '@/components/LinkButton';
import { Result } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，您无权访问此页面。"
    extra={<LinkButton to="/">返回主页</LinkButton>}
  />
);

export default App;
