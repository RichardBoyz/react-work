import { useState, useEffect } from "react";
import { getUsers } from "../apis/users";

const User = () => {
  const { users, setUser } = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await getUsers(controller.signal);
        console.log(response);
        isMounted && setUser(response);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>沒有使用者</p>
      )}
    </article>
  );
};

export default User;
