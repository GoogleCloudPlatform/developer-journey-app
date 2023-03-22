import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

import { LearningResource } from 'src/models/LearningResource';

export default function Component() {
  const { mission: currentMission, allItemsCollected } = useAppSelector((state: RootState) => state.game)

  if (allItemsCollected) {
    return (
      <section className="bg-slate-100 text-slate-300 rounded-r-xl p-8 dark:bg-slate-800 my-4 col-span-2 space-y-4">
        <p>
          Huzzah Traveler! You have gathered all the necessary technologies and the treasure has been revealed!
        </p>
        <p>
          Take time to explore these learning resources to
          {' '}
          <span className='font-bold text-lg text-slate-100'>{currentMission.title}</span>
          {' '}
          before moving on to the next mission:
        </p>
        <ul className='list-disc font-bold text-lg text-slate-100'>
          {currentMission.learningResources.map((learningResource: LearningResource) => (
            <li key={learningResource.link}>
              <a href={learningResource.link} className="underline hover:text-blue-200">
                {learningResource.title}
              </a>
            </li>
          ))}
        </ul>
        <p>
          To see learning resources from all of your completed missions, visit your
          {' '}
          <a href='/mission-history' className="font-bold text-lg text-slate-100 underline hover:text-blue-200">
            Mission History
          </a>
        </p>
      </section>
    )
  }

  return (
    <section className="bg-slate-100 text-slate-300 rounded-r-xl p-8 dark:bg-slate-800 my-4 col-span-2 space-y-4">
      <p>
        Hello Traveler, you have started your journey in exploring Google Cloud.
        Your environment holds valuable technoligies that you must gather to complete your mission.
        To complete the mission, you must gather the technologies used to
        {' '}
        <span className='font-bold text-lg text-slate-100'>{currentMission.title}</span>
        .
      </p>
      <p className='block sm:hidden font-bold text-lg text-slate-100'>
        Click a tile adjacent to you to explore your environment.
      </p>
      <p className='hidden sm:block'>
        Use the
        {' '}
        <span className='font-bold text-lg text-slate-100'>Arrow Keys</span>
        {' '}
        to explore your environment.
      </p>
      <p>
        Good luck,
        <br />
        Senior Guides
      </p>
    </section>

  )
}




