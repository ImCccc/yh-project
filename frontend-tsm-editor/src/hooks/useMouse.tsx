import {useEffect} from 'react';
export default function useMouse(scrollRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    let mouseDownClientX: number = 0;
    let thisScrollLeft: number = 0;

    const _dom = scrollRef.current;
    if (!_dom) return;

    thisScrollLeft = _dom.scrollLeft;

    const mousedown = (e: MouseEvent) => {
      e.preventDefault();
      mouseDownClientX = e.clientX;
    };

    const mouseUpLeave = () => {
      mouseDownClientX = 0;
      thisScrollLeft = _dom.scrollLeft!;
    };

    const mousemove = (e: MouseEvent) => {
      e.preventDefault();
      if (!mouseDownClientX) return;
      const moverRange = e.clientX - mouseDownClientX;
      const scrollLeft = Math.max(0, thisScrollLeft - moverRange);
      _dom!.scrollLeft = scrollLeft;
    };

    _dom.addEventListener('mouseup', mouseUpLeave);
    _dom.addEventListener('mouseleave', mouseUpLeave);
    _dom.addEventListener('mousedown', mousedown);
    _dom.addEventListener('mousemove', mousemove);

    return () => {
      _dom.removeEventListener('mouseup', mouseUpLeave);
      _dom.removeEventListener('mouseleave', mouseUpLeave);
      _dom.removeEventListener('mousedown', mousedown);
      _dom.removeEventListener('mousemove', mousemove);
    };
  }, [scrollRef]);
}
