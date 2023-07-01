import { push } from '../domain/router';
import { validationComponent } from '../utils/validation';
export default function PostList({ $target, initialState, addDocument, deleteDocument }) {
  validationComponent(new.target);

  const $postList = document.createElement('div');
  $target.appendChild($postList);

  // 값 체크 필수
  this.state = initialState;

  // nextState로 업데이트
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const drawDocumentList = (list) => {
    const text = `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <div class='documentsTree'>
        <li data-id="${id}">
        ${title}
        <button class="add-button"> + </button>
        <button class="delete-button"> - </button>
        </li>
        ${documents.map((document) => drawDocumentList([document])).join('')}
      </div>
      `,
        )
        .join('')}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = drawDocumentList(this.state);
    const documentAddButton = `<button class="add-button">➕ 페이지 추가하기</button>`;
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
