import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router";

export default function PathNavigator({ orderId }) {
  // const pathname = useLocation().pathname;
  // const segments = pathname.split("/").filter(Boolean);
  // console.log(segments);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link
        to={"/account"}
        className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        Account
      </Link>
      <Link
        to={"/account/orders"}
        className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        Orders
      </Link>
      <Typography color="text.secondary">{orderId}</Typography>
    </Breadcrumbs>
  );
}
