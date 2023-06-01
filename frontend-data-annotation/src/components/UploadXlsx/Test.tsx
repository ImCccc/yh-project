import UploadXlsx from '@/components/UploadXlsx';

const Comp: React.FC = () => {
  // 导入成功回调
  const onSuccess = () => {
    console.log(1);
  };

  // 对导入的数据2次处理, 返回的值,会直接作为导入接口的参数
  const formatData = (list: any[]) => {
    return list;
  };

  return (
    <>
      <UploadXlsx
        uploadText="导入按钮文字"
        formatData={formatData}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default Comp;
