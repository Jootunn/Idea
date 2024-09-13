import Cookies from "universal-cookie";

export const getStoredUser = () => {
    const cookies = new Cookies(null, {path:"/"})
    const user = cookies.get("user_data");
    return user ? user : null;
  };