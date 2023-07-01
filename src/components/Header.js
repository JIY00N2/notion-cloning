import { push } from '../domain/router';

export default function Header({ $target, initialState }) {
  const $header = document.createElement('div');
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
