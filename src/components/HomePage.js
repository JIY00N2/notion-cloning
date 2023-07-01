import { validationComponent } from '../utils/validation';
import { homePageMessages } from '../constants';

export default function HomePage({ $target }) {
  validationComponent(new.target);

  const $homePage = document.createElement('div');

  this.render = () => {
    $target.appendChild($homePage);
    $homePage.innerHTML = `
      <h1 class="home-title">${homePageMessages.HOME_TITLE}</h1>
      <ul class="home-list">
        <li>${homePageMessages.ADD_PAGE_MESSAGE}</li>
        <li>${homePageMessages.ADD_BUTTON_MESSAGE}<br>${homePageMessages.DELETE_BUTTON_MESSAGE}</li>
        <li>${homePageMessages.BACK_TO_HOME}</li>
      </ul>
    `;
  };
  this.render();
}
