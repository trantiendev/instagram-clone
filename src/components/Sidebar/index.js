import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import useUser from '../../hooks/useUser';

export default function Sidebar() {
  const { user: { docId = '', fullName, username, userId, following } = {} } = useUser();

  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
