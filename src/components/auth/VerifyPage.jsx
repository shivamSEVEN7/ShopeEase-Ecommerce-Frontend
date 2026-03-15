import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyAccount } from "../../store/actions";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    if (token) {
      verifyAccount(token, setStatus);
    } else {
      setStatus("error");
    }
  }, [token]);

  const renderMessage = () => {
    switch (status) {
      case "loading":
        return <p>Verifying your account...</p>;
      case "success":
        return <p>Your account has been verified successfully!</p>;
      case "error":
        return <p>The token is either expired or invalid, unable to verify.</p>;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        textAlign: "center",
      }}
    >
      {renderMessage()}
    </div>
  );
};

export default VerifyPage;
