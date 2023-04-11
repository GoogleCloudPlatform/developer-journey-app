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
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import Link from 'next/link';
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

  if (isSuccess || isLoading) {
    return (
      <section className="bg-slate-100 text-slate-100 rounded-r-xl p-8 bg-slate-800 my-4 col-span-11 space-y-4">
        <div className="relative overflow-x-auto">
          {isLoading ? ('Loading...') : (<>
            <div className='mb-2'>
              {user.completedMissions.filter(missionId => missions.find(mission => mission.id === missionId)).length}
              {' '}
              Completed Missions
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-fit">
              {user.completedMissions.map((missionId, index) => {
                const mission = missions.find(mission => mission.id === missionId);
                if (!mission) return null;
                return (
                  <div key={`${mission.id}${index}`} className="max-w-sm w-full lg:max-w-full lg:flex">
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-900 rounded-b rounded p-4 flex flex-col justify-between leading-normal">
                      <div className="text-slate-100 font-bold text-xl mb-2">{mission.title}</div>
                      <div className="flex items-center">
                        <div className="text-sm">
                          <div className='flex mb-2'>
                            {mission.technologies.map(technology => (
                              <Image
                                key={technology}
                                src={`./google-cloud-icons/${technology}.svg`}
                                alt={`icon of ${technology}`}
                                width='50'
                                height='50'
                              />
                            ))}
                          </div>
                          <div>
                            Learning Resources
                            <ul className='list-disc'>
                              {mission.learningResources.map(learningResource => (
                                <li key={learningResource.link} className='mx-5'>
                                  <Link
                                    href={learningResource.link}
                                    className='flex underline'
                                    target='_blank'
                                  >
                                    {learningResource.title}
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>)}
        </div>
      </section>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // TODO: Better fall through logic, but can't return 'Element | undefined'
  return <div>Something has gone terribly wrong with mission-history.tsx</div>
}




