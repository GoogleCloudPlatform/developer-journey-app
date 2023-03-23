import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {label: "Username", type: "text", placeholder: "username"},
        email: {label: "Email", type: "text", placeholder: "email"},
        // password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials) {
          // Display an  error will be displayed advising the user to check
          // their details.
          return null;
        }

        const username = credentials.username;
        const email = credentials.email;
        const user = {id: "1", name: username, email: email};

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
