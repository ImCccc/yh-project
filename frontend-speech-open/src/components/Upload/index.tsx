import { OssUploadWithPreSignedUrl } from '@/services/oss/Oss';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps, Button, Upload, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';

export type UploadFileProps = UploadProps & {
  value?: string;
  onChange?: (value: string) => void;
};

const UploadComp: React.FC<UploadFileProps> = ({
  onChange,
  children,
  value,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const _props: UploadProps = {
    maxCount: 1,
    name: 'file',
    showUploadList: false,
    customRequest: async (info) => {
      const file = info.file as UploadFile;
      try {
        setLoading(true);
        const { pre_signed_url, source_url } = await OssUploadWithPreSignedUrl({
          bucket: 'smzx',
          object: `app_upgrade/${file.uid}`,
        });
        await fetch(pre_signed_url, { method: 'PUT', body: file as any });
        message.success('上传成功!');
        setLoading(false);
        onChange && onChange(source_url);
      } catch (error) {
        setLoading(false);
        message.error('上传失败!');
      }
    },
    ...props,
  };

  return (
    <Upload disabled={loading} {..._props}>
      {!children && (
        <Button loading={loading} icon={<UploadOutlined />}>
          {value ? '重新上传' : '上传'}
        </Button>
      )}
      {value && (
        <a
          href={value}
          style={{ marginLeft: '2rem' }}
          onClick={(e) => {
            if (loading) return;
            if (!value) e.preventDefault();
            e.stopPropagation();
          }}
        >
          下载应用
        </a>
      )}
    </Upload>
  );
};

export default UploadComp;
