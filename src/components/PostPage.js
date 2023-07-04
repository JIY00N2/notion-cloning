import { request } from '../domain/api';
import { push } from '../domain/router';
import { validateComponent } from '../utils/validation';
import Header from './Header';
import PostList from './PostList';
import { deleteDocument, createDocument } from '../domain/apiCall';
import { editDocumentMessages, USERNAME } from '../constants';
// SidebarDocumentPage
export default function PostPage({ $target }) {
  validateComponent(new.target);

  // $sidebarDocumentPage
  const $page = document.createElement('div');
  $page.classList.add('list-page');

  new Header({
    $target: $page,
    initialState: {
      user: `${USERNAME}`,
    },
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    deleteDocument,
    addDocument: async (id, className) => {
      if (className === 'add-button') {
        const document = {
          title: `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`,
          parent: id,
        };
        const newDocument = await createDocument(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      }
    },
  });

  // fetchDocumentTree
  const fetchList = async () => {
    const data = await request('/documents');
    postList.setState(data);
  };

  this.render = async () => {
    await fetchList();
    $target.appendChild($page);
  };

  this.render();
}

/*1. 페이지를 만든다.
2. page div안에는 postList, LinkButton 두개가 들어있음
3. postPageComponent가 렌더링 되면(render), fetchPosts()의 데이터를 불러오고,
불러온 데이터로 다시 렌더링
*/

/*

주어진 코드는 SidebarDocumentPage 컴포넌트를 정의하는 것으로, 사이드바 영역에 문서 목록을 보여주는 페이지입니다. 
코드를 구성하는 주요 요소들은 다음과 같습니다:

$sidebarDocumentPage 요소 생성: 
div 요소를 생성하고 sidebar-document 클래스를 추가하여 사이드바 영역을 나타냅니다.

SidebarHeader 컴포넌트 생성: 
SidebarHeader 컴포넌트를 생성하여 $sidebarDocumentPage 요소 내에 추가합니다. 
SidebarHeader 컴포넌트는 사용자 정보를 표시하는 헤더 부분을 담당합니다.

SidebarDocumentTree 컴포넌트 생성: 
SidebarDocumentTree 컴포넌트를 생성하여 $sidebarDocumentPage 요소 내에 추가합니다. 
SidebarDocumentTree 컴포넌트는 문서 목록을 트리 형태로 표시하며, 초기 상태와 함께 삭제 및 추가 동작에 대한 처리를 수행합니다.

fetchDocumentTree 함수: 
서버로부터 문서 목록을 가져오는 비동기 함수입니다. 
request 함수를 사용하여 /documents 엔드포인트에 GET 요청을 보내고, 응답 데이터를 sidebarDocumentTree 컴포넌트의 상태로 설정합니다.

render 함수: 
페이지를 렌더링하는 비동기 함수입니다. 
fetchDocumentTree 함수를 호출하여 문서 목록을 가져온 후, $target 요소에 $sidebarDocumentPage 요소를 추가합니다.

따라서, SidebarDocumentPage 컴포넌트는 사이드바 영역에 사용자 정보와 문서 목록을 표시하고, 문서 추가 및 삭제 동작을 처리하는 역할을 수행합니다.

*/
