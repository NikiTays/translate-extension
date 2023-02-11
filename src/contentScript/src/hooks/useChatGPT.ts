import { useCallback, useState } from "react";
import {
  TMessages,
  TMessagesData,
} from "../../../background/types/messages.type";
import { sendMessage } from "../utils/sendMessage";

export const useChatGPT = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        const createdOnUserAt = Date.now();

        const data: TMessagesData[TMessages.USER_ACTION_CLICKED] = {
          input: text,
          actionId,
          isNeedToUpdate,
          createdOnUserAt,
        };

        setIsLoading(true);
        const { result } = await sendMessage(
          TMessages.USER_ACTION_CLICKED,
          data
        );
        setIsLoading(false);

        setResult(result);
      },
    []
  );

  return { sendMessageThatActionClicked, result, isLoading };
};
