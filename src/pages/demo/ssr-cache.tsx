import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

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
    greeting: 'Hello',
  };

  return {
    props: data,
  };
}

export default function Page({greeting}: {greeting: string}) {
  return <div>{greeting}! This page was dynamically <strong>server-side
    rendered</strong> and is cacheable.</div>;
}
