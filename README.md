# PyView - Interactive Python Dependency Visualization

<div align="center">

![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104%2B-009688.svg)

<img width="931" height="500" alt="image" src="https://github.com/user-attachments/assets/5ab72c72-b5a7-4c27-b35c-2ffabf441121" />

  🏆 **2025 오픈소스 개발자대회 출품작**
  
  **프로젝트 기간** : 2025.06.30 ~

  [🎥 Demo Video](https://youtu.be/gdDv0QxzrF8)
</div>

<br/>

## ✨ PyView 프로젝트 소개

### Interactive Python Dependency Visualization
- **PyView**는 Python 프로젝트의 의존성을 **실시간으로 시각화·탐색**할 수 있는 **웹 기반 도구**입니다.  
- **5단계 분석(패키지→모듈→클래스→메서드→필드)** 을 통해 코드 구조를 세밀하게 파악할 수 있습니다.  
- **검색·필터·하이라이트** 기능으로 의존 경로를 직관적으로 탐색합니다.  
- **복잡도·유지보수성·결합도** 등 주요 **품질 지표**를 함께 제공합니다.  
- **스트리밍·캐시 기반 분석**으로 **대규모 코드베이스도 빠르고 안정적으로 처리**합니다.
<br/>

PyView는 기존 오픈소스 도구인 [`pydeps`](https://github.com/thebjorn/pydeps) 를 기반으로 개발되었습니다. 

<br/>


## 🏗️ 시스템 아키텍처

<div align="center">
    <img width="8041" height="2460" alt="image" src="https://github.com/user-attachments/assets/b49ad252-ffff-463a-b12b-3e983608e059" />
</div>

<br/>

## 🖥️ 주요 기능 소개
<table align="center" width="100%">
  <tr>
    <th width="50%">프로젝트 분석 설정</th>
    <th width="50%">5계층(패키지 → 모듈 → 클래스 → 메서드 → 필드)시각화</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/72735fd1-eb68-43b5-96dc-2ce6a5c7fe68" width="380px" alt="프로젝트 분석 설정">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/cfe781a0-b4ed-4dd7-83ef-71b324c86b3d" width="380px" alt="5계층 그래프 시각화">
    </td>
  </tr>

  <tr>
    <th>노드 검색 및 하이라이트</th>
    <th>Interactive 인터페이스</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7f960fb6-5f39-4828-addc-f2ab2c0868cb" width="380px" alt="노드 검색 및 하이라이트">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2ed2ca5d-5f43-453a-abaf-ef9a7ca40e4e" width="380px" alt="Interactive 인터페이스">
    </td>
  </tr>

  <tr>
    <th>순환 참조 엣지 하이라이트</th>
    <th>노드 탐색기 내 순환 참조 표시</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/458eb7af-ed1d-4445-9b34-ba99fd7e71c5" width="280px" alt="순환참조 엣지 하이라이트">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ccede3dc-00b1-4546-81a3-37e3dc18a674" width="280px" alt="노드탐색기 순환참조 표시">
    </td>
  </tr>

  <tr>
    <th>프로젝트 코드 품질 분석 대시보드</th>
    <th>순환 참조 상세정보</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6851f0bf-730c-4022-affc-123282f6cdd8" width="380px" alt="코드 품질 분석 대시보드">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/94acaf6e-a011-4feb-96f6-02de3a808d3d" width="380px" alt="순환참조 상세정보">
    </td>
  </tr>
</table>



</div>


</div>

<br/>
<br/>

## 💻 기술 스택

| 구분                 | 기술 스택        | 버전 |
| -------------------- | ---------------- | ---- |
| **Backend Language** | Python | 3.8+ |
| **Web Framework**    | FastAPI | ≥0.104.1 |
| **ASGI Server**      | Uvicorn | ≥0.24.0 |
| **Data Validation**  | Pydantic | ≥2.4.2 |
| **Real-time**        | WebSockets | ≥12.0 |
| **Frontend Language**| TypeScript | 5.2.2 |
| **UI Framework**     | React | 18.2.0 |
| **Build Tool**       | Vite | 5.0.8 |
| **UI Components**    | Ant Design | 5.27.0 |
| **Graph Visualization** | Cytoscape.js | 3.33.1 |
| **HTTP Client**      | Axios | 1.11.0 |
| **Testing**          | pytest | ≥4.6 |

<br/>
<br/>
<br/>

## 🚀 실행 방법

### 📋 시스템 요구사항

- **Python**: 3.8 이상
- **Node.js**: 18.0 이상 (프론트엔드 개발 시)
- **운영체제**: Windows, macOS, Linux
- **메모리**: 최소 4GB RAM (대형 프로젝트 분석 시 8GB 권장)

### ⚡ 1단계: 설치

```bash
# 개발용 설치
git clone https://github.com/TidyDeps/pyview.git
cd pyview
pip install -e .
```

### ⚡ 2단계: 실행

```bash
# 한 번에 실행 🚀
python start.py
```

> **수동 실행 (선택사항) 🔄**
> ```bash
> # 백엔드만 실행
> cd server && python app.py
>
> # 프론트엔드만 실행 (새 터미널)
> cd frontend && npm install && npm run dev
> ```

### ⚡ 3단계: 웹 브라우저에서 분석

```
http://localhost:3000
```

프로젝트 경로를 입력하고 분석 옵션을 설정한 후, **Start Analysis** 버튼을 클릭하세요!

## 🪟 Windows 사용자 주의사항

### 필수 설치 및 설정
```powershell
# Node.js 설치 확인
node --version
npm --version

# 인코딩 설정 (한글/이모지 오류 방지)
$env:PYTHONIOENCODING="utf-8"

# FastAPI 의존성 설치
pip install fastapi uvicorn
```

### 자주 발생하는 문제 해결
1. **"npm이 설치되지 않았습니다" 오류**
   - Node.js 재설치 시 "Add to PATH" 옵션 체크 필수
   - 설치 후 PowerShell 재시작 필요

2. **인코딩 오류 (cp949 codec 오류)**
   - PowerShell에서 `$env:PYTHONIOENCODING="utf-8"` 실행 후 재시도

3. **포트 충돌 오류**
   ```powershell
   # 사용 중인 포트 확인
   netstat -ano | findstr :3000
   netstat -ano | findstr :8000
   ```

4. **uvicorn 모듈 없음 오류**
   ```powershell
   pip install -r requirements.txt
   # 또는 개별 설치
   pip install fastapi uvicorn[standard]
   ```

<br/>
<br/>
<br/>

## 🗂 프로젝트 구조

```
📦 PyView Project
├── 📂 pydeps/                   # 기존 pydeps (Legacy 분석 도구)
│   ├── 📜 pydeps.py             # CLI 진입점
│   ├── 📜 py2depgraph.py        # 모듈 의존성 분석
│   ├── 📜 depgraph.py           # 의존성 그래프 구조
│   ├── 📜 depgraph2dot.py       # DOT 포맷 변환
│   └── 📜 dot.py                # GraphViz 렌더링
│
├── 📂 pyview/                   # 새로운 분석 엔진 (Core)
│   ├── 📜 analyzer_engine.py    # 분석 오케스트레이터
│   ├── 📜 ast_analyzer.py       # AST 기반 코드 분석
│   ├── 📜 models.py             # 5-Layer 데이터 모델
│   ├── 📜 legacy_bridge.py      # pydeps 연동 브리지
│   ├── 📜 cache_manager.py      # 캐싱 및 증분 분석
│   └── 📜 performance_optimizer.py # 대규모 성능 최적화
│
├── 📂 frontend/                 # 프론트엔드 (React + TS)
│   ├── 📜 App.tsx               # 메인 앱
│   ├── 📂 components/           # UI 컴포넌트
│   │   ├── 📂 Analysis/         # 분석 폼, 진행상황
│   │   ├── 📂 Visualization/    # 그래프 시각화
│   │   ├── 📂 Search/           # 검색 UI
│   │   ├── 📂 QualityMetrics/   # 품질 메트릭
│   │   └── 📂 MultiView/        # 다중 뷰 모드
│   ├── 📂 hooks/                # React 훅
│   ├── 📂 services/             # API 통신
│   ├── 📂 types/                # TS 타입 정의
│   ├── 📜 package.json
│   └── 📜 vite.config.ts
│
├── 📂 server/                   # 백엔드 (FastAPI)
│   ├── 📜 app.py                # 메인 서버
│   ├── 📜 requirements.txt      # 의존성
│   └── 📜 demo_complex_data.py  # 데모 데이터
│
├── 📂 tests/                    # 테스트
│   ├── 📜 test_cli.py
│   ├── 📜 test_py2dep.py
│   └── 📂 pyview/               # 엔진 단위 테스트
│       ├── 📜 test_analyzer_engine.py
│       ├── 📜 test_ast_analyzer.py
│       └── 📜 test_models.py
│
├── 📜 setup.py                  # Python 패키지 설정
├── 📜 requirements.txt          # 개발 의존성
├── 📜 start.py                  # 통합 실행 스크립트 🚀
├── 📜 pytest.ini               # pytest 설정
├── 📜 .pydeps                   # pydeps 설정
└── 📜 README.md                 # 프로젝트 설명서
```

<br/>
<br/>

## 💡 주요 기능 상세

### 🔍 5계층 의존성 분석

PyView는 기존 도구들과 달리 **5단계 계층**으로 코드를 분석합니다:

- **📦 Package Level**: 패키지 간 의존성 관계
- **📄 Module Level**: 모듈 간 import 관계 (기존 pydeps 개선)
- **🏷️ Class Level**: 클래스 간 상속 및 조합 관계
- **⚙️ Method Level**: 메서드 간 호출 관계
- **📊 Field Level**: 클래스 멤버 변수 참조 관계

### 🎨 상호작용형 웹 시각화

- **Cytoscape.js** 기반 고성능 그래프 렌더링
- **실시간 줌/팬** 및 드래그 앤 드롭 네비게이션  
- **Cose-Bilkent 레이아웃 알고리즘**: 클러스터링에 최적화된 레이아웃
- **클러스터 확장/축소**: 복잡한 구조를 단계별로 탐색
- **의존성 경로 하이라이트**: 두 컴포넌트 간 연결 관계 추적

### 🔎 지능형 검색 시스템

- **통합 검색**: 패키지, 모듈, 클래스, 메서드명 동시 검색
- **실시간 자동완성**: 타이핑과 함께 즉시 결과 제공
- **타입별 필터링**: 검색 결과를 컴포넌트 유형별로 분류
- **파일 경로 표시**: 검색된 항목의 정확한 위치 정보

### 📊 코드 품질 메트릭

- **복잡도 분석**: 순환복잡도 및 코드 복잡도 측정
- **유지보수성 점수**: 코드 변경 용이성 평가
- **결합도 분석**: 모듈 간 의존성 강도 측정
- **기술부채 추적**: 리팩토링 우선순위 제공

### ⚡ 고성능 처리

- **증분 분석**: 변경된 파일만 재분석하여 속도 향상
- **WebSocket 실시간 진행률**: 분석 과정을 실시간 모니터링
- **메모리 최적화**: 대용량 프로젝트 (10,000+ 파일) 처리 가능
- **결과 캐싱**: 분석 결과를 로컬 데이터베이스에 저장

<br/>
<br/>


## 📄 라이센스

이 프로젝트는 **BSD 2-Clause License** 하에 배포됩니다.

자세한 라이센스 정보, 의존성 라이브러리 라이센스, 원본 프로젝트 Attribution은 **[LICENSES.md](LICENSES.md)** 파일을 참조하세요.

<br/>
<br/>

---

<div align="center">

🏆 **2025 오픈소스 개발자대회 출품작**

**PyView** - *Interactive Python Dependency Visualization*

</div>
