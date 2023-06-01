import LinkButton from '@/components/LinkButton';
import { Result } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={<LinkButton to="/">返回主页</LinkButton>}
  />
);

export default App;
