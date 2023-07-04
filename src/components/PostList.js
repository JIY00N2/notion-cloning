import { push } from '../domain/router';
import { validateComponent, validateArray } from '../utils/validation';
// SidebarDocumentTree
export default function PostList({ $target, initialState, addDocument, deleteDocument }) {
  validateComponent(new.target);

  const $postList = document.createElement('div');
  // sidebar-document__tree
  $postList.classList.add('post-list');
  $target.appendChild($postList);

  validateArray(initialState);
  this.state = initialState;

  // nextState로 업데이트
  this.setState = (nextState) => {
    validateArray(nextState);
    this.state = nextState;
    this.render();
  };

  const drawUpDocumentList = (list) => {
    const text = `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <div class='documents-tree'>
        <li data-id="${id}">
        ▶️${title}
        <button class="add-button"> + </button>
        <button class="delete-button"> - </button>
        </li>
        ${documents.map((document) => drawUpDocumentList([document])).join('')}
      </div>
      `,
        )
        .join('')}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = drawUpDocumentList(this.state);
    const documentAddButton = `<button class="add-button">+ 페이지 추가하기</button>`;
    $postList.innerHTML = `
      <div class="list">${documentsList}${documentAddButton}</div>
    `;
  };

  this.render();

  $postList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const { className } = e.target;
    const id = $li?.dataset.id;
    if (className) {
      if (className === 'delete-button') {
        deleteDocument(id);
        return;
      } else {
        addDocument(id, className);
        return;
      }
    }
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

// ?. 객체 체인에서 속성에 안전하게 접근하고, 코드의 간결성과 에러 방지에 도움

/*

해당 코드는 문서 편집 페이지를 구성하는 DocumentEditPage 컴포넌트입니다. 
이 컴포넌트는 문서 편집기(Editor)와 문서 트리(MainDocumentTree)를 포함하고 있습니다.

컴포넌트 구성 요소:

Editor 컴포넌트: 
문서의 제목과 내용을 편집하는 입력 폼을 제공합니다. 
입력 내용이 변경되면 editDocument 함수를 호출하여 문서를 저장하고 서버에 업데이트합니다.

MainDocumentTree 컴포넌트: 
문서 트리를 표시하는 컴포넌트로, 문서 편집 페이지에서의 주요 문서 및 하위 문서를 트리 형태로 표시합니다.


주요 기능 및 동작:

문서 저장:
입력 폼(Editor)의 내용이 변경되면 editDocument 함수가 호출됩니다.
editDocument 함수는 로컬 스토리지와 서버에 문서를 저장합니다.
로컬 스토리지에는 일정한 시간 간격으로 저장하며, 서버에는 더 긴 시간 간격으로 저장합니다.

문서 불러오기:
fetchDocument 함수를 통해 문서를 불러옵니다.
먼저 서버에서 문서를 가져온 후, 로컬 스토리지에 임시로 저장된 문서와 비교하여 수정 시점을 확인합니다.
만약 임시 저장된 문서가 더 최근에 수정되었다면, 사용자에게 확인 메시지를 표시한 후 해당 문서로 상태를 업데이트합니다.
그렇지 않은 경우 서버에서 가져온 문서로 상태를 업데이트합니다.

상태 변경:
setState 함수를 통해 컴포넌트의 상태를 변경할 수 있습니다. 
상태가 변경되면 컴포넌트는 다시 렌더링됩니다.
상태 변경 시 문서 ID가 변경된 경우, fetchDocument 함수를 호출하여 새로운 문서를 불러옵니다.

그 외의 경우에는 상태를 업데이트하고 컴포넌트를 다시 렌더링합니다.
이 컴포넌트는 문서 편집 페이지의 기능을 담당하며, Editor와 MainDocumentTree 컴포넌트를 조합하여 완전한 문서 편집 환경을 제공합니다.

*/
