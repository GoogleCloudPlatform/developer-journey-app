// Static generation
export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Page() {
  return <div>This client-side rendered page is <strong>secured</strong></div>;
}
