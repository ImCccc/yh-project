import React, {useState} from 'react';
import {Input} from 'antd';
import styles from './index.module.scss';
import classNames from 'classnames';

type CompProps = {
  text: string;
  onInput: (value: string) => void;
};

const Comp: React.FC<CompProps> = ({text, onInput}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      {!isEdit && (
        <span className={classNames('bold', styles.title)}>
          {text}
          <span
            onClick={() => setIsEdit(true)}
            className={classNames(
              'font_family icon-xiugai',
              styles.icon
            )}></span>
        </span>
      )}
      {isEdit && (
        <Input
          size="small"
          value={text}
          className="font-md"
          style={{width: '30rem'}}
          placeholder="请输入名称"
          onBlur={() => setIsEdit(false)}
          onInput={(e) => onInput((e.target as any).value || '')}
        />
      )}
    </>
  );
};

export default Comp;
