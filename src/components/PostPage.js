import { request } from '../domain/api';
import { push } from '../domain/router';
import { validateComponent } from '../utils/validation';
import Header from './Header';
import PostList from './PostList';
import { deleteDocument, createDocument } from '../domain/apiCall';
import { editDocumentMessages, USERNAME } from '../constants';

export default function DocumentPage({ $target }) {
  validateComponent(new.target);

  const $page = document.createElement('div');
  $page.classList.add('list-page');

  new Header({
    $target: $page,
    initialState: {
      user: `${USERNAME}`,
    },
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    deleteDocument,
    addDocument: async (id, className) => {
      if (className === 'add-button') {
        const document = {
          title: `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`,
          parent: id,
        };
        const newDocument = await createDocument(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      }
    },
  });

  const fetchList = async () => {
    const data = await request('/documents');
    postList.setState(data);
  };

  this.render = async () => {
    await fetchList();
    $target.appendChild($page);
  };

  this.render();
}

/*1. 페이지를 만든다.
2. page div안에는 postList, LinkButton 두개가 들어있음
3. postPageComponent가 렌더링 되면(render), fetchPosts()의 데이터를 불러오고,
불러온 데이터로 다시 렌더링
*/
