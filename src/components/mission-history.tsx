import Image from 'next/image'
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'
import { missions } from 'src/initialData.ts/missions'

export default function MissionHistory() {
  const user = useAppSelector((state: RootState) => state.user)

  return (
    <div className={styles.missionHistory}>
      Completed Missions:
      <table>
        <tr>
          <th>Title</th>
          <th>Technologies</th>
          <th>Learning Resources</th>
        </tr>
        {user.completedMissions.map(missionId => {
          const mission = missions.find(mission => mission.id === missionId);
          if (!mission) return null;
          return (
            <tr key={mission.id}>
              <td>{mission.title}</td>
              <td>
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
              <td>
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
      </table>
    </div>
  )
}




