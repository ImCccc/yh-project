import { MemberServicePage } from '@/services/dataAnnotation/MemberService';
import { TeamServicePage } from '@/services/dataAnnotation/TeamService';
import { ListProps, roleMapText } from '@/utils/globalData';
import { useEffect, useState } from 'react';

type UserListProps = (ANNOTATION.dataAnnotationUser & { role: string })[];

const pageParmas = { page_index: 0, page_size: 10000 };
const params = { name: '', is_total: 1, ...pageParmas };

function useTeam(team_id?: string | null, quality_id?: string | null) {
  const [teamList, setTeamList] = useState<ListProps[]>([]);
  const [userList, setUserList] = useState<UserListProps>([]);
  const [qualityUserList, setQualityUserList] = useState<UserListProps>([]);

  useEffect(() => {
    TeamServicePage(params).then(({ list }) =>
      setTeamList(list.map((item) => ({ label: item.name, value: item.id }))),
    );
  }, []);

  useEffect(() => {
    if (!quality_id) return setQualityUserList([]);
    MemberServicePage({ ...pageParmas, team_id: quality_id }).then(({ list }) =>
      setQualityUserList(
        list.map((item) => {
          const roleCode = item.role_code;
          return { ...item, role: roleMapText[roleCode] || '' };
        }),
      ),
    );
  }, [quality_id]);

  useEffect(() => {
    if (!team_id) return setUserList([]);
    MemberServicePage({ ...pageParmas, team_id }).then(({ list }) =>
      setUserList(
        list.map((item) => {
          const roleCode = item.role_code;
          return { ...item, role: roleMapText[roleCode] || '' };
        }),
      ),
    );
  }, [team_id]);

  return { teamList, userList, qualityUserList };
}

export default useTeam;
