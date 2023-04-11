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
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "src/redux/apiSlice";
import Tile from "./tile";

export default function Component() {

  const {
    isLoading,
    isError,
    error
  } = useGetUserQuery();

  const [showUhOh, setShowUhOh] = useState<Boolean>(false);
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(
    () => {
      if (isLoading) {
        let timer = setTimeout(() => setTimeExpired(true), 4000);
        return () => {
          clearTimeout(timer);
        };
      }
    },
    [isLoading]
  );


  if (isLoading && !timeExpired) {
    // a spinner
    return (
      <section onMouseEnter={() => setShowUhOh(true)} className="text-slate-300 bg-slate-800 rounded-l-xl my-4 col-span-3 space-y-4 p-4">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div className={`space-y-4 transition-all ease-in-out delay-1000 duration-1000 ${showUhOh ? 'opacity-100' : 'opacity-0'}`}>
          <p>
            Uh oh...
          </p>
          <p>
            This typically does not take this long.
          </p>
          <p>
            We will wait two more seconds and then show you an error message.
          </p>
        </div>
      </section>
    )
  }

  if (isError || (isLoading && timeExpired)) {
    return (
      <section className="bg-slate-200 rounded-l-xl my-4 col-span-3 space-y-4 p-4">
        <h2 className="text-2xl text-red-900">
          There was an error retrieving the user data.
        </h2>
        <p>
          If you are the application developer, the most common cause of failing to
          retrieve user data is not properly connecting to your Firestore database.
        </p>
        <h3 className="text-3xl">
          Developing Locally?
        </h3>
        <p>
          Make sure you have followed the steps to
          {' '}
          <Link
            href="https://github.com/GoogleCloudPlatform/developer-journey-app#if-you-want-to-run-the-firestore-emulator-locally"
            className='underline'
            target='_blank'
          >
            run the Firestore Emulator Locally
          </Link>
          .
        </p>
        <h3 className="text-3xl">
          Deploying to Cloud Run?
        </h3>
        <p>
          Make sure you have created your Firestore database.
          This should be done automatically, so if you are continuing to experience
          this issue, please let us know through a
          {' '}
          <Link
            href="https://github.com/GoogleCloudPlatform/developer-journey-app/issues"
            className='underline'
            target='_blank'
          >
            GitHub Issue
          </Link>
          .
        </p>
        {error ? (
          <>
            <h3 className="text-3xl">
              Here is the full error message:
            </h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </pre>
          </>
        ) : (
          <>
            <p>
              If you wait for the request to time out.
              We will display the full error message when it returns.
            </p>
          </>
        )}
      </section>
    )
  }

  return (
    <section className="bg-slate-800 rounded-l-xl my-4 col-span-3 space-y-4">
      <section className="grid grid-cols-3 gap-3 col-span-3 p-4">
        <Tile x={0} y={2} />
        <Tile x={1} y={2} />
        <Tile x={2} y={2} />
        <Tile x={0} y={1} />
        <Tile x={1} y={1} />
        <Tile x={2} y={1} />
        <Tile x={0} y={0} />
        <Tile x={1} y={0} />
        <Tile x={2} y={0} />
      </section>
    </section>
  )
}
