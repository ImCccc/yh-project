import { formatDate } from '@/utils/util';
import classNames from 'classnames';
import styles from './Admin.module.less';

type CompProps = {
  teamInfo?: ANNOTATION.dataAnnotationTeam;
  buttons?: React.ReactNode;
};

const Comp: React.FC<CompProps> = ({ teamInfo, buttons }) => {
  return (
    <>
      <div className="base-head">
        <span className="base-font-title">团队信息</span>
        {teamInfo && buttons}
      </div>
      <div className={classNames(styles.infoBox, 'base-border')}>
        <div>
          <span className="base-label">团队名称：</span>
          <span className="base-value">{teamInfo?.name}</span>
        </div>
        <div>
          <span className="base-label">成员数：</span>
          <span className="base-value">
            {teamInfo && teamInfo.member_count + '人'}
          </span>
        </div>
        <div>
          <span className="base-label">创建人：</span>
          <span className="base-value">{teamInfo?.create_username}</span>
        </div>
        <div>
          <span className="base-label">创建时间：</span>
          <span className="base-value">
            {formatDate(teamInfo?.create_time || '', 'YYYY/MM/DD HH:mm')}
          </span>
        </div>
        <div>
          <span className="base-label">描述：</span>
          <span className="base-value">{teamInfo?.describe}</span>
        </div>
      </div>
    </>
  );
};

export default Comp;
