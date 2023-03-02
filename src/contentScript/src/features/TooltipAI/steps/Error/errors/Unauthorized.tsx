import React from "react";
import { Link } from "@mui/material";

export const Unauthorized = () => (
  <span>
    Please log-in or sign-up at{" "}
    <Link href="https://chat.openai.com" target="_blank">
      https://chat.openai.com
    </Link>
  </span>
);
