import classNames from 'classnames';
import styles from './index.module.less';

const Comp: React.FC<{
  showPassword: boolean;
  onChange: () => void;
}> = ({ showPassword, onChange }) => {
  return (
    <>
      <span
        onClick={onChange}
        className={classNames(styles.eye, { hide: showPassword })}
      >
        <span className="iconfont icon-yincangmima"></span>
      </span>
      <span
        onClick={onChange}
        className={classNames(styles.eye, { hide: !showPassword })}
      >
        <span className="iconfont icon-xianshihaoma"></span>
      </span>
    </>
  );
};

export default Comp;
