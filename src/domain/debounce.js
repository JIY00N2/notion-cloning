export default function debounce(func, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/*
debounce 함수는 주어진 시간 동안 연속적으로 호출되는 함수를 지연시켜주는 기능을 제공합니다. 
이 함수는 일반적으로 사용자의 입력 또는 이벤트 핸들러 등에서 너무 자주 발생하는 호출을 제어하기 위해 활용됩니다.

함수에는 두 개의 매개변수가 있습니다:

func: 지연 적용할 함수입니다. 
이 함수가 호출되면 일정 시간 동안 실행이 지연됩니다.
delay: 함수 호출을 지연시킬 시간(ms)입니다. 
이 시간 동안 연속된 호출이 발생하면 처음 호출 이후에만 함수가 실행됩니다.
debounce 함수는 내부에서 타이머 변수 timer를 사용하여 함수 호출을 지연시킵니다. 
호출되는 즉시 이전에 설정된 타이머는 취소되고, 새로운 타이머가 설정됩니다. 
이렇게 함으로써 연속된 호출이 발생할 때마다 함수 실행이 연기되고, 마지막 호출 이후로 일정 시간이 경과해야만 함수가 실행됩니다.

내부에서 setTimeout 함수를 사용하여 지정된 delay 시간 이후에 함수를 실행합니다. 
실행할 때에는 이전에 저장된 context와 args를 사용하여 함수를 호출합니다. 
이렇게 하면 원래 함수가 지연 적용된 인자와 함께 실행될 수 있습니다.

debounce 함수는 주로 사용자 입력에 대한 실시간 검색, 자동 완성 기능, 스크롤 이벤트 처리 등과 같은 상황에서 불필요한 호출을 방지하고 성능을 향상시키는 데 유용합니다.

*/
