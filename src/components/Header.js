import { push } from '../domain/router';
import { validationComponent } from '../utils/validation';

export default function Header({ $target, initialState }) {
  validationComponent(new.target);

  const $header = document.createElement('div');
  $header.classList.add('sidebar-header');
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    const { user } = this.state;
    $header.innerHTML = `
      <div class="user">
        <h2>${user}의 Notion</h2>
      </div>
    `;
  };
  this.render();

  $header.addEventListener('click', () => {
    push('/');
  });
}
