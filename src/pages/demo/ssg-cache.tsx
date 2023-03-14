import {GetStaticPropsContext, GetStaticPropsResult} from "next";

interface PropsData {
  greeting: string,
}

// Next.js will call this function at build-time
export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PropsData>> {
  const data: PropsData = {
    greeting: "Hello",
  }

  return {
    props: data,
  };
}

export default function Page({greeting}: {greeting: string}) {
  return <div>{greeting}! This page was <strong>statically generated</strong> and is
    cacheable</div>;
}
