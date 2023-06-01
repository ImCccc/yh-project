import React from 'react';
import { Button, ButtonProps } from 'antd';
import { useNavigate } from 'react-router-dom';
type CompProps = ButtonProps & { to: string };

const Comp: React.FC<CompProps> = ({
  to,
  children,
  type = 'primary',
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Button type={type} {...props} onClick={() => navigate(to)}>
      {children}
    </Button>
  );
};

export default React.memo(Comp);
