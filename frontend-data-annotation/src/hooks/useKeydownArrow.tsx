import { useEffect } from 'react';

type NextProps = () => void;
type PrevProps = () => void;

function useKeydownArrow(next: NextProps, prev: PrevProps) {
  // 按下键盘左右键切换
  useEffect(() => {
    const keydown = (e: any) => {
      try {
        const code = e.code.toLocaleUpperCase();
        if (code === 'ARROWRIGHT' || code === 'ARROWLEFT') {
          const tagName = e.target.tagName.toLocaleUpperCase();
          const type = e.target.type;
          if (tagName === 'INPUT' && type !== 'radio' && type !== 'checkbox') {
            return;
          }
          if (tagName === 'TEXTAREA') {
            return;
          }
          if (code === 'ARROWRIGHT') next();
          if (code === 'ARROWLEFT') prev();
        }
      } catch (error) {}
    };
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [next, prev]);
}

export default useKeydownArrow;
