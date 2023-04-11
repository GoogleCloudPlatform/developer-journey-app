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
// Redux
import { RootState } from '../redux/store'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { moveUp, moveDown, moveLeft, moveRight, collectItem, startMission, setIsSavingMission } from '../redux/gameSlice'
import { useEffect } from 'react';
import { useAddCompletedMissionMutation, useGetUserQuery } from 'src/redux/apiSlice';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

export default function Component() {
  const { playerPosition, allItemsCollected, mission, isSavingMission } = useAppSelector((state: RootState) => state.game)
  const {
    data: user,
  } = useGetUserQuery();
  const playerOnFinalSquare = playerPosition.x === 2 && playerPosition.y === 2;
  const dispatch = useAppDispatch()

  const [addCompletedMission] = useAddCompletedMissionMutation()

  function keyPressHandler({ key, keyCode }: { key: string | undefined, keyCode: number | undefined }) {
    switch (key) {
      case 'w':
        return dispatch(moveUp())
      case 'a':
        return dispatch(moveLeft())
      case 's':
        return dispatch(moveDown())
      case 'd':
        return dispatch(moveRight())
    }

    switch (keyCode) {
      case 38: // up arrow
        return dispatch(moveUp())
      case 37: // left arrow
        return dispatch(moveLeft())
      case 40: // down arrow
        return dispatch(moveDown())
      case 39: // right arrow
        return dispatch(moveRight())
      case 13: // enter
        if (allItemsCollected && playerOnFinalSquare && user && !isSavingMission) {
          dispatch(setIsSavingMission(true));
          return addCompletedMission({ mission }).unwrap()
            .then(() => {
              dispatch(startMission({ nextMission: true }))
            })
            .catch(error => {
              console.error('addCompletedMission request did not work.', { error })
            }).finally(() => {
              dispatch(setIsSavingMission(false));
            });
        }
        return dispatch(collectItem())
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  });

  return (
    <section className="hidden sm:block bg-slate-800 rounded-r-xl p-8 col-span-2 space-y-4">
      <h2 className='text-slate-100'>Controls</h2>
      <section className="grid grid-cols-3 gap-3 w-fit">
        <div />
        <button
          className='text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded'
          aria-label="Move player up"
          onClick={() => dispatch(moveUp())}
        >
          <ArrowUpIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
        <div />
        <button
          className='text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded'
          aria-label="Move player left"
          onClick={() => dispatch(moveLeft())}
        >
          <ArrowLeftIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
        <button
          className='text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded'
          aria-label="Move player down"
          onClick={() => dispatch(moveDown())}
        >
          <ArrowDownIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
        <button
          className='text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded'
          aria-label="Move player right"
          onClick={() => dispatch(moveRight())}
        >
          <ArrowRightIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
      </section>
    </section >
  )
}




