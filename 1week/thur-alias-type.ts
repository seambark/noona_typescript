// 문제 1. 웹 애플리케이션에서 사용할 버튼의 스타일을 선택하는 함수를 작성하세요.
function getButtonClass(style: "primary" | "secondary" | "danger"): string {
  switch (style) {
    case "primary":
      return "btn-primary"
    case "secondary":
      return "btn-secondary"
    case "danger":
      return "btn-danger"
    default:
      throw new Error("Invalid button style");
  }
}

// 테스트 코드
console.log(getButtonClass("primary")); // "btn-primary"
console.log(getButtonClass("secondary")); // "btn-secondary"
console.log(getButtonClass("danger")); // "btn-danger"
// console.log(getButtonClass("unknown")); // 오류 발생

// 문제 2. 서버에서 데이터를 요청할 때 발생하는 상태를 처리하는 함수를 작성하세요.
function handleRequestState(state: "loading" | "success" | "error"): string {

  switch(state) {
    case "loading":
      return "Loading, please wait...";
    case "success":
      return "Request successful!";
    case "error":
      return "There was an error processing your request.";
    default:
      throw new Error("오류 발생");
  }
}

// 테스트 코드
console.log(handleRequestState("loading")); // "Loading, please wait..."
console.log(handleRequestState("success")); // "Request successful!"
console.log(handleRequestState("error")); // "There was an error processing your request."
// console.log(handleRequestState("unknown")); // 오류 발생
