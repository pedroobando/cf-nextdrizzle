import { getCloudflareContext } from '@opennextjs/cloudflare';

export const d1BindingDB = getCloudflareContext().env.DB as D1Database;
