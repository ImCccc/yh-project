import { breadcrumbData } from '@/config/routes';
import classNames from 'classnames';
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.less';

type BreadcrumbProps = {
  label: string;
  path: string;
};

export const setPathList = (pathname: string) => {
  const paths = pathname.slice(1).split('/').slice(0, 3);
  return paths.reduce<BreadcrumbProps[]>((data, cur, index) => {
    const path = index ? `${data[index - 1].path}/${cur}` : `/${cur}`;
    const label =
      breadcrumbData[path] ||
      breadcrumbData[
        Object.keys(breadcrumbData).filter((k) => {
          const _paths = k.slice(1).split('/');
          if (paths[0] !== _paths[0]) return false;
          return _paths.length === paths.length;
        })[0]
      ];
    if (label) data.push({ path, label });
    return data;
  }, []);
};

const Comp: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const [list, setList] = useState<BreadcrumbProps[]>([]);

  useEffect(() => {
    setList(setPathList(pathname));
  }, [pathname]);

  const _title = useMemo(() => {
    const lastItem = list[list.length - 1];
    return lastItem ? lastItem.label : '';
  }, [list]);

  const getLink = (index: number, label: string, path: string) => {
    if (index === 0) {
      return <span className={styles.text}>{label}</span>;
    }
    if (index === list.length - 1) {
      return (
        <span className={classNames(styles.text, styles.active)}>{label}</span>
      );
    }
    return (
      <Link className={styles.text} to={path}>
        {label}
      </Link>
    );
  };

  return (
    <div className={styles.crumbs}>
      {list.map((v, index) => (
        <Fragment key={v.path}>
          {getLink(index, v.label, v.path)}
          {index !== list.length - 1 && (
            <span className={styles.spacing}>/</span>
          )}
        </Fragment>
      ))}
      <div className={styles.title}>
        <div className={styles.modalTitle} id="_modal_title"></div>
        {_title}
      </div>
      {children}
    </div>
  );
};

export default Comp;
