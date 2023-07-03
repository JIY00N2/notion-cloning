import { validateComponent, validateString } from '../utils/validation';
import { editDocumentMessages } from '../constants';

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  editDocument,
}) {
  validateComponent(new.target);

  const $editor = document.createElement('div');
  $editor.classList.add('editor');
  $target.appendChild($editor);

  validateString(initialState);
  this.state = initialState;

  // 이벤트 리스너를 제거하여 최초 클릭 이후에는 실행되지 않도록 함
  const handleInputClick = (e) => {
    if (e.target.value === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`) {
      e.target.value = '';
      // e.target.removeAttribute('placeholder');
      e.target.removeEventListener('click', handleInputClick);
    }
  };

  window.handleInputClick = handleInputClick; // 전역 범위에 함수 정의

  this.setState = (nextState) => {
    // 여기 유효성 검사가 안됨
    this.state = nextState;
    const { title, content } = this.state;
    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render = () => {
    const { title, content } = this.state;
    const titleValue = title === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}` ? '' : title;
    $editor.innerHTML = `
      <input class="editor-title" type='text' name='title' value="${titleValue}" placeholder='${editDocumentMessages.DOCUMENT_TITLE_PLACEHOLDER}' onclick="handleInputClick(event)"/>
      <textarea class="editor-content" name="content" placeholder='${editDocumentMessages.DOCUMENT_CONTENT_PLACEHOLDER}'>${content}</textarea>
    `;
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('click', handleInputClick);
  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = { ...this.state, title: e.target.value };
    this.setState(nextState);
    editDocument(this.state);
  });

  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);
    editDocument(this.state);
  });
}
