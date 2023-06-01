import { AuthorityType } from '@/config/constant';
import { useMobx } from '@/stores';

type DataProps<T> = {
  [key in AuthorityType]?: T;
};

function useAuth<T>(data: DataProps<T>, defauleValue?: T) {
  const User = useMobx('User');
  return data[User.role] || defauleValue;
}

export default useAuth;
