import { useCallback } from "react";
import Browser from "webextension-polyfill";
import { TMessages } from "../../../background/types/messages.type";
import { TViewState, useStore } from "../store/useStore";

export const useChatGPT = () => {
  const setViewState = useStore((state) => state.setViewState);
  const viewState = useStore((state) => state.viewState);
  const setResult = useStore((state) => state.setResult);
  const setError = useStore((state) => state.setError);

  const sendMessageThatActionClicked = useCallback(
    ({
        text,
        actionId,
        isNeedToUpdate,
      }: {
        text: string;
        actionId: number;
        isNeedToUpdate: boolean;
      }) =>
      async () => {
        setViewState(TViewState.LOADING);

        const port = Browser.runtime.connect();
        const listener = (msg: any) => {
          console.log("===== ", msg);
          if (msg?.text) {
            setResult(msg?.text);
          }
          if (msg.status === "STARTED") {
            setViewState(TViewState.LOADING);
          }
          if (msg.status === "DATA_STREAM") {
            if (viewState !== TViewState.LARGE_RESULT) {
              setViewState(TViewState.DATA_STREAM);
            }
          }
          if (msg.status === "DONE") {
            if (viewState !== TViewState.LARGE_RESULT) {
              setViewState(TViewState.RESULT);
            }
            port.disconnect();
          }
          if (msg.error) {
            setViewState(TViewState.ERROR);
            setError(msg.error);
            port.disconnect();
          }
        };

        port.onMessage.addListener(listener);
        port.postMessage({
          type: TMessages.USER_ACTION_CLICKED,
          data: {
            input: text,
            actionId,
            isNeedToUpdate,
          },
        });
      },
    []
  );

  return { sendMessageThatActionClicked };
};
