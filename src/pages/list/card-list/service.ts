import { request } from '@umijs/max';
import type { CardListItemDataType } from './data.d';

/* export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/api/card_fake_list', {
    params,
  });
} */

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/device/detail', {
    params,
  });
}

export function enableDevice(title: string): Promise<any> {
  return request(`/device/enable/${title}`, {
    method: 'POST',
  });
}

/**
 * 禁用单个设备
 * @param deviceId - 设备的ID
 */
export function disableDevice(title: string): Promise<any> {
  return request(`/device/disable/${title}`, {
    method: 'POST',
  });
}

/**
 * 启用所有设备
 */
export function enableAllDevices(): Promise<any> {
  return request(`/api/devices/enableAll`, {
    method: 'POST',
  });
}

/**
 * 禁用所有设备
 */
export function disableAllDevices(): Promise<any> {
  return request(`/api/devices/disableAll`, {
    method: 'POST',
  });
}