import Editor from './Editor';
import BottomDocumentList from './BottomDocumentList';
import notionStorage from '../store/notionStorage';
import debounce from '../domain/debounce';
import { validateComponent, validateString } from '../utils/validation';
import { updateDocument, getDocument } from '../domain/apiCall';
import { TEMP_DATA_MESSAGE } from '../constants';

export default function PostEditPage({ $target, initialState, renderDocumentList }) {
  validateComponent(new.target);

  const $page = document.createElement('div');
  $page.classList.add('edit-page');

  validateString(initialState.posts);
  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: '',
    },
    editDocument: (post) => {
      saveStorage(post);
      saveServer(post);
    },
  });

  const bottomDocumentList = new BottomDocumentList({
    $target: $page,
    initialState: [],
  });

  const saveStorage = debounce((post) => {
    notionStorage.setItemToStorage(postLocalSaveKey, {
      ...post,
      tempSaveDate: new Date(),
    });
  }, 500);

  const saveServer = debounce(async (newpost) => {
    await updateDocument(newpost.id, newpost);

    notionStorage.removeItemToStorage(postLocalSaveKey);
    renderDocumentList();

    const post = await getDocument(newpost.id);
    bottomDocumentList.setState(post);
  }, 1000);

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();

    if (this.state.post) {
      bottomDocumentList.setState(this.state.post);
      editor.setState(this.state.post);
    }
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    const post = await getDocument(postId);
    const tempPost = notionStorage.getItemToStorage(postLocalSaveKey, {
      title: '',
      content: '',
    });

    if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
      if (confirm(`${TEMP_DATA_MESSAGE}`)) {
        this.setState({
          ...this.state,
          post: tempPost,
        });
        return;
      }
    }

    this.setState({
      ...this.state,
      post,
    });
  };

  this.render = () => {
    $target.appendChild($page);
  };
}

// debounce -> 이벤트 발생 횟수를 줄일 수 있음
// 입력을 연속으로 할 때는 이벤트 발생을 지연시키다가
// 입력을 멈췄고 일정 시간이 지났을 때, 지연시킨 이벤트를 실행시킴

/* 
1. 로컬스토리지에서 임시로 넣은 값들이 있는지 체크
2. editor를 만드는 것 - 입력이 생길때 마다 onEditing이라는 값의 콜백으로
계속 업데이트 된다는 신호를 주고, debounce를 이용해서 매번 editing이 발생했을때마다
처리하는 것이 아니라 2초 동안 작업이 연속되지 않는 경우에만 로컬 스토리지에 저장하고,
DB에 전송(로컬스토리지에 저장하는 시간0.1초과, DB에 전송하는 시간3초을 따로 할 수도 있을 것 같다!)
3. editor는 두개의 필드가 존재(title, contents) 두개의 값이 업데이트 될 떄마다 keyup 이벤트를 이용해서
현재 editor state를 바꾸고 바뀐 값을 계속해서 onEditing 콜백을 호출
*/
