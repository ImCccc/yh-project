import React, {useMemo} from 'react';

type CompProps = {
  scale?: number;
};

const Comp: React.FC<CompProps> = ({scale}) => {
  const style = useMemo<React.CSSProperties>(() => {
    const multiple = scale || 1;
    return {
      fontSize: 8 * multiple + 'rem',
    };
  }, [scale]);

  return <i style={style} className="font_family icon-jiantou"></i>;
};

export default Comp;
