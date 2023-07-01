import { push } from '../domain/router';
import { validationComponent } from '../utils/validation';

export default function BottomDocumentList({ $target, initialState }) {
  validationComponent(new.target);

  const $bottomDocumentList = document.createElement('div');
  $bottomDocumentList.classList.add('sidebar-list');
  $target.appendChild($bottomDocumentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];
    this.render();
  };

  const bottomDocumentList = (list) => {
    const text = `
    <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
        <div class="sidebar-documents__tree">
          <li data-id="${id}">${title}</li>
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
    $bottomDocumentList.innerHTML = `<div>${documentsList}</div>`;
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
