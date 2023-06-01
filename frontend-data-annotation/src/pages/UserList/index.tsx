import Admin from './Admin';
import TeamLeader from './TeamLeader';
import CompAuth from '@/components/CompAuth';

const Comp: React.FC = () => (
  <CompAuth admin={Admin} team={TeamLeader} />
);

export default Comp;