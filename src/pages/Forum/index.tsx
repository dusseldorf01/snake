import { useSelector } from 'react-redux';
import postsListSelector from '@/selectors/postsList';
import PostPreview from '@/components/PostPreview';
import AddPost from '@/components/AddPost';
import cssCommon from '@/styles/common.css';
import withDataLoader from '@/hocs/withDataLoader';
import Pagination from '@/components/Pagination';

const Forum = () => {
  const { data: { items } } = useSelector(postsListSelector);

  return (
    <div className={cssCommon.pageHalfContent}>
      <h1 className={cssCommon.visuallyHidden}>Форум</h1>
      {items.length !== 0 && (
        <>
          <h2 className={cssCommon.visuallyHidden}>Список тем</h2>
          <ul>
            {items.map(({
              id,
              commentsCount,
              createdAt,
              text,
              title,
              user,
            }) => (
              <PostPreview
                key={id}
                id={id}
                commentsCount={commentsCount}
                createdAt={createdAt}
                text={text}
                title={title}
                user={user}
              />
            ))}
          </ul>
          <Pagination />
        </>
      )}
      <AddPost />
    </div>
  );
};

export default withDataLoader(postsListSelector)(Forum);
