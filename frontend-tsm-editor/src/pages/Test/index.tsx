import React from 'react';
// import Active from '@/components/FlowNode/Active';
import styles from './index.module.scss';
import {useMobx} from '@/stores';
import {observer} from 'mobx-react-lite';

type CompProps = {};

const Children = observer(() => {
  const TaskClassifyList = useMobx('TaskClassifyList');
  // console.log(TaskClassifyList.list.length);
  console.log('Children......', TaskClassifyList.selectOptions.length);
  // console.log(TaskClassifyList.state);
  return <div>Children</div>;
});

const Comp: React.FC<CompProps> = () => {
  console.log('Parent......');
  // const [total, setTotal] = useState<number>(0);
  const TaskClassifyList = useMobx('TaskClassifyList');
  const list = TaskClassifyList.list;

  console.log(JSON.stringify(list, null, 2));

  return (
    <div
      onClick={() => {
        // const clonelist = list.slice(0, 3).map((v) => {
        //   v.name = '22222222';
        //   return v;
        // });

        // TaskClassifyList.setTaskClassify({
        //   id: '43df6cc239574e04b1f89c067806e3e3',
        //   name: 'eeeeeeeeeeeee',
        //   code: 'groupCode6',
        // });

        TaskClassifyList.deleteTaskClassify('43df6cc239574e04b1f89c067806e3e3');
        // setTotal(total + 1);
        // TaskClassifyList.initData();
        // TaskClassifyList.setState();
        // TaskClassifyList.setTaskClassifyList([
        //   {
        //     id: 'string',
        //     name: 'name',
        //     code: 'string',
        //   },
        // ]);
      }}
      className={styles.t}>
      <Children />
    </div>
  );
};

export default observer(Comp);
