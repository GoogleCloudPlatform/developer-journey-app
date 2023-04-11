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
import { useSession, } from "next-auth/react"

// Components
import SignInRecommendation from "../components/sign-in-recommendation";
import MissionHistory from "src/components/mission-history";
import Head from "next/head";

export default function MissionHistoryPage() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Mission History | Developer Journey App</title>
      </Head>
      <main>
        {status === "authenticated" ? (

          <div className="grid grid-cols-12 gap-3">
            <MissionHistory />
          </div>
        ) : (<SignInRecommendation />)}
      </main>
    </>
  )
}
