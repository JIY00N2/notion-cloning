import { push } from '../domain/router';
import { validateComponent } from '../utils/validation';

export default function Header({ $target, initialState }) {
  validateComponent(new.target);

  const $header = document.createElement('div');
  $header.classList.add('sidebar-header');
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    const { user } = this.state;
    $header.innerHTML = `
      <div class="user">
        <h2 class="user-notion">📝 ${user}의 노션</h2>
      </div>
    `;
  };
  this.render();

  $header.addEventListener('click', () => {
    push('/');
  });
}
