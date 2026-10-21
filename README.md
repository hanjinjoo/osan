# 오산대학교 동아리 서류 및 지원금 사용 규정

2026학년도 2학기 운영 페이지의 업무별 분리 (v2.1).

- `index.html`: 서류·정산 양식 자료실, 전공/취업 공식 HWP 6개 다운로드
- `rules/index.html`: 지원금 사용 기준, 제출 절차, 기존 체크리스트, 서류 찾기, 간담회 PPTX
- `assets/css/`: 공통 스타일, 개별 페이지 스타일, 공통 반응형
- `assets/js/`: 헤더, 양식 탭, 체크리스트, 서류 선택기 각각 분리
- `data/document-manifest.js`: 서식 6개 파일 경로 및 다운로드 이름의 기준 목록
- `files/`: **공식 원본 보존**, 변경·재인코딩 금지

기존 `/osan/#rules`, `#submit`, `#documents` 등 링크는 신규 규정 페이지로 같은 탭에서 자동 이동하며, 사용자가 누르는 **다른 페이지로의 링크는 새 탭**(`target=_blank`, `rel=noopener noreferrer`)에서 열린다. 같은 페이지 내 목차 이동과 파일 다운로드는 현재 탭에서 작동한다.

브라우저 체크 상태는 기존 localStorage 키 `osan-club-submission-checklist-2026-2`를 유지한다.

## 검증

`python tests/check_settlement_forms.py`
`python tests/check_page_split.py`

기존 파일 및 sha256 체크는 유지한다. 모니터링 예약 저장소·Supabase는 수정하지 않는다.
