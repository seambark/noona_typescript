// string, number, boolean, null(의도에 의한 값이 없음), undefined(정해지지 않은 값이 없음음), symbol, bigint

// 문제 1. 다음 변수들의 타입을 지정해주세요.
let userName: string; // 예: 이름
let userAge: number; // 예: 나이
let isAdmin: boolean; // 예: 관리자 여부

userName = "Alice";
userAge = 25;
isAdmin = true;

// 문제 2. 아래 변수들에 적절한 타입과 초기값을 지정하세요.
let productName: string = "바나나"; // 상품 이름
let productPrice: number = 1000; // 상품 가격
let isAvailable: boolean = false; // 상품 재고 여부

console.log(
  `상품명: ${productName}, 가격: ${productPrice}, 재고 여부: ${isAvailable}`
);

// 문제 3. 두 숫자를 더하는 함수를 작성하고, 함수의 매개변수와 반환값에 타입을 지정하세요.
function addNumbers(n: number, s: number): number {
  return n + s;
}
console.log(addNumbers(5, 3));

// 문제 4. 주어진 값을 받아 문자열로 변환하는 함수를 작성하세요. 값이 null 또는 undefined라면 "값이 없습니다"를 반환합니다.
function stringifyValue(value: string | number | null | undefined): string {
  if (value == null || value == undefined) {
    return "값이 없습니다";
  }

  return value.toString();
}

// 함수 호출
console.log(stringifyValue(1)); // "1"
console.log(stringifyValue("Hello")); // "Hello"
console.log(stringifyValue(null)); // "값이 없습니다"
console.log(stringifyValue(undefined)); // "값이 없습니다"

// 문제 5. 아래 함수는 두 값을 비교하여 결과를 반환합니다. 느슨한 동등성(==)과 엄격 동등성(===)의 차이를 이해하고, 함수의 동작 결과를 예측하세요.
function compareValues(a: unknown, b: unknown): string {
  if (a === b) {
    return "엄격한 동등성";
  } else if (a == b) {
    return "느슨한 동등성";
  } else {
    return "동등하지 않음";
  }
}

// 함수 호출 예시
console.log(compareValues(5, "5")); //느슨한 동등성
console.log(compareValues(null, undefined)); // 느슨한 동등성
console.log(compareValues(false, 0)); // 느슨한 동등성
console.log(compareValues(NaN, NaN)); // 동등하지 않음
console.log(compareValues(42, 42)); // 엄격한 동등성성

// 문제 6. 주어진 값이 원시 타입인지 아닌지 확인하는 함수를 작성하세요.
function isPrimitive(value: unknown): boolean {
  let typeOfValue = typeof value;
  return typeOfValue !== "object" || value == null ? true : false;
}

// 함수 호출 예시
console.log(isPrimitive("Hello")); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
