import Content from '@/pages/Layout/Content';
import Sider from '@/pages/Layout/Sider';
import styles from './index.module.less';

const App: React.FC = () => (
  <div className={styles.page}>
    <Sider />
    <Content />
  </div>
);

export default App;
