import { Rule } from 'antd/lib/form';

// 序号	选项	内容校验	长度/大小校验
// 1	用户名	支持数字、中文、英文、特殊字符	最大支持32位
// 2	密码	数字、大写、小写、特殊字符任意2种组合	最小支持8位，最大支持32位
// 3	邮箱	邮箱形式	最大支持32字节
// 4	数据集、标签集等名称	支持数字、中文、英文、特殊字符	最大支持32字节
// 5	数据集、标签集等描述	支持数字、中文、英文、特殊字符	最大支持200字
// 6	上传文件	模板	单次最大支持500M

export const TEXTAREA_LEN = 200;
export const NAME_LEN = 32;

export const patternPassword =
  // /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*?]{8,32}$/;
  /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/;

export const passwordFormatTips =
  '密码必须包含字母和数字，长度在8-32位之间';

export const isPassword = (password: string) => {
  return patternPassword.test(password);
};

export const isEmail = (email: string) => {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
    email,
  );
};

export const requiredRule: Rule[] = [{ required: true }];

export const newPasswordRule: Rule[] = [
  {
    required: true,
    message: '请输入新密码',
  },
  {
    pattern: patternPassword,
    message: passwordFormatTips,
  },
];

export const passwordRule: Rule[] = [
  {
    required: true,
    message: '请输入用户密码',
  },
  {
    pattern: patternPassword,
    message: passwordFormatTips,
  },
];

export const oldPasswordRule: Rule[] = [
  {
    required: true,
    message: '请输入旧密码',
  },
  {
    pattern: patternPassword,
    message: passwordFormatTips,
  },
];

export const getConfirmPasswordRule = (
  newPasswordKey = 'new_password',
  tip = '两次输入的密码不一致，请重新输入',
) => {
  return [
    {
      required: true,
      message: '请再次确认密码',
    },
    ({ getFieldValue }) => ({
      validator(_, v) {
        const newPassword = getFieldValue(newPasswordKey);
        if (newPassword) {
          if (v && newPassword && v !== newPassword) {
            return Promise.reject(new Error(tip));
          }
        }
        return Promise.resolve();
      },
    }),
  ] as Rule[];
};

// 用户名
export const userNameRule: Rule[] = [
  {
    required: true,
    message: '请输入用户名',
  },
  {
    max: NAME_LEN,
    message: `用户名长度不能超过${NAME_LEN}位`,
  },
];

// 任务名称
export const taskNameRule: Rule[] = [
  {
    required: true,
    message: '请输入任务名称',
  },
  {
    max: NAME_LEN,
    message: `任务名称长度不能超过${NAME_LEN}位`,
  },
];

// 任务描述
export const taskDescribeRule: Rule[] = [
  {
    max: TEXTAREA_LEN,
    message: `任务描述长度不能超过${TEXTAREA_LEN}位`,
  },
];

// 团队名称
export const teamNameRule: Rule[] = [
  {
    required: true,
    message: '请输入团队名称',
  },
  {
    max: NAME_LEN,
    message: `团队名称长度不能超过${NAME_LEN}位`,
  },
];

// 团队描述
export const teamDescribeRule: Rule[] = [
  {
    max: TEXTAREA_LEN,
    message: `团队描述长度不能超过${TEXTAREA_LEN}位`,
  },
];

export const leaderRule: Rule[] = [
  {
    required: true,
    message: '请选择团队队长',
  },
];

export const dataIdRule: Rule[] = [
  {
    required: true,
    message: '请选择数据集',
  },
];

export const labelIntentRule: Rule[] = [
  {
    required: true,
    message: '请选择意图标签集',
  },
];

export const labelSlotRule: Rule[] = [
  {
    required: true,
    message: '请选择槽位标签集',
  },
];

export const labelCommonRule: Rule[] = [
  {
    required: true,
    message: '请选择标签集',
  },
];

export const markTeamRule: Rule[] = [
  {
    required: true,
    message: '请选择标注团队',
  },
];

export const qualityTeamRule: Rule[] = [
  {
    required: true,
    message: '请选择质检团队',
  },
];

export const qualityRate: Rule[] = [
  {
    required: true,
    message: '请输入抽检比例',
  },
];

export const taskFinishDate: Rule[] = [
  {
    required: true,
    message: '请选择任务截取日期',
  },
];

export const emailRule: Rule[] = [
  {
    required: true,
    message: '请输入邮箱!',
  },
  {
    type: 'email',
    message: '邮箱格式不正确!',
  },
];

// 数据集名称
export const dataNameRule: Rule[] = [
  {
    required: true,
    message: '请输入数据集名称!',
  },
  {
    pattern: /^[^\s]*$/,
    message: '禁止输入空格!',
  },
  {
    max: 32,
    message: '数据集名称不能超过32个字符!',
  },
];

// 数据集描述
export const dataDescribeRule: Rule[] = [
  {
    max: 200,
    message: '数据集描述不能超过200个字符!',
  },
];

// 数据集类型
export const dataTypeRule: Rule[] = [
  {
    required: true,
    message: '请选择数据集类型!',
  },
];

// 上传数据
export const dataUploadRule: Rule[] = [
  {
    required: true,
    message: '请上传数据!',
  },
];

// 标签集名称
export const labelSetNameRule: Rule[] = [
  {
    required: true,
    message: '请输入标签集名称!',
  },
  {
    max: 32,
    message: '标签集名称不能超过32个字符!',
  },
  {
    pattern: /^[^\s]*$/,
    message: '禁止输入空格!',
  },
];

// 标签集描述
export const labelSetDescribeRule: Rule[] = [
  {
    max: 200,
    message: '标签集描述不能超过200个字符!',
  },
];

// 审核意见
export const reviewDescribeRule: Rule[] = [
  {
    max: 200,
    message: '审核意见不能超过200个字符!',
  },
];

// 标签集类型
export const labelSetTypeRule: Rule[] = [
  {
    required: true,
    message: '请选择标签集类型!',
  },
];

// 标签集是否多选
export const isMultipleSelectTypeRule: Rule[] = [
  {
    required: true,
    message: '请选择标签是否多选!',
  },
];

// 标签名称
export const labelNameRule: Rule[] = [
  {
    required: true,
    message: '请输入标签名称!',
  },
  {
    max: 32,
    message: '标签名称不能超过32个字符!',
  },
  {
    pattern: /^[^\s]*$/,
    message: '禁止输入空格!',
  },
];

// 导入方式
export const importModeRule: Rule[] = [
  {
    required: true,
    message: '请选择导入方式!',
  },
];

// 上传文件
export const fileUploadRule: Rule[] = [
  {
    required: true,
    message: '请上传文件!',
  },
];
