import {createRef} from 'react';
import Select from '@/components/Select';
import {
  Form,
  Input,
  Modal,
  FormInstance,
  FormItemProps,
  ModalFuncProps,
} from 'antd';

type CompStrProps = 'Input' | 'Select';
const COMP_MAP: any = {
  Select,
  Input,
};

type ModalFormProps<T> = {
  formItemList: Partial<
    FormItemProps & {
      type: CompStrProps;
      props: any;
    }
  >[];
  onSubmit: (data: T) => any;
} & Partial<ModalFuncProps>;

type InitialValuesProps = Record<string, any>;

export default function useAddTask<T>({
  title,
  onSubmit,
  formItemList,
  ...props
}: ModalFormProps<T>) {
  const confirm = (initialValues?: InitialValuesProps) => {
    const formRef = createRef<FormInstance<T>>();
    Modal.confirm({
      content: (
        <Form initialValues={initialValues} ref={formRef}>
          {formItemList.map((item, index) => {
            const Comp = COMP_MAP[item.type || 'Input'];
            const props = item.props || {};
            return (
              <Form.Item
                key={index}
                style={{width: '98%'}}
                label={item.label}
                name={item.name}
                rules={item.rules}>
                <Comp {...props} />
              </Form.Item>
            );
          })}
        </Form>
      ),
      onOk: () =>
        new Promise<void>((resolve, reject) => {
          formRef.current
            ?.validateFields()
            .then(async (values) => {
              const rs = onSubmit({
                ...initialValues,
                ...values,
              });
              if (rs instanceof Promise) await rs;
              resolve();
            })
            .catch(() => reject());
        }),
      title: (initialValues ? '更新' : '新增') + title,
      width: '54rem',
      okText: '确定',
      cancelText: '取消',
      closable: true,
      centered: true,
      maskClosable: true,
      wrapClassName: 'dry-modal-confirm',
      ...props,
    });
  };

  const add = () => confirm();

  const updata = (initialValues: InitialValuesProps) => {
    confirm(initialValues);
  };

  return {add, updata};
}
