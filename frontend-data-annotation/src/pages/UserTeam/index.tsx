import CompAuth from '@/components/CompAuth';
import Admin from './Admin';
import Leader from './Leader';

const Comp: React.FC = () => <CompAuth admin={Admin} team={Leader} />;

export default Comp;
