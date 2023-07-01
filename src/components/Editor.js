import { validationComponent } from '../utils/validation';

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  editDocument,
}) {
  validationComponent(new.target);

  const $editor = document.createElement('div');
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content } = this.state;
    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render = () => {
    const { title, content } = this.state;
    $editor.innerHTML = `
      <input type='text' name='title' value="${title}"/>
      <textarea name="content">${content}</textarea>
    `;

    // 개행처리가 안되는 이유?
    // 서버에서 내려오는 개행 값은 \n
    // textarea에서는 \n으로 개행을 처리해주는데 innerHTML은 replace를 이용해서 처리
  };

  this.render();

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
