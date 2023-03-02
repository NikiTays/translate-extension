import React from "react";
import { Link } from "@mui/material";

export const Cloudflare = () => (
  <span>
    Your token has been expired, please refresh it by going to{" "}
    <Link href="https://chat.openai.com" target="_blank">
      https://chat.openai.com
    </Link>{" "}
    or log-in if refresh session is over
  </span>
);
