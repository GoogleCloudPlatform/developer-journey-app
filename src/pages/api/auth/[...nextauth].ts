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
import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {label: "Username", type: "text", placeholder: "Username"},
      },
      async authorize(credentials) {
        if (!credentials || credentials.username.length < 1) {
          // Display an  error will be displayed advising the user to check
          // their details.
          return null;
        }

        const username = credentials.username;
        const user = { id: username, name: username };

        if (user) {
          return user;
        } else {
          // Display an  error will be displayed advising the user to check
          // their details.
          return null;
          // Or reject this callback with an Error to send the user to the error
          // page with the error message as a query parameter
        }
      }
    }),
  ],
};

export default NextAuth(authOptions);
