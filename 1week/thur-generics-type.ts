// 문제 1. 배열의 첫 번째 요소를 반환하는 함수를 작성하세요. 배열의 요소 타입에 관계없이 작동해야 합니다.
// 매개변수, 리턴타입 정의 필요 
function getFirstElement<T>(array:T[]):T | undefined {
  return array[0];
}

// 테스트 코드
console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(["a", "b", "c"])); // "a"
console.log(getFirstElement([])); // undefined

// 문제 2. 숫자 배열인지 문자열 배열인지 확인하는 함수를 작성하세요.
// 매개변수, 리턴타입 정의 필요 
function isNumberArray<T>(array:T[]):boolean {
    
    return array.every((item) => typeof item === "number");
}

// 테스트 코드
console.log(isNumberArray([1, 2, 3])); // true
console.log(isNumberArray(["a", "b", "c"])); // false
console.log(isNumberArray([])); // true (빈 배열은 숫자 배열로 간주)

// 문제3. 다음 조건을 만족하는 조건부 타입과 함수를 작성하세요.
// 조건부 타입 정의
type IsArray<T> = T extends Array<any> ? true : false;

// 조건부 타입을 활용한 함수
function checkArrayType<T>(value: T): string {

    if(Array.isArray(value)) {
        return "This is an array.";

    } else {
        return "This is not an array."
    }
}

// 테스트 코드
console.log(checkArrayType([1, 2, 3])); // "This is an array."
console.log(checkArrayType("Hello")); // "This is not an array."
console.log(checkArrayType({ key: "value" })); // "This is not an array."

// 문제4. 객체의 모든 속성에 대해 기본값을 추가하는 타입을 작성하세요.
// Mapped Type 정의
type WithDefault<T> = {
  [K in keyof T]: [T[K], T[K]];
};

// 테스트 코드
type Original = { id: number; name: string; isActive: boolean };
type WithDefaults = WithDefault<Original>;


// 기대 결과:
// type WithDefaults = {
//   id: [number, number];
//   name: [string, string];
//   isActive: [boolean, boolean];
// }

// 문제 5. 키와 값을 받아 객체를 생성하는 함수를 작성하세요.
function createObject<K extends PropertyKey, V>(key: K, value: V):{[P in K]:V} {

  return {[key]: value} as {[P in K]: V};
}

// 테스트 코드
console.log(createObject("id", 123)); // { id: 123 }
console.log(createObject("name", "Alice")); // { name: "Alice" }

// 문제 6. 사용자 정보를 나타내는 객체 배열에서 특정 속성만 추출하는 함수를 작성하세요.
// 매개변수, 리턴 타입 정의 필요 
function pluck<T, K extends keyof T>(array:T[], key: K):T[K][]  {
  
    return array.map(e => e[key]);
}

// 테스트 코드
const users2 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

console.log(pluck(users2, "id")); // [1, 2]
console.log(pluck(users2, "name")); // ["Alice", "Bob"]

