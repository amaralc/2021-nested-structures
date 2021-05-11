import Head from 'next/head'
import { useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { useRouter } from 'next/router'

interface Person {
  name: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

const fetchData = () => {
  return useSWR(
    () => '/api',
    fetcher
  ) as SWRResponse<Person, Error>
}

export default function Home() {
  const { data, error } = fetchData()
  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head><title>Neest</title></Head>
      <h1>Hello {data.name}!</h1>
    </>
  )
}
