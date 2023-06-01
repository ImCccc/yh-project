import { useMobx } from '@/stores';
import { observer } from 'mobx-react-lite';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
const Comp: React.FC<{
  children: ReactNode;
  to: string;
}> = ({ children, to }) => {
  const keepRoute = useMobx('KeepAliveRoute');
  const navigate = useNavigate();
  const goPage = useCallback(() => {
    keepRoute.addCacheRoute();
    navigate(to);
  }, [keepRoute, navigate, to]);
  return <a onClick={goPage}>{children}</a>;
};

export default observer(Comp);
