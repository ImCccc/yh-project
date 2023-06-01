import { useEffect, useState } from 'react';

import { AppServiceAppTypeList } from '@/services/speechOpen/AppService';

function useAppTypeList() {
  const [typeList, setTypeList] =
    useState<{ value: number | string; label: string }[]>();
  useEffect(() => {
    AppServiceAppTypeList({}).then((data) => {
      setTypeList((data.list || []).map((label) => ({ value: label, label })));
    });
  }, []);
  return { typeList };
}

export default useAppTypeList;
