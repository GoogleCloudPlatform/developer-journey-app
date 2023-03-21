import { useGetUserQuery } from 'src/redux/apiSlice'


export default function Footer() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isSuccess) {
    return (
      <footer className="bg-slate-100 text-slate-100 p-4 bg-slate-800 mt-4 col-span-11 space-y-4">
        Google Cloud 2023
      </footer>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // TODO: Better fall through logic, but can't return 'Element | undefined'
  return <div>Something has gone terribly wrong with footer.tsx</div>
}



