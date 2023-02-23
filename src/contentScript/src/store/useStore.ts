import { create } from "zustand";

export enum TViewState {
  MENU,
  LOADING,
  DATA_STREAM,
  ERROR,
  RESULT,
  LARGE_RESULT,
}

interface IStoreInitialState {
  error: string;
  result: string;
  viewState: TViewState;
}

interface IStoreInitialActions {
  setViewState: (viewState: TViewState) => void;
  setResult: (result: string) => void;
  setError: (error: string) => void;
  clearState: () => void;
}

const initialState: IStoreInitialState = {
  error: "",
  result: "",
  viewState: TViewState.MENU,
};

export const useStore = create<IStoreInitialState & IStoreInitialActions>(
  (set) => ({
    ...initialState,
    setViewState: (viewState) => set(() => ({ viewState })),
    setResult: (result) => set(() => ({ result })),
    setError: (error) => set(() => ({ error })),
    clearState: () => set(() => initialState),
  })
);
