// 문제 1. 작업의 상태를 나타내는 enum을 작성하고, 상태에 따라 다른 메시지를 반환하는 함수를 작성하세요.
// 작업 상태를 나타내는 enum을 작성하세요.
enum TaskStatus {
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed",
}

function getStatusMessage(status: TaskStatus): string {
  // return status;
  switch(status) {
    case TaskStatus.Pending:
      return "작업이 대기 중입니다.";
    case TaskStatus.InProgress:
      return "작업이 진행 중입니다.";
    case TaskStatus.Completed:
      return "작업이 완료되었습니다.";
  }
}

// 테스트 코드
console.log(getStatusMessage(TaskStatus.Pending)); // "작업이 대기 중입니다."
console.log(getStatusMessage(TaskStatus.InProgress)); // "작업이 진행 중입니다."
console.log(getStatusMessage(TaskStatus.Completed)); // "작업이 완료되었습니다."

// 문제 2. 아래 조건에 따라 함수를 작성하세요.
// 작업 상태를 나타내는 enum 작성
enum TaskStatus2 {   
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed",
    Failed = "Failed",
}

function processTask(status: TaskStatus2, input: unknown): string {

  if(typeof input !==  "string") {
    throw new Error("입력값은 문자열이어야 합니다.");
  }

  switch(status) {
    case TaskStatus2.Pending:
      return input.toUpperCase();
    case TaskStatus2.InProgress:
      return input.toLowerCase();
    case TaskStatus2.Completed:
      return "완료:" + input;
    case TaskStatus2.Failed:
      throw new Error("작업이 실패했습니다.")
    default:
      throw new Error("에러");
  }
}

// 테스트 코드
console.log(processTask(TaskStatus2.Pending, "task1")); 
// 기대 출력: "TASK1"

console.log(processTask(TaskStatus2.InProgress, "TaskA")); 
// 기대 출력: "taska"

console.log(processTask(TaskStatus2.Completed, "Report1")); 
// 기대 출력: "완료: Report1"

// console.log(processTask(TaskStatus2.Failed, "TaskX")); 
// 에러: 작업이 실패했습니다.

// console.log(processTask(TaskStatus2.Pending, 42)); 
// 에러: 입력값은 문자열이어야 합니다.

try {
  console.log(processTask(TaskStatus2.Failed, "TaskX"));
  // 에러: 작업이 실패했습니다.
} catch (error) {
  console.error(error.message);
}

try {
  console.log(processTask(TaskStatus2.Pending, 42));
  // 에러: 입력값은 문자열이어야 합니다.
} catch (error) {
  console.error(error.message);
}

// 문제 3. 아래 조건에 따라 코드를 작성하세요.
// 로그 수준을 나타내는 enum 작성
enum Level {
  Info = "Info",
  Error = "Error",
  Debug = "Debug",
}

// 로그 함수 타입을 정의하세요.
type logType = (message:string, level:Level) => void;

// 로그 함수 구현
const logMessage:logType = (message, level) => {
  // 여기에 구현
  switch(level) {
      case Level.Info:
        return console.log("[INFO] "+ message);
      case Level.Error:
        return console.log("[ERROR] "+ message);
      case Level.Debug:
        return console.log("[DEBUG] "+ message);
    }
};

// 테스트 코드
logMessage("시스템이 시작되었습니다.",Level.Info);
logMessage("네트워크 연결 실패!", Level.Error);
logMessage("디버깅 모드 활성화", Level.Debug);

// 문제 4. 아래 조건을 만족하는 함수를 작성하세요.
function processAny(input: any): string {
  return input.toString();
}

function processUnknown(input: unknown): string | number {
  if(typeof input === "string") {
    return input.toUpperCase();
  } else if(typeof input === "number") {
    return input * 10;
  } else {
    throw new Error("에러")
  }
}

// 테스트 코드
console.log(processAny("hello")); // 기대 출력: "hello"
console.log(processAny(42)); // 기대 출력: "42"
console.log(processAny(true)); // 기대 출력: "true"

console.log(processUnknown("hello")); // 기대 출력: "HELLO"
console.log(processUnknown(42)); // 기대 출력: 420

try {
  console.log(processUnknown(true)); // 에러 발생
} catch (error) {
  console.error(error.message);
}