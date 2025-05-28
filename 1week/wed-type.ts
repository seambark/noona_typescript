
// 문제1. 상품(Product)과 할인(Discount) 정보를 병합하여 새로운 타입을 정의하고, 할인 적용 후의 가격을 계산하는 함수를 작성하세요.

// Product 타입 정의
type TProduct = {
    id: number,
    name: string,
    price: number,
} 

// Discount 타입 정의
type Tdiscount = TProduct & {
    discountPercentage: number,
}

function calculateDiscountedPrice(item: Tdiscount): number {
  // 여기에 구현
  let price = item.price;
  let savePrice = price * (item.discountPercentage/100);

  return price - savePrice;
}

// 테스트 코드
const discountedProduct = {
  id: 101,
  name: "Laptop",
  price: 1000,
  discountPercentage: 20,
};

console.log(calculateDiscountedPrice(discountedProduct)); // 800


// 문제2. 아래의 조건에 따라 복합 데이터를 처리하는 타입을 정의하고, 관련된 함수를 작성하세요.
// ContactInfo 타입 정의
type ContactInfo = {
    phone: string,
    address: string
}

// OrderInfo 타입 정의
type OrderInfo = ContactInfo & {
    orderId: number,
    items: string[]
}

function printOrderSummary(order: OrderInfo): string {
    let orderId = order.orderId;
    let phone = order.phone;

  return `Order ${orderId} (Phone ${phone})`;
}

// 테스트 코드
const orderDetails = {
  phone: "123-456-7890",
  address: "123 Main St",
  orderId: 2023,
  items: ["Laptop", "Mouse"],
};

console.log(printOrderSummary(orderDetails)); // "Order 2023 (Phone: 123-456-7890)"


// 문제3. 사용자 프로필과 활동 기록 병합
// 기본 사용자 정보 타입 정의
type Profile = {
    id: number,
    name: string,
    email: string
}

// 사용자 활동 기록 타입 정의
type Activity = {
    lastLogin: Date,
    actions: string[]
}
// 사용자 데이터를 병합하는 함수
function mergeUserData (
  profile: Profile,
  activity: Activity
): Profile & Activity {
  return {...profile, ...activity};
}

// 사용자 요약 정보를 반환하는 함수
function getUserSummary(user: Profile & Activity): string {
  let userId = user.id;
  let name = user.name;
	let email = user.email;
	let logDate = user.lastLogin.toISOString();
	
	return `사용자 ${userId} - ${name} (${email}) - 마지막 로그인: ${logDate}`;
}

// 테스트 코드
const profile = { id: 1, name: "Alice", email: "alice@example.com" };
const activity = {
  lastLogin: new Date("2024-01-01T10:00:00Z"),
  actions: ["login", "viewed dashboard", "logout"],
};

const mergedUser = mergeUserData(profile, activity);
console.log(getUserSummary(mergedUser));
// 출력 예시: "사용자 1 - Alice (alice@example.com) - 마지막 로그인: 2024-01-01T10:00:00Z"
