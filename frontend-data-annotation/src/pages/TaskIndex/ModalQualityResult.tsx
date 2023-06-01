import { PackageServiceGetPackageQualityResult } from '@/services/dataAnnotation/PackageService';
import { markTypeMapText } from '@/utils/globalData';
import { Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ModalQualityResult.module.less';

type CompProps = { open?: Record<string, string> | false };
type ResultProps = ANNOTATION.dataAnnotationQualityResult;

const Comp: React.FC<CompProps> = ({ open }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<ResultProps>();
  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (open === false) return setIsModalOpen(false);
    if (!open?.id) return;
    setIsModalOpen(true);
    PackageServiceGetPackageQualityResult({ mark_package_id: open.id }).then(
      (data) => setResult(data.item),
    );
  }, [open]);

  return (
    <Modal
      width="52rem"
      title="质检不通过"
      open={isModalOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <div className={styles.col}>
        <span className={styles.label}>任务名称: </span>
        <span>{result?.task_name}</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>标注类型: </span>
        <span>{markTypeMapText[result?.mark_type || '']}</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>标注样本数量: </span>
        <span>{result?.mark_sample_count}</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>抽检比例: </span>
        <span>{result?.quality_rate || 0}%</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>质检样本数量: </span>
        <span>{result?.quality_sample_count}</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>质检结果: </span>
        <span className="strong">不通过</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>质检描述: </span>
        <span className={styles.describe}>{result?.describe}</span>
      </div>
    </Modal>
  );
};

export default Comp;
