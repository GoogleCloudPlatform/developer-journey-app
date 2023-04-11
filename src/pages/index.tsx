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
import PromptPanel from "../components/prompt-panel";
import TileBoard from "../components/tile-board";
import GameControls from "../components/game-controls";
import Inventory from "../components/inventory";
import Head from "next/head";
import SignInRecommendation from "src/components/sign-in-recommendation";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Home | Developer Journey App</title>
      </Head>
      <main>
        {status === "authenticated" ? (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <PromptPanel />
            <TileBoard />
            <GameControls />
            <Inventory />
          </div>
        ) : (<SignInRecommendation />)}
      </main>
    </>
  )
}
