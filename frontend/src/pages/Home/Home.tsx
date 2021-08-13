import React, { useState } from 'react';
import { useUserData } from '../../hooks/userData';

import { User } from '../../types/user.type';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<string>('')
  const userData = useUserData(currentUser);

  return (
    <section>
      <h2>Home Data</h2>
      <input onBlur={(e) => setCurrentUser(e.currentTarget.value)} />
      {userData.map((u: User) => {
        return <div key={u.id}>{ u.name }</div>
      })}
    </section>
  );
}

export default Home;
