/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

import { LearningResource } from 'src/models/LearningResource';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Component() {
  const { mission: currentMission, allItemsCollected } = useAppSelector((state: RootState) => state.game)

  return (
    <>
      <section className="bg-slate-800 text-slate-300 rounded-r-xl p-8 my-4 col-span-2 overflow-hidden">
        <div className={`space-y-4 ${allItemsCollected ? 'opacity-100' : 'h-0 opacity-0'}`}>
          <div className={`space-y-4 transition-all ease-in-out delay-75 duration-1000 ${allItemsCollected ? 'opacity-100' : 'opacity-0'}`}>
            <p>
              Huzzah Traveler! You have gathered all the necessary technologies and the treasure has been revealed!
            </p>
            <p>
              Remember to collect the Cloud treasure to complete your mission.
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
                  <Link
                    href={learningResource.link}
                    className="flex underline hover:text-blue-200"
                    target='_blank'
                  >
                    {learningResource.title}
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              To see learning resources from all of your completed missions, visit your
              {' '}
              <Link href='/mission-history' className="font-bold text-lg text-slate-100 underline hover:text-blue-200">
                Mission History
              </Link>
            </p>
          </div>

        </div>
        <div className={`space-y-4 ${allItemsCollected ? 'h-0 opacity-0' : 'opacity-100'}`}>
          <div className={`space-y-4 transition-opacity ease-in-out delay-75 duration-1000 ${allItemsCollected ? 'opacity-0' : 'opacity-100'}`}>
            <p>
              Hello Traveler, you have started your journey in exploring Google Cloud.
              Your environment holds valuable technologies that you must gather to complete your mission.
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
              to explore your environment and use the
              {' '}
              <span className='font-bold text-lg text-slate-100'>Enter Key</span>
              {' '}
              to collect a technology.
            </p>
            <p>
              Good luck,
              <br />
              Senior Guides
            </p>
          </div>
        </div>
      </section>
    </>)
}




