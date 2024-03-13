import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Check if persist:root key exists, if not, initialize it with an empty object
if (!localStorage.getItem("persist:root")) {
  localStorage.setItem(
    "persist:root",
    JSON.stringify({
      user: '{"currentUser":null,"isFetching":false,"error":false}',
      cart: '{"products":[],"quantity":0,"total":0}',
      _persist: '{"version":1,"rehydrated":true}',
    })
  );
}

const userExists = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root")).user
).currentUser;

const TOKEN = userExists
  ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser.accessToken
  : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
