import { push } from '../domain/router';
import { validateArray, validateComponent } from '../utils/validation';

// MainDocumentTree
export default function BottomDocumentList({ $target, initialState }) {
  validateComponent(new.target);

  const $bottomDocumentList = document.createElement('div');
  $bottomDocumentList.classList.add('bottom-document__container');
  $target.appendChild($bottomDocumentList);

  validateArray(initialState);
  this.state = initialState;

  this.setState = (nextState) => {
    validateArray([nextState]);
    this.state = [nextState];
    this.render();
  };

  const bottomDocumentList = (list) => {
    const text = `
    <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
        <div class="bottom-documents">
          <li class="bottom-document__list" data-id="${id}">▶️${title}</li>
          ${documents.map((document) => bottomDocumentList([document])).join('')}
        </div>
      `,
        )
        .join('')}
    </ul>
    `;
    return text;
  };

  this.render = () => {
    const documentsList = bottomDocumentList(this.state);
    $bottomDocumentList.innerHTML = `<div class="bottom-documents__tree">${documentsList}</div>`;
  };

  this.render();

  $bottomDocumentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const id = $li?.dataset.id; // 수정
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

/*
해당 코드는 "MainDocumentTree"라는 컴포넌트를 정의하는 코드입니다. 
이 컴포넌트는 메인 영역에 문서 목록을 트리 형태로 표시하는 역할을 합니다.

initialState: 
초기 상태값을 받아옵니다.
컴포넌트 내부에서는 주어진 상태값을 기반으로 메인 영역의 문서 목록을 그리고, 문서 클릭 시 페이지 이동 기능을 처리합니다.

컴포넌트는 render 메서드를 호출하여 초기화된 상태로 렌더링하고, 이후 상태 변경이 발생하면 setState 메서드를 통해 새로운 상태를 받아와 다시 렌더링합니다.

클릭 이벤트 리스너가 등록되어 있어 문서 클릭 시 해당 문서의 id를 추출하여 페이지 이동을 수행합니다.

*/
