export type ActType = {
  id: number
  name: string
}

export type BeatType = {
  id: number
  name: string
  time: string
  content: string
  cameraAngle: string
  notes: string
}

export type MODAL_TYPE =
  | 'CREATE_ACT'
  | 'CREATE_BEAT'
  | 'EDIT_BEAT'
  | 'DELETE_ACT'
  | 'DELETE_BEAT'

export type CAMERA_SHOT_TYPES =
  | 'Low angle shot'
  | 'Point of view shot'
  | 'Medium shot'
  | 'Wide shot'
  | 'Close up shot'
