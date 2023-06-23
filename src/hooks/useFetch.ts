/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'

const BASE_API_URL = 'http://localhost:8080'

async function fetcher<JSON>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    throw new Error('Network error')
  }

  return res.json() as Promise<JSON>
}

export function useFetch<T>(key: string) {
  const { data, error, isValidating, mutate } = useSWR<T, Error>(
    `${BASE_API_URL}${key}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  return {
    data,
    isLoading: isValidating,
    error,
    mutate,
  }
}
