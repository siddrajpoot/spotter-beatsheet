import { fetcher } from './hooks/useFetch'
import { type BeatType } from './types'

const BASE_API_URL = 'http://localhost:8080'

export const createAct = async (name: string) => {
  return fetcher(`${BASE_API_URL}/acts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
    }),
  })
}

export const editAct = async (id: number, name: string) => {
  return fetcher(`${BASE_API_URL}/acts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
    }),
  })
}

export const deleteAct = async (id: number) => {
  return fetcher(`${BASE_API_URL}/acts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export const createBeat = async (
  actId: number,
  newBeat: Omit<BeatType, 'id'>
) => {
  return fetcher(`${BASE_API_URL}/acts/${actId}/beats`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newBeat),
  })
}

export const editBeat = async (
  actId: number,
  beatId: number,
  updatedBeat: Omit<BeatType, 'id'>
) => {
  return fetcher(`${BASE_API_URL}/acts/${actId}/beats/${beatId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(updatedBeat),
  })
}

export const deleteBeat = async (actId: number, beatId: number) => {
  return fetcher(`${BASE_API_URL}/acts/${actId}/beats/${beatId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}
