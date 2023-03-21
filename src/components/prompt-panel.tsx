import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

import { LearningResource } from 'src/models/LearningResource';

export default function Component() {
  const { mission: currentMission, allItemsCollected } = useAppSelector((state: RootState) => state.game)

  if (allItemsCollected) {
    return (
      <section className="bg-slate-100 text-slate-100 rounded-r-xl p-8 dark:bg-slate-800 col-span-2 space-y-4">
        <p>
          Huzzah Traveler! You have gathered all the necessary keys and the location of the treasure has been revealed!
          Hurry before the evil creatures of the forest block you.
        </p>
        <p>
          To learn more, check out these learning resources:
        </p>
        <ul className='list-disc'>
          {currentMission.learningResources.map((learningResource: LearningResource) => (
            <li key={learningResource.link}>
              <a href={learningResource.link} className="underline hover:text-blue-200">
                {learningResource.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section className="bg-slate-100 text-slate-100 rounded-r-xl p-8 dark:bg-slate-800 my-4 col-span-2 space-y-4">
      <p>
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




