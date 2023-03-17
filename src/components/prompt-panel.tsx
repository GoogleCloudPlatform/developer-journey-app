import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

import { LearningResource } from 'src/models/LearningResource';

export default function Component() {
  const {mission: currentMission, status} = useAppSelector((state: RootState) => state.game)

  return (
    <section className={styles.prompts}>
      <ul>
        <li>
          Welcome to
          {': '}
          {currentMission.title}
        </li>
        <li>
          Status:
          {' '}
          {status}
        </li>
      </ul>
      To learn more, check out these learning resources:
      <ul>
        {currentMission.learningResources.map((learningResource: LearningResource) => (
          <li key={learningResource.link}>
            <a href={learningResource.link}>
              {learningResource.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}




