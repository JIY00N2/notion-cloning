import { ROUTE_CHANGE_EVENT_NAME } from '../constants';
export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};
export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};

/*
라우터는 웹 애플리케이션에서 요청된 URL에 따라 적절한 처리를 수행하는 기능을 말합니다. 
웹 애플리케이션은 여러 페이지로 구성되어 있고, 각 페이지에는 고유한 URL이 있습니다.
라우터는 이 URL을 감지하고, 해당하는 페이지나 기능으로 사용자를 이동시키는 역할을 담당합니다.

일반적으로 웹 애플리케이션은 싱글 페이지 애플리케이션(Single Page Application, SPA) 형태로 구성되는 경우가 많습니다. 
이 경우에는 전체 페이지가 한 번 로드된 후, 페이지 간의 전환은 브라우저의 주소를 변경하면서 이뤄집니다. 
이때 라우터는 브라우저의 주소 변경을 감지하여 해당하는 컴포넌트나 페이지를 로드하고, 화면에 표시합니다.

라우터는 사용자가 주소를 직접 입력하거나, 링크를 클릭하거나, 애플리케이션 내에서 동적으로 주소를 변경할 때 사용됩니다. 
주소를 기반으로 어떤 컨텐츠를 보여줄지 결정하고, 필요한 데이터를 불러오거나 컴포넌트를 렌더링하는 등의 작업을 수행합니다. 
이를 통해 사용자 경험을 향상시키고, 웹 애플리케이션을 사용자 친화적이고 동적인 방식으로 제공할 수 있습니다.

라우터는 프론트엔드 개발에서 중요한 역할을 합니다. 
주로 JavaScript 라이브러리나 프레임워크를 사용하여 구현되며, React의 React Router, Vue의 Vue Router, Angular의 Angular Router 등이 대표적인 라우터 라이브러리입니다. 
이러한 라이브러리를 사용하면 라우팅 기능을 간편하게 구현할 수 있습니다.



initRouter 함수는 라우터를 초기화하는 역할을 합니다. 
매개변수로 onRoute 함수를 받으며, 라우터 이벤트가 발생할 때마다 해당 함수가 호출됩니다. 
window.addEventListener를 사용하여 ROUTE_CHANGE_EVENT_NAME 이벤트를 감지하고, 이벤트 핸들러 함수를 등록합니다. 
이벤트 객체의 detail 속성에서 nextUrl을 가져옵니다. 
만약 nextUrl이 존재한다면, history.pushState를 사용하여 브라우저의 주소를 변경하고, onRoute 함수를 호출합니다.
이를 통해 라우터 이벤트가 발생할 때마다 주소를 변경하고 적절한 동작을 수행할 수 있습니다.

push 함수는 주어진 nextUrl 값을 가지고 ROUTE_CHANGE_EVENT_NAME 이벤트를 발생시킵니다. 
window.dispatchEvent를 사용하여 커스텀 이벤트를 생성하고, 이벤트 객체의 detail 속성에 nextUrl을 담아 전달합니다. 
이를 통해 라우터 이벤트를 수동으로 발생시킬 수 있습니다.

이 두 함수를 함께 사용하면 간단한 클라이언트 사이드 라우팅을 구현할 수 있습니다.
push 함수를 호출하여 다음 주소로 이동하고, 
initRouter 함수에서 등록한 onRoute 핸들러 함수가 호출되어 해당 주소에 따른 동작을 수행합니다.
*/
