'use client'

function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

        {/* 아이디 인풋 */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            아이디
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* 비밀번호 인풋 */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* 자동 로그인 체크박스와 링크 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-700">
              자동 로그인
            </label>
          </div>
          <div>
            <a href="#" className="text-blue-500 text-sm">
              아이디 찾기
            </a>
            <span className="mx-1">|</span>
            <a href="#" className="text-blue-500 text-sm">
              비밀번호 찾기
            </a>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className="text-center mb-6">
          <p className="text-gray-500 mb-4">또는</p>
          <button className="w-full bg-yellow-500 text-white py-2 rounded mb-2 hover:bg-yellow-600">
            카카오로 간편로그인
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded mb-2 hover:bg-red-600">
            구글로 간편로그인
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <div className="text-center">
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
