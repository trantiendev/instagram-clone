import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

const SuggestedProfile = ({ profileDocId, username, profileId, userId, loggedInUserDocId }) => {
  const { user: { following } = {} } = useContext(LoggedInUserContext);
  const [followed, setFollowed] = useState(false);
  const [profileIdFollowed, setProfileIdFollowed] = useState(false);

  useEffect(() => {
    const profile = following.find((item) => item === profileId);

    return () => {
      if (profile !== undefined) setProfileIdFollowed(true);
    };
  }, [followed]);

  const handleFollowUser = useCallback(async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }, [followed]);

  return !profileIdFollowed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        {followed ? 'Following' : 'Follow'}
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};
