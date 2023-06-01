import { useNavigate } from 'react-router-dom';

import HeaderDropdown from './HeaderDropdown';

import styles from './index.module.less';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.h_container}>
      <div
        className={styles.h_left}
        onClick={() => navigate({ pathname: '/' })}
      >
        <span className={styles.h_title}>工展馆总控系统</span>
      </div>
      <HeaderDropdown />
    </div>
  );
};

export default Header;
