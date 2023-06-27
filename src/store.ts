import { create } from 'zustand'
import { type BeatType, type ActType, type MODAL_TYPE } from './types'

type State = {
  modalType: MODAL_TYPE | null
  selectedAct: ActType | null
  selectedBeat: BeatType | null
}

type Action = {
  toggleModal: (viewType: State['modalType']) => void
  setSelectedAct: (act: State['selectedAct']) => void
  setSelectedBeat: (beat: State['selectedBeat']) => void
}

// Create your store, which includes both state and (optionally) actions
export const useStore = create<State & Action>(set => ({
  modalType: null,
  selectedAct: null,
  selectedBeat: null,
  toggleModal: viewType => set(() => ({ modalType: viewType })),
  setSelectedAct: act => set(() => ({ selectedAct: act })),
  setSelectedBeat: beat => set(() => ({ selectedBeat: beat })),
}))
