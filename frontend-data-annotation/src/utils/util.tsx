import { Modal, ModalFuncProps } from 'antd';
import moment from 'moment';
import React from 'react';

const { confirm } = Modal;

export const remToNumber = (value: number) => {
  const times = screen.width / 1920;
  return value * 10 * times;
};

export const initFontSize = () => {
  try {
    const body = document.body;
    const html = body.parentElement || (body.parentNode as any);
    html.style.fontSize = `${(screen.width / 1920) * 10}px`;
  } catch (error) {}
};

export function arrayToArrayTree<T extends { [key: string]: any }[]>(arr: T) {
  if (!arr || !arr.length) {
    return arr;
  }

  const ids = arr.map((v) => v.key);

  return arr.filter((cur) => {
    cur.children = arr.filter((item) => item.parantId === cur.key);
    const curPid = cur.parantId;
    if (!curPid && curPid !== 0) return true;

    if (!ids.includes(curPid)) {
      console.warn(`找不到parentId：`, curPid, cur);
      return true;
    }

    return false;
  }) as T;
}

export const deleteConfirm = (title?: string, props?: ModalFuncProps) => {
  return new Promise<void>((resolve, reject) => {
    confirm({
      title: title || `确定要删除`,
      onOk: async () => resolve(),
      onCancel: () => reject(),
      ...props,
    });
  });
};

export const linkExport = (url: string) => {
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.click();
  a.remove();
};

export const getPercentage = (
  total: number | string,
  value: number | string,
  decimal = 2,
) => {
  total = +total || 0;
  value = +value || 0;
  if (!total || !value) return '0';
  return +((value / total) * 100).toFixed(decimal);
};

export function modalConfirm(
  content: React.ReactNode,
  props?: ModalFuncProps,
): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      width: '52rem',
      content,
      closable: true,
      maskClosable: true,
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      ...props,
      onOk: () => resolve(),
      onCancel: () => reject(),
    });
  });
}

export const splitJsx = (
  splitElement: React.ReactNode,
  ...args: React.ReactNode[]
) => {
  const len = args.length;
  if (!len) return undefined;
  return args.map((jsx, index) => {
    if (index === len - 1) {
      return <React.Fragment key={index}>{jsx}</React.Fragment>;
    }
    return (
      <React.Fragment key={index}>
        {jsx}
        {splitElement}
      </React.Fragment>
    );
  });
};

export const splitButtons = (...args: JSX.Element[]) => {
  return splitJsx(<span className="btn-spacing"></span>, ...args);
};

type TimeFormatProps =
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD HH:mm';

export const formatDate = (
  date: number | string,
  timeFormat?: TimeFormatProps,
) => {
  return +date > 10000
    ? moment(+date).format(timeFormat || 'YYYY/MM/DD HH:mm')
    : '';
};
