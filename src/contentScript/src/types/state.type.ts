export enum TViewState {
  MENU,
  LOADING,
  DATA_STREAM,
  ERROR,
  RESULT,
  LARGE_RESULT,
}

export interface IStoreInitialState {
  error: string;
  result: string;
  viewState: TViewState;
}

export interface IStoreInitialActions {
  setViewState: (viewState: TViewState) => void;
  setResult: (result: string) => void;
  setError: (error: string) => void;
  clearState: () => void;
}
