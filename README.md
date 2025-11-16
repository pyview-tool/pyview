# PyView - Interactive Python Dependency Visualization

<div align="center">

![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104%2B-009688.svg)

<img width="1367" height="729" alt="image" src="https://github.com/user-attachments/assets/786ba7b8-1c59-4128-9057-7d8163338722" />


  🏆 **2025 셈틀제 출품작**
  
  **프로젝트 기간** : 2025.06.30 ~

  [🎥 시연 영상](https://youtu.be/kUB_d-ddK18)
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
    <img width="8041" height="2460" alt="image" src="https://github.com/user-attachments/assets/21e2014b-10da-412e-9797-b270699cc2de" />
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
      <img src="https://github.com/user-attachments/assets/dc7fb877-5c36-43dd-92e7-b003b15d5ec8" width="380px" alt="프로젝트 분석 설정">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ce6c9957-7a0b-4335-83bf-255222da78be" width="380px" alt="5계층 그래프 시각화">
    </td>

  </tr>

  <tr>
    <th>노드 검색 및 하이라이트</th>
    <th>Interactive 인터페이스</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2ea92706-b869-4103-904b-a34d1cfa9577" width="380px" alt="노드 검색 및 하이라이트">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/17cde056-2464-4212-8cbe-e2dfef8f08eb" width="380px" alt="Interactive 인터페이스">
    </td>
  </tr>

  <tr>
    <th>순환 참조 엣지 하이라이트</th>
    <th>노드 탐색기 내 순환 참조 표시</th>
  </tr>
  <tr>
    <td align="center">
      <img width="417" alt="순환참조" src="https://github.com/user-attachments/assets/1a8396d5-4493-4ccb-b47b-095d6ceb401d" />
    </td>
    <td align="center">
        <img width="257" alt="노드탐색기_순환참조" src="https://github.com/user-attachments/assets/2994f894-ce96-492f-84b5-06fa410f24f0" />
    </td>
  </tr>

  <tr>
    <th>프로젝트 코드 품질 분석 대시보드</th>
    <th>순환 참조 상세정보</th>
  </tr>
  <tr>
    <td align="center">
      <img width="1463" alt="qualityMetric" src="https://github.com/user-attachments/assets/e8c85829-42f6-4513-9ca5-9de4269e515b" />
    </td>
    <td align="center">
        <img width="472" alt="순환참조 안내" src="https://github.com/user-attachments/assets/2189f3eb-7d70-46de-b301-e48a21b85578" />
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
| **Frontend Language**| TypeScript | 5.9.2 |
| **UI Framework**     | React | 18.3.1 |
| **Routing**          | React Router | 6.30.1 |
| **Build Tool**       | Vite | 5.4.20 |
| **UI Components**    | Ant Design | 5.27.4 |
| **Graph Visualization** | Cytoscape.js | 3.33.1 |
| **Testing**          | pytest | ≥4.6 |

<br/>
<br/>

## 🚀 실행 방법

### 📋 시스템 요구사항

- **Python**: 3.8 이상
- **Node.js**: 18.0 이상
- **운영체제**: Windows, macOS, Linux
- **메모리**: 최소 4GB RAM (대형 프로젝트 분석 시 8GB 권장)

### ⚡ 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/TidyDeps/pyview.git
cd pyview

# 실행 (의존성 자동 설치)
python3 start.py
```

실행 시 필요한 패키지가 없다면 콘솔에 에러 메시지가 표시됩니다.
표시되는 패키지를 설치한 뒤 다시 실행해보세요.

```bash
# 필요시 백엔드 의존성 설치
pip install -r server/requirements.txt
```

### 🌐 웹 브라우저에서 분석

서버가 시작되면 브라우저에서 아래 주소로 접속:
```
http://localhost:3000
```

> **수동 실행 (선택사항) 🔄**
> ```bash
> # 백엔드만 실행
> cd server && python3 app.py
>
> # 프론트엔드만 실행 (npm install은 첫 실행시에만)
> cd frontend && npm install && npm run dev
> ```

</br>
</br>

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

<br/>
<br/>

## 🗂 프로젝트 구조

```
📦 PyView Project
├── 📂 pydeps/                   # 기존 pydeps (Legacy 분석 도구)
│
├── 📂 pyview/                   # 새로운 분석 엔진 (Core)
│   ├── 📜 analyzer_engine.py    # 분석 오케스트레이터
│   ├── 📜 ast_analyzer.py       # AST 기반 코드 분석
│   ├── 📜 models.py             # 5-Layer 데이터 모델
│   ├── 📜 legacy_bridge.py      # pydeps 연동 브리지
│   └── 📜 performance_optimizer.py # 대규모 성능 최적화
│
├── 📂 frontend/                 # 프론트엔드 (React + TS)
│   ├── 📜 App.tsx               # 메인 앱
│   ├── 📂 components/           # UI 컴포넌트
│   └── ...
│
├── 📂 server/                   # 백엔드 (FastAPI)
│   ├── 📜 app.py                # 메인 서버
│   └── ...
│
├── 📜 setup.py                  # Python 패키지 설정
├── 📜 start.py                  # 통합 실행 스크립트
└── 📜 README.md                 # 프로젝트 설명서
```

<br/>
<br/>


## 📄 라이선스

이 프로젝트는 **BSD 2-Clause License** 하에 배포됩니다.

자세한 라이선스 정보, 의존성 라이브러리 라이선스, 원본 프로젝트 Attribution은 **[LICENSES.md](LICENSES.md)** 파일을 참조하세요.

<br/>
<br/>

---

<div align="center">

🏆 **2025 셈틀제 출품작**

**PyView** - *Interactive Python Dependency Visualization*

</div>
