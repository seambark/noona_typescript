// 1. 전자상거래 플랫폼에서 지역 코드에 따른 배송비를 계산하는 로직을 작성하세요.
// 지역 코드 타입 정의
type RegionCode = "US" | "EU" | "ASIA" | "AFRICA";

// 배송비 데이터 정의
const shippingCosts: Record<RegionCode,number> = {
  US: 10,
  EU: 15,
  ASIA: 20,
  AFRICA: 25,
};

// 배송비 계산 함수 작성
function calculateShippingCost(
  region: RegionCode,
  costs: Record<RegionCode,number>
): number {

  return costs[region];
}

// 테스트 코드
console.log(calculateShippingCost("US", shippingCosts)); // 10
console.log(calculateShippingCost("EU", shippingCosts)); // 15
console.log(calculateShippingCost("ASIA", shippingCosts)); // 20
console.log(calculateShippingCost("AFRICA", shippingCosts)); // 25
// console.log(calculateShippingCost("AUSTRALIA", shippingCosts)); // 에러 발생


// 2. 학생들의 점수를 기록하고 평균 점수를 계산하는 문제입니다.
// 학생 점수 데이터 정의
const scores: Record<string, number> = {
  Alice: 85,
  Bob: 92,
  Charlie: 78,
};

// 평균 점수 계산 함수 작성
function calculateAverageScore(scores: Record<string, number>): number {

  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
	return total/Object.keys(scores).length;
}

// 테스트 코드
console.log(calculateAverageScore(scores)); // 85


// 문제 3. 쇼핑몰에서 각 제품의 이름과 가격을 매핑하고, 특정 제품의 가격을 업데이트하는 기능을 구현하세요.
// 제품 가격 데이터 정의
const prices: Record<string,number> = {
  Laptop: 100,
  Phone: 500,
  Tablet: 300,
};

// 가격 업데이트 함수 작성
function updateProductPrice(
  prices: Record<string,number>,
  product: string,
  newPrice: number
): Record<string,number>{
  return {...prices,[product]: newPrice};
}

// 테스트 코드
console.log(updateProductPrice(prices, "Phone", 550));
// 기대 출력: { Laptop: 1000, Phone: 550, Tablet: 300 }
