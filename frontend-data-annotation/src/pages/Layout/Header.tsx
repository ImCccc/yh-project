import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.module.less';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate({ pathname: '/' }), [navigate]);
  return (
    <div className={styles.h_container}>
      <div className={styles.h_left} onClick={goHome}>
        <span className={styles.h_title}>盈合标注平台</span>
      </div>
      <HeaderDropdown />
    </div>
  );
};

export default Header;
