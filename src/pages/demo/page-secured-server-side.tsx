import {GetServerSidePropsContext} from "next";
import {getServerSession} from "next-auth/next";
import {useSession} from "next-auth/react";
import {authOptions} from "../api/auth/[...nextauth]";


// Server-side rendered (called on every request)
export async function getServerSideProps({
  req,
  res
}: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(
          req,
          res,
          authOptions
      ),
    },
  };
}

export default function Page() {
  const {data: session} = useSession();

//  if (typeof window === "undefined") return null;

  if (session) {
    return <div>This server-side rendered page is <strong>secured</strong></div>;
  }

  return <p>Access Denied</p>;
}
