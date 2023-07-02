import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import PostEditPage from './components/PostEditPage';
import { initRouter } from './domain/router';
import { validateComponent } from './utils/validation';

// url 규칙
// 루트: postPage 그리기
// /posts/{id} - id에 해당하는 post 생성
// /posts/new - 새 post 생성

export default function App({ $target }) {
  validateComponent(new.target);

  const $postEditContainer = document.createElement('div');
  const $postListContainer = document.createElement('div');
  $target.appendChild($postEditContainer);
  $target.appendChild($postListContainer);

  const postPage = new PostPage({
    $target: $postListContainer,
  });

  const homePage = new HomePage({
    $target: $postEditContainer,
  });

  const postEditPage = new PostEditPage({
    $target: $postEditContainer,
    initialState: {
      postId: 'new',
      posts: {
        title: '',
        content: '',
      },
    },
    renderDocumentList: () => {
      postPage.render();
    },
  });

  this.route = () => {
    $postEditContainer.innerHTML = '';
    const { pathname } = window.location;
    if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      postEditPage.setState({ postId });
    } else {
      postPage.render();
      homePage.render();
    }
  };

  window.addEventListener('popstate', () => this.route());

  this.route();
  initRouter(() => this.route());
}

// 1. pageComponent를 생성해 놓고 있는 것
// 2. routeComponent를 통해서 url path에 따라서 어떤 페이지를 렌더링 할 것 인지하는 로직
// 3. customEvent를 통해 라우팅 처리
