import Select from '@/components/Select';
import Upload from '@/components/Upload';
import {
  DatePicker,
  Form,
  FormInstance,
  FormItemProps,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Radio,
} from 'antd';
import moment from 'moment';
import React, {
  createRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import styles from './index.module.less';

const TextArea = Input.TextArea;

type Obj = Record<string, any>;

export type ImperativeHandleProps = {
  showModal: () => void;
  hideModal: () => void;
  setFieldValue: any;
  handleOk: () => void;
};

export type FormItemType =
  | 'DatePicker'
  | 'Select'
  | 'Input'
  | 'Upload'
  | 'TextArea'
  | 'Password'
  | 'RadioGroup';

export type FormItemListProps = Partial<
  FormItemProps & {
    type: FormItemType;
    props: any;
  }
>[];

export type ModalFormProps = Partial<ModalProps> & {
  onSubmit: (data: any) => any;
  formItemList: FormItemListProps;
  ref?: any;
  formProps?: FormProps;
  initialValues?: Obj;
  open?: (data: any) => boolean;
  onCancel?: () => void;
};

const Password = Input.Password;
const RadioGroup = Radio.Group;

const COMP_MAP: Obj = {
  Upload,
  DatePicker,
  Select,
  Input,
  TextArea,
  Password,
  RadioGroup,
};

// 使用 React.forwardRef 技术， 让父组件可以调用子组件的方法
const ModalForm: React.FC<ModalFormProps> = React.forwardRef(
  (
    {
      formProps,
      onSubmit,
      formItemList,
      initialValues,
      children,
      open,
      onCancel,
      ...props
    },
    ref,
  ) => {
    const formRef = createRef<FormInstance<any>>();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
      formRef.current?.validateFields().then(async (values) => {
        const submitData = Object.keys(values).reduce(
          (data, key) => {
            let val = values[key];
            if (val instanceof moment) val = val.valueOf();
            data[key] = val;
            return data;
          },
          { ...initialValues },
        );
        const rs = onSubmit(submitData);
        try {
          if (rs instanceof Promise) {
            setConfirmLoading(true);
            await rs;
          }
          setVisible(open ? open(submitData) : false);
        } catch (error) {}
        setConfirmLoading(false);
      });
    };

    const handleCancel = () => {
      setConfirmLoading(false);
      setVisible(false);
      if (onCancel) onCancel();
    };

    const imperativeHandle = (): ImperativeHandleProps => ({
      showModal: () => setVisible(true),
      hideModal: () => handleCancel(),
      setFieldValue: (name: string, value: any) =>
        formRef.current?.setFieldValue(name, value),
        handleOk: () => handleOk(),
    });

    // 暴露给父组件调用的方法
    useImperativeHandle(ref, imperativeHandle);

    const Title: React.ReactNode = useMemo(
      () => (
        <div className={styles.header}>
          <span className={styles.title}>{props.title}</span>
        </div>
      ),
      [props.title],
    );

    return (
      <Modal
        width={'66rem'}
        destroyOnClose
        open={visible}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        className={styles.modal}
        confirmLoading={confirmLoading}
        {...props}
        title={Title}
      >
        <Form initialValues={initialValues} {...formProps} ref={formRef}>
          {formItemList.map((item, index) => {
            const Comp = COMP_MAP[item.type || 'Input'] || COMP_MAP.Input;

            return (
              <React.Fragment key={index}>
                {!item.children && (
                  <Form.Item {...item}>
                    <Comp style={{ width: '98%' }} {...item.props}>
                      {item.props.children}
                    </Comp>
                  </Form.Item>
                )}
                {/* 有children，就使用children的JSX */}
                {item.children && (
                  <Form.Item {...item}>{item.children}</Form.Item>
                )}
              </React.Fragment>
            );
          })}
          {children}
        </Form>
      </Modal>
    );
  },
);

export default ModalForm;
