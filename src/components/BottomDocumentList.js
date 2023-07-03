import { push } from '../domain/router';
import { validateArray, validateComponent } from '../utils/validation';

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
    const id = $li.dataset.id;
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}
