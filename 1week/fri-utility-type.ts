// 문제 1. 회원가입 폼 데이터의 일부만 채워진 상태를 처리하기 위해, 모든 속성이 선택적인 타입을 생성하는 문제입니다.
type User = {
  name: string;
  email: string;
  password: string;
};

type PartialUser = Partial<User>;

// 함수 작성
function updateUserForm(
  user: User,
  updates: PartialUser
): User {

  return {...user, ...updates};
}

// 테스트 코드
const currentUser = { name: "Alice", email: "alice@example.com", password: "1234" };
const updatedForm = { email: "new-email@example.com" };

console.log(updateUserForm(currentUser, updatedForm));
// 기대 출력: { name: "Alice", email: "new-email@example.com", password: "1234" }


// 문제 2. 프로필 페이지에 표시할 사용자 정보에서 필요한 속성만 선택하는 문제입니다.
type UserProfile = {
  id: number;
  name: string;
  email: string;
  address: string;
};

type ProfilePick = Pick<UserProfile,"id"|"name">;

// 함수 작성
function getProfileSummary(
  user: ProfilePick
): ProfilePick {
  return {id: user.id, name: user.name};
}

// 테스트 코드
const userProfile = { id: 1, name: "Alice", email: "alice@example.com", address: "123 Main St" };

console.log(getProfileSummary(userProfile));
// 기대 출력: { id: 1, name: "Alice" }


// 문제 3. 데이터베이스 저장 시 민감한 정보를 제외하는 문제입니다.
type User2 = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type UserOmit = Omit<User2, "password">;
// 함수 작성
function filterSensitiveInfo(
  user: User2
): UserOmit {
  const { password, ...userInfo } = user;
  return userInfo;
}

// 테스트 코드
const userInfo = { name: "Alice", email: "alice@example.com", password: "1234", role: "admin" };

console.log(filterSensitiveInfo(userInfo));
// 기대 출력: { name: "Alice", email: "alice@example.com", role: "admin" }


// 문제 4. 팀 관리 시스템을 설계하세요. 각 팀은 여러 멤버로 구성되며, 관리자는 특정 역할에 따라 데이터를 조작할 수 있습니다.
type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "developer" | "designer" | "manager";
  isActive: boolean;
};

// 1. `createTeamMember` 함수 작성
function createTeamMember(data: Partial<TeamMember>): TeamMember {
  return {
    id: data.id!,
    name: data.name || "",
    email: data.email || "",
    role: data.role || "developer",
    isActive: data.isActive ?? true,
  }
}

// 2. `filterTeamMembers` 함수 작성
function filterTeamMembers(
  members: TeamMember[],
  filter: Pick<TeamMember,"role"|"isActive">
): TeamMember[] {
  return members.filter(
    (m) => m.role === filter.role && m.isActive === filter.isActive
  )
}

// 3. `removeSensitiveInfo` 함수 작성
function removeSensitiveInfo(
  members: TeamMember[]
): Omit<TeamMember, "email">[] {
  return members.map(({email, ...rest}) => rest);
}

// 테스트 코드
const members: TeamMember[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "developer", isActive: true },
  { id: 2, name: "Bob", email: "bob@example.com", role: "designer", isActive: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "manager", isActive: true },
];

// 1. 새 팀원 생성
const newMember = createTeamMember({ id: 4, name: "Diana" });
console.log(newMember);
// 기대 출력: { id: 4, name: "Diana", email: "", role: "developer", isActive: true }

// 2. 필터링된 팀원 목록
const activeDesigners = filterTeamMembers(members, { role: "designer", isActive: true });
console.log(activeDesigners);
// 기대 출력: []

// 3. 민감한 정보 제거
const sanitizedMembers = removeSensitiveInfo(members);
console.log(sanitizedMembers);
// 기대 출력: [{ id: 1, name: "Alice", role: "developer", isActive: true }, ...]