import { deletePeople } from '@/actions/getPeoples';

export async function GET(request: Request) {
  const remove = await deletePeople();
  return Response.json(remove);
}
