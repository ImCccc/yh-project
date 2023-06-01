import {Modal} from 'antd';
import type {ModalFuncProps} from 'antd/lib/modal/Modal';

export function clone<T>(data: T): T {
  data = JSON.parse(JSON.stringify(data));
  return data;
}

export function isNumber(data: any): boolean {
  if (data === 0) return true;
  return !!+data;
}

export function stringify<T>(data: T, isFormat?: boolean) {
  if (isFormat) return JSON.stringify(data, null, 2);
  return JSON.stringify(data);
}

export function DryModal(options: Partial<ModalFuncProps>) {
  Modal.confirm({
    width: '54rem',
    closable: true,
    centered: true,
    maskClosable: true,
    title: '提示',
    okText: '确定',
    cancelText: '取消',
    wrapClassName: 'dry-modal-confirm',
    ...options,
  });
}

type ConfirmProps = React.ReactNode | string;
export function confirm(
  content: ConfirmProps = '确定删除吗?',
  width = '52rem'
): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      width,
      content,
      closable: true,
      centered: true,
      maskClosable: true,
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      wrapClassName: 'dry-modal-confirm',
      onOk: () => resolve(),
      onCancel: () => reject(),
    });
  });
}

export const initBodyFontSize = () => {
  const zoom = (window.screen.width / 1920) * 10;
  const fontSize = zoom + 'px';
  window.document.body.style.fontSize = fontSize;
  (window as any).__htmlFontSize = zoom;
  document.querySelector('html')!.style.fontSize = fontSize;
};
