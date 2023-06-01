import {
  AUTHORITY_ADMIN,
  AUTHORITY_LEADER,
  AUTHORITY_MEMBER,
} from '@/config/constant';
import useAuth from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
const Comp: React.FC<{
  admin?: React.FC;
  mumber?: React.FC;
  team?: React.FC;
}> = ({ admin, mumber, team }) => {
  const Components = useAuth({
    [AUTHORITY_ADMIN]: admin,
    [AUTHORITY_MEMBER]: mumber,
    [AUTHORITY_LEADER]: team,
  });
  return Components ? <Components /> : <span></span>;
};

export default observer(Comp);
