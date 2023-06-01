const MeunIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <span
    style={{ fontSize: '2.6rem', marginRight: '1rem' }}
    className={`iconfont ${icon}`}
  ></span>
);

export default MeunIcon;
