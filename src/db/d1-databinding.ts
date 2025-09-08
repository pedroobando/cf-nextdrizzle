// 'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';

export const d1BindingDB = (await getCloudflareContext({ async: true })).env.DB as D1Database;
