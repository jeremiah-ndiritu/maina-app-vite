import { useRef } from "react";

export default function RegisterUser({ type }) {
  let action = type.toLowerCase();
  let usernameEl = useRef();
  let passwordEl = useRef();
  let phonenumberEl = useRef();
  async function handleRegister() {
    let formData = new FormData();
    action == "register" &&
      formData.append("username", `${usernameEl.current.value}`);
    formData.append("phonenumber", `${phonenumberEl.current.value}`);
    formData.append("password", `${passwordEl.current.value}`);

    let res = await fetch(`${import.meta.env.VITE_API_URL}/auth/${action}`, {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  }
  return (
    <div>
      <h3>{action == "register" ? "Register" : "Login"} here</h3>
      <div className={`auth ${action}`}>
        {action == "register" && (
          <label htmlFor="username">
            <h4>Enter name</h4>
            <input ref={usernameEl} type="text" name="username" id="username" />
          </label>
        )}
        <label htmlFor="phonenumber">
          <h4>Enter phonenumber</h4>
          <input
            ref={phonenumberEl}
            type="number"
            name="phonenumber"
            id="phonenumber"
          />
        </label>
        <label htmlFor="password">
          <h4>Enter password</h4>
          <input
            ref={passwordEl}
            type="password"
            name="password"
            id="password"
          />
        </label>
        <button onClick={handleRegister}> {action.toUpperCase()} </button>
      </div>
    </div>
  );
}
