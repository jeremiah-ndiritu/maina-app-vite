import { useState } from "react";
import RegisterUser from "../components/RegisterUser";
import "../components/styles/LoginPage.css";
export default function LoginPage() {
  let [type, setType] = useState("login");
  return (
    <div className="login-page">
      <div className="select-action">
        <label htmlFor="type">
          <input
            onChange={(e) => setType(e.currentTarget.id)}
            type="radio"
            name="type"
            id="login"
          />
          <h5>Login</h5>
        </label>
        <label htmlFor="type">
          <input
            onChange={(e) => setType(e.currentTarget.id)}
            type="radio"
            name="type"
            id="register"
          />
          <h5>Register</h5>
        </label>
      </div>
      <RegisterUser type={type} />
    </div>
  );
}
