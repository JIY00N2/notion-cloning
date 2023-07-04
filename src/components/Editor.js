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

/*

해당 코드는 "Editor"라는 컴포넌트를 정의하는 코드입니다. 
이 컴포넌트는 문서 편집기를 표현하고, 사용자가 제목과 내용을 입력할 수 있는 입력 필드를 제공합니다.

initialState: 
초기 상태값을 받아옵니다. 제목(title)과 내용(content)을 포함합니다.

editDocument: 
문서 편집 시 호출되는 콜백 함수입니다. 
이 함수를 통해 편집된 문서 상태를 전달합니다.
컴포넌트 내부에서는 주어진 초기 상태값을 기반으로 편집기를 생성하고, 입력 필드의 변화에 따라 상태를 업데이트합니다. 
입력 필드의 값이 변경될 때마다 editDocument 콜백 함수를 호출하여 편집된 문서 상태를 전달합니다.

편집기는 render 메서드를 호출하여 초기화된 상태로 렌더링하고, 이후 상태 변경이 발생하면 setState 메서드를 통해 새로운 상태를 받아와 입력 필드의 값과 상태를 업데이트합니다.

handleTitleInputClick 함수는 제목 입력 필드를 클릭할 때 발생하는 이벤트를 처리합니다. 
초기 상태에서 특정 메시지가 표시되고, 클릭 시 해당 메시지가 사라지도록 처리합니다.

이벤트 리스너가 등록되어 있어 제목과 내용 입력 필드의 변화를 감지하고, 상태를 업데이트합니다. 
각 입력 필드의 값이 변경될 때마다 editDocument 콜백 함수를 호출하여 편집된 문서 상태를 전달합니다.
*/
