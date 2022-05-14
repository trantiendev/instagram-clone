import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/Profile';

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      const [user] = await getUserByUsername(username);

      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
