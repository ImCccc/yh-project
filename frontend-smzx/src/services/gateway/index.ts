import request from '@/utils/request';

// gateway.smzx.inrobot.cloud/rpc/rms/RmsMapService.GetMapList
export async function GetMapList() {
  return request<{
    data: {
      id: string;
      map_name: string;
    }[];
  }>('/rpc/rms/RmsMapService.GetMapList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { is_release: 'PUBLISHED', page: 0, size: 1000 },
  });
}
