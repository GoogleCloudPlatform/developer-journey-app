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
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";

interface PropsData {
  greeting: string,
}

// Next.js will call this function for every request
// (if cache TTL has expired)
export async function getServerSideProps({res}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PropsData>> {
  // Must explicitly set Cache-Control for SSR pages.
  res!.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate'
  );

  const data: PropsData = {
    greeting: "Hello",
  }

  return {
    props: data,
  };
}

export default function Page({greeting}: {greeting: string}) {
  return <div>{greeting}! This page was dynamically <strong>server-side
    rendered</strong> and is cacheable.</div>;
}
