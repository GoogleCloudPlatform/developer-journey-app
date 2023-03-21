import Image from 'next/image'
import { missions } from 'src/initialData.ts/missions'
import { useGetUserQuery } from 'src/redux/apiSlice';

export default function MissionHistory() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isSuccess) {

    return (
      <section className="bg-slate-100 text-slate-100 rounded-r-xl p-8 dark:bg-slate-800 my-4 col-span-11 space-y-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Mission</th>
                <th scope="col" className="px-6 py-3">Technologies</th>
                <th scope="col" className="px-6 py-3">Learning Resources</th>
              </tr>
            </thead>
            <tbody>
              {user.completedMissions.map((missionId, index) => {
                const mission = missions.find(mission => mission.id === missionId);
                if (!mission) return null;
                return (
                  <tr key={`${mission.id}${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{mission.title}</td>
                    <td className="px-6 py-4 flex">
                      {mission.technologies.map(technology => (
                        <Image
                          key={technology}
                          src={`./google-cloud-icons/${technology}.svg`}
                          alt={`icon of ${technology}`}
                          width='50'
                          height='50'
                        />
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {mission.learningResources.map(learningResource => (
                        <a
                          key={learningResource.link}
                          href={learningResource.link}
                        >
                          {learningResource.title}
                        </a>
                      ))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // TODO: Better fall through logic, but can't return 'Element | undefined'
  return <div>Something has gone terribly wrong with mission-history.tsx</div>
}




