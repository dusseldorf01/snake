import { useEffect } from 'react';
import { GameStatus } from '@/game/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { addScoreToLeaderboard } from '@/actions/leaderboard';

const useLeaderboardScore = ({
  score,
  status,
  level,
}:{score: number[], status:GameStatus, level:number}) => {
  const { login } = useSelector(userStateSelector).data;
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === GameStatus.IS_OVER || status === GameStatus.PASSED) {
      dispatch(addScoreToLeaderboard.request({
        params: {
          data: {
            data: {
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
