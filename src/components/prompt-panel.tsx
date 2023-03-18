import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

import { LearningResource } from 'src/models/LearningResource';

export default function Component() {
  const { mission: currentMission, allItemsCollected } = useAppSelector((state: RootState) => state.game)

  if (allItemsCollected) {
    return (
      <section className={styles.prompts}>
        <p>
          Huzzah Traveler! You have gathered all the necessary keys and the location of the treasure has been revealed!
          Hurry before the evil creatures of the forest block you.
        </p>
        <p>
          To learn more, check out these learning resources:
        </p>
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

  return (
    <section className={styles.prompts}>
      <p className={styles.typewriter}>
        Hello traveler, you have just entered the unknown forest of Google Cloud.
        The forest holds valuable keys that you must gather to complete your mission.
        To unlock the final treasure chest, you must gather the technologies used to
        {' '}
        {currentMission.title}.
      </p>
      <p>
        To explore the forest maze, you can navigate through using W (up), A (left), S (down), D (right) keys -
        and pick up the technologies by hitting Enter.
      </p>
      <p>
        Good luck,
        <br />
        GCP Elders
      </p>
    </section>

  )
}




