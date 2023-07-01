import { push } from '../domain/router';
import { validationComponent } from '../utils/validation';

export default function SidebarList({ $target, initialState }) {
  validationComponent(new.target);

  const $sidebarList = document.createElement('div');
  $target.appendChild($sidebarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];
    this.render();
  };

  const sidebarList = (list) => {
    const text = `
    <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
        <div class="documents-tree">
          <li data-id="${id}">${title}</li>
          ${documents.map((document) => sidebarList([document])).join('')}
        </div>
      `,
        )
        .join('')}
    </ul>
    `;
    return text;
  };

  this.render = () => {
    const documentsList = sidebarList(this.state);
    $sidebarList.innerHTML = `<div>${documentsList}</div>`;
  };

  this.render();

  $sidebarList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const id = $li.dataset.id;
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}
