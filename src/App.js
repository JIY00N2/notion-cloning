import PostPage from './components/PostsPage.js';
import PostEditPage from './components/PostEditPage.js';
import { initRouter } from './domain/router.js';

// url 규칙
// 루트: postPage 그리기
// /posts/{id} - id에 해당하는 post 생성
// /posts/new - 새 post 생성

export default function App({ $target }) {
  const postsPage = new PostPage({
    $target,
  });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  });
  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;
    if (pathname === '/') {
      postsPage.setState();
    } else if (pathname.indexOf('/posts/') === 0) {
      const [, , postId] = pathname.split('/');
      postEditPage.setState({ postId });
    }
  };
  this.route();
  initRouter(() => this.route());
}

// 1. pageComponent를 생성해 놓고 있는 것
// 2. routeComponent를 통해서 url path에 따라서 어떤 페이지를 렌더링 할 것 인지하는 로직
// 3. customEvent를 통해 라우팅 처리
