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
import Image from 'next/image'
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

export default function Component() {
  const { inventory } = useAppSelector((state: RootState) => state.game)

  return (
    <section className="bg-slate-800 text-slate-100 rounded-l-xl p-8 col-span-3 space-y-4">
      <h2>Inventory</h2>
      <div className='flex'>
        {inventory.filter(item => item.status === 'COLLECTED').map(({title}) => (
          <Image
            key={title}
            src={`./google-cloud-icons/${title}.svg`}
            alt={`icon of ${title}`}
            width='50'
            height='50'
          />
        ))}
      </div>
    </section>
  )
}
