import Annotation, {
  AudioAnnotationProps,
} from '@/annotation-components/AudioAnnotation';
import { Input, message } from 'antd';
import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.module.less';

const autoSize = {
  minRows: 4,
  maxRows: 20,
};

const Comp: React.FC<AudioAnnotationProps> = React.forwardRef((props, ref) => {
  const key = useRef('');
  const [audioText, setAudioText] = useState('');
  const [isError, setIsError] = useState(false);

  const _originalParams = useRef('');
  const [invalid, setInvalid] = useState(false);

  const isNull = useMemo(
    () => () => {
      if (invalid) return false;
      return !audioText;
    },
    [audioText, invalid],
  );

  const getParams = useMemo(
    () => () => {
      if (invalid) {
        return { invalid, text: '', key: key.current };
      }
      if (isNull()) return '';
      return { invalid, text: audioText, key: key.current };
    },
    [audioText, invalid, isNull],
  );

  const checkParams = useMemo(
    () => () => {
      if (invalid) return false;
      if (!audioText) {
        message.error('请输入音频内容');
        setIsError(true);
        return true;
      }
      return false;
    },
    [audioText, invalid],
  );

  const isUpdate = useMemo(
    () => () => _originalParams.current !== JSON.stringify(getParams()),
    [getParams],
  );

  const imperativeHandle = useMemo(
    () => () => ({
      isNull,
      getParams,
      isUpdate,
      checkParams,
    }),
    [checkParams, getParams, isNull, isUpdate],
  );

  useImperativeHandle(ref, imperativeHandle);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsError(!e.target.value);
    setAudioText(e.target.value);
  }, []);

  useEffect(() => {
    key.current = props.data?.name || '';
    const result = props.data?.result;
    let _text = '';
    let _invalid = false;
    _originalParams.current = result || JSON.stringify('');
    if (result) {
      const rs = JSON.parse(result) || {};
      _text = rs.text || '';
      _invalid = !!rs.invalid;
    }
    setIsError(false);
    setAudioText(_text);
    setInvalid(_invalid);
  }, [props.data]);

  return (
    <Annotation {...props} disabled onChangeInvalid={setInvalid}>
      <div className={styles.content}>
        <div className={classNames('base-head base-border', styles.title)}>
          <span className="base-font-title">音频内容</span>
        </div>
        <div className={styles.areaBox}>
          <Input.TextArea
            value={audioText}
            autoSize={autoSize}
            onChange={onChange}
            readOnly={props.disabled}
            placeholder="请输入音频内容"
            className={classNames({ 'err-border': isError })}
          ></Input.TextArea>
        </div>
      </div>
    </Annotation>
  );
});

export default Comp;
