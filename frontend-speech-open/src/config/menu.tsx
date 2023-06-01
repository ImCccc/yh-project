const menuStyle = {
  fontSize: '2.6rem',
  marginRight: '1rem',
};

const Icon: React.FC<{ icon: string }> = ({ icon }) => (
  <span style={menuStyle} className={`iconfont ${icon}`}></span>
);

const items = [
  {
    label: '应用信息',
    key: 'application',
    icon: <Icon icon="icon_yingyong" />,
  },
  {
    label: '技能配置',
    key: 'config',
    icon: <Icon icon="icon_shezhi" />,
  },
  {
    label: '接入设备',
    key: 'access',
    icon: <Icon icon="icon_jieruliucheng" />,
  },
  {
    label: '沙箱测试',
    key: 'test',
    icon: <Icon icon="icon_ceshi" />,
  },
  {
    label: '应用发布',
    key: 'publish',
    icon: <Icon icon="icon_fabu" />,
  },
];

export default items;
