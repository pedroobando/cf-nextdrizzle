import { insertPeoples } from '@/actions/getPeoples';

export async function GET(request: Request) {
  const insert = await insertPeoples();
  return Response.json(insert);
}
