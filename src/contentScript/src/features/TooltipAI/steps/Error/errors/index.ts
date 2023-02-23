import { TErrors } from "../../../../../../../background/types/error.type";
import { Cloudflare } from "./Cloudflare";
import { Unauthorized } from "./Unauthorized";
import { Unknown } from "./Unknown";

export const errorMessageComponentsMap = {
  [TErrors.CLOUDFLARE]: Cloudflare,
  [TErrors.UNAUTHORIZED]: Unauthorized,
  [TErrors.UNKNOWN]: Unknown,
};
