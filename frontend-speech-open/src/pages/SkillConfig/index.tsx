import { useCallback, useEffect, useState } from 'react';

import { Button, message } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { useMobx } from '@/stores';

import {
  SkillServiceGetSelect,
  SkillServiceList,
  SkillServiceSelect,
} from '@/services/speechOpen/SkillService';

import styles from './index.module.less';

type ItemProps = SPEECHOPEN.speechopenSkill & {
  select?: boolean;
};

const Comp: React.FC = () => {
  const appInfo = useMobx('appInfo');
  const [items, setItems] = useState<ItemProps[]>([]);

  const requestData = useCallback(async (app_id: string) => {
    const { list } = await SkillServiceList({});
    try {
      const { skill_ids } = await SkillServiceGetSelect({ app_id });
      setItems(
        list.map((item) => ({ ...item, select: skill_ids.includes(item.id) })),
      );
    } catch (error) {
      setItems(list);
    }
  }, []);

  useEffect(() => {
    const app_id = appInfo.info?.appid;
    if (!app_id) return;
    requestData(app_id);
  }, [appInfo.info, requestData]);

  const selectItem = (index: number, item: ItemProps) => {
    items[index].select = !item.select;
    setItems([...items]);
  };

  const save = async () => {
    const app_id = appInfo.info?.appid;
    if (!app_id) return;
    const skill_ids = items.reduce<string[]>((data, cur) => {
      if (cur.select) data.push(cur.id);
      return data;
    }, []);
    await SkillServiceSelect({ app_id, skill_ids });
    message.success('保存成功!');
  };

  return (
    <div className={styles.wrap}>
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() => selectItem(index, item)}
          className={classNames({ [styles.selected]: item.select })}
        >
          {item.skill_name}
        </div>
      ))}
      <footer className={styles.bottom}>
        <Button onClick={save} type="primary" className={styles.button}>
          保存
        </Button>
      </footer>
    </div>
  );
};

export default observer(Comp);
