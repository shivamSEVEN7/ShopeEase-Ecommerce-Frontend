import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router";
const Paginations = ({ paginationDetails }) => {
  const pathname = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const handlePageChange = (event, value) => {
    params.set("page", value);
    navigate(`${pathname}?${params.toString()}`);
  };
  return (
    <Pagination
      count={paginationDetails.totalPages}
      page={paramValue}
      variant="outlined"
      shape="rounded"
      onChange={handlePageChange}
    />
  );
};
export default Paginations;
