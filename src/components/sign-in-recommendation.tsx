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
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function SignInRecommendation() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-80">
      <h1 className="text-3xl font-bold text-slate-100 float-right text-right">
        <ArrowUpIcon className="h-32 w-32 float-right" aria-hidden="true" />
        <br />
        Welcome to Developer Journey App.
        <br />
        Sign in to play!
      </h1>
    </div>
  )
}
