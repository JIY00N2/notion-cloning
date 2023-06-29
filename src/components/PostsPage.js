import { request } from '../domain/api.js';
import LinkButton from './LinkButton.js';
import PostList from './PostList.js';

export default function PostPage({ $target }) {
  const $page = document.createElement('div');

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: 'New Post',
      link: '/posts/new',
    },
  });

  this.setState = async () => {
    const posts = await request('/posts');
    postList.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}

/*1. 페이지를 만든다.
2. page div안에는 postList, LinkButton 두개가 들어있음
3. postPageComponent가 렌더링 되면(render), fetchPosts()의 데이터를 불러오고,
불러온 데이터로 다시 렌더링
*/
