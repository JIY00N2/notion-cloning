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
  // documentSidebarArea
  const $postListContainer = document.createElement('div');
  $postListContainer.classList.add('document-list__container');
  $target.appendChild($postListContainer);
  // documentEditArea
  const $postEditContainer = document.createElement('div');
  $postEditContainer.classList.add('document-edit__container');
  $target.appendChild($postEditContainer);

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

/*
컴포넌트 초기화:
$documentSidebarArea와 $documentEditArea라는 두 개의 div 요소를 생성하고, 각각 클래스를 추가하여 스타일링을 적용합니다.
$target 요소에 $documentSidebarArea와 $documentEditArea를 추가합니다.


페이지 및 컴포넌트 초기화:
SidebarDocumentPage, HomePage, DocumentEditPage 컴포넌트를 초기화합니다.
SidebarDocumentPage는 $documentSidebarArea를 $target으로 받아 초기화됩니다.
HomePage는 $documentEditArea를 $target으로 받아 초기화됩니다.
DocumentEditPage는 $documentEditArea, 초기 상태 객체, 그리고 renderDocumentTree 함수를 인자로 받아 초기화됩니다.


라우팅 로직:
route 함수는 현재 URL 경로를 기반으로 페이지를 렌더링하는 로직을 담고 있습니다.
$documentEditArea의 내용을 지우고, 현재의 URL 경로를 확인합니다.
경로가 /documents/로 시작하는 경우, 해당 문서 편집 페이지를 렌더링합니다. 
문서 ID를 추출하여 DocumentEditPage의 상태를 업데이트합니다.
그렇지 않은 경우, SidebarDocumentPage와 HomePage를 렌더링합니다.


이벤트 핸들링:
popstate 이벤트 리스너를 등록하여 브라우저의 뒤로 가기 버튼 등에 의한 URL 변경을 감지합니다. 
변경되는 URL에 따라 route 함수를 호출하여 페이지를 업데이트합니다.
initRouter 함수를 사용하여 초기 라우터 설정을 수행합니다. 
onRoute 콜백 함수는 route 함수를 호출하도록 설정되어 있습니다.
초기 라우터 설정과 popstate 이벤트 리스너 등록 후, this.route()를 호출하여 초기 페이지를 렌더링합니다.



이 코드는 단순히 App 컴포넌트의 초기화와 페이지 렌더링을 담당하는 로직을 포함하고 있습니다. 
라우터, 페이지 간 전환, 초기 상태 설정 등을 다루는 내용이 더 자세히 필요한 경우 해당 내용에 대해서 추가로 설명해 드릴 수 있습니다.

*/
