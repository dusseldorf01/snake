import Thread from '@/components/Thread';
import forumData from '@/forumData';
import AddThread from '@/components/AddThread';
import cssCommon from '@/styles/common.css';

const Forum = () => (
  <div className={cssCommon.pageHalfContent}>
    <h1 className={cssCommon.visuallyHidden}>Форум</h1>
    <h2 className={cssCommon.visuallyHidden}>Список тем</h2>
    <ul>
      {forumData.map(({
        id,
        createdAt,
        comments,
        login,
        title,
      }) => (
        <Thread
          key={id}
          id={id}
          createdAt={createdAt}
          comments={comments}
          login={login}
          title={title}
        />
      ))}
    </ul>
    <AddThread />
  </div>
);

export default Forum;
