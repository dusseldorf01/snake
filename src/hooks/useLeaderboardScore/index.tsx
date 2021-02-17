import { useEffect } from 'react';
import { GameStatus } from '@/game/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { addScoreToLeaderboard } from '@/actions/leaderboard';

const useLeaderboardScore = ({
  score,
  status,
  level,
}:any) => {
  const { id, login } = useSelector(userStateSelector).data;
  const dispatch = useDispatch();
  useEffect(() => {
    // const dispatch = useDispatch();
    if (status === GameStatus.IS_OVER) {
      dispatch(addScoreToLeaderboard.request({
        params: {
          data: {
            data: {
              id,
              login,
              level,
              score: score[0],
            },
            ratingFieldName: 'score',
          },
        },
      }));
    }
  }, [status]);
};

export default useLeaderboardScore;
