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
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from "../../lib/database";
import { User } from 'src/models/User';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const fs = new Database();
  const session = await getSession({ req });
  const username = session?.user?.name || '';
  if (!username) {
    return res.status(200).send({ username, completedMissions: [] });
  }

  if (req.method === 'POST') {
    const missionId = req.body.id;
    await fs.addCompletedMission({ username, missionId })
  }

  const user = await fs.getUser({ username });
  res.status(200).json(user)
}
