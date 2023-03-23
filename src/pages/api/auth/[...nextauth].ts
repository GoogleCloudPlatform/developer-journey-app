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
