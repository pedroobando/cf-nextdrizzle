import { personas } from '@/seed';

export default async function PageHome() {
  return (
    <>
      <h1 className="text-2xl text-blue-400">Testing </h1>

      <div className="p-4 flex w-full justify-center ">
        <table className="w-8/12">
          <thead className="">
            <tr className="bg-slate-50 h-10 border-1 border-slate-200">
              <th>Full name</th>
              <th>dni</th>
              <th>email</th>
              <th>phone</th>
              <th>roll</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((people) => (
              <tr key={people.id} className="leading-8.5">
                <td className="w-3/12">{people.fullname}</td>
                <td className="1/12">{people.dni}</td>
                <td className="1/12">{people.email}</td>
                <td className="1/12">{people.phone}</td>
                <td className="1/12">{people.roll}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
