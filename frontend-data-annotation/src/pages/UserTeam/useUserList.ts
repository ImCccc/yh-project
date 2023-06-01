import { UserServiceListSelect } from '@/services/dataAnnotation/UserService';
import { ListProps } from '@/utils/globalData';
import { useEffect, useState } from 'react';

function useUserList(team_id = '') {
  const [userList, setUserList] = useState<ListProps[]>([]);

  useEffect(() => {
    UserServiceListSelect({ team_id }).then(({ list }) => {
      setUserList(
        list.map((item) => ({
          label: `${item.name} (${item.email})`,
          value: item.id,
        })),
      );
    });
  }, [team_id]);

  return {
    userList,
  };
}
export default useUserList;
