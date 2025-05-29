// 문제 1. 웹 애플리케이션에서 사용할 버튼의 스타일을 선택하는 함수를 작성하세요.
type ButtonStyle = "primary" | "secondary" | "danger";

function getButtonClass(style: ButtonStyle): string {
  return `btn-${style}`;
}

// 테스트 코드
console.log(getButtonClass("primary")); // "btn-primary"
console.log(getButtonClass("secondary")); // "btn-secondary"
console.log(getButtonClass("danger")); // "btn-danger"
// console.log(getButtonClass("unknown")); // 오류 발생

// 문제 2. 서버에서 데이터를 요청할 때 발생하는 상태를 처리하는 함수를 작성하세요.
type requestState = "loading" | "success" | "error";
function handleRequestState(state: requestState): string {
  // 여기에 구현
  if(state === "loading") {
    return "Loading, please wait...";
  } else if(state === "success") {
    return "Request successful!";
  } else if (state === "error") {
    return "There was an error processing your request.";
  }

  throw new Error("오류 발생");
  
}

// 테스트 코드
console.log(handleRequestState("loading")); // "Loading, please wait..."
console.log(handleRequestState("success")); // "Request successful!"
console.log(handleRequestState("error")); // "There was an error processing your request."
// console.log(handleRequestState("unknown")); // 오류 발생
