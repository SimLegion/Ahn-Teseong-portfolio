/* Main editorial content. File paths are relative to dist/index.html. */
const FILES={
 archive:{label:'전체 대화 기록 · 공개용',type:'PDF',path:'assets/conversation-public.pdf',note:'22쪽 · 사용자 요청 38개 / AI 발화 78개 · 주소 후반부 대체 및 사용자 오타 교정'},
 guide:{label:'직원에게 공유한 2쪽 안내서',type:'PDF',path:'assets/employee-guide.pdf',note:'자료 준비 방법과 반복 사용 가능한 AI 요청문을 정리한 실제 공유 문서'},
 labels:{label:'제공한 바코드 라벨',type:'PDF',path:'assets/barcode-labels.pdf',note:'사용자가 제공한 바코드 PDF 원본'},
 settings1:{label:'접근 권한 확인 화면',type:'PNG',path:'assets/screenshot-1.png',note:'당시 첨부 이미지 · 표시된 인터넷 주소만 처리'},
 settings2:{label:'사이트 권한 설정 화면',type:'PNG',path:'assets/screenshot-2.png',note:'당시 첨부 이미지 · 표시된 인터넷 주소만 처리'},
 table:{label:'SKU와 물류명 확인 화면',type:'PNG',path:'assets/screenshot-3.png',note:'사용자가 제공한 실제 바코드 출력 전 단계 화면'},
 labelshot:{label:'바코드 라벨 예시 화면',type:'PNG',path:'assets/screenshot-4.png',note:'SKU ID 없이 바코드와 기존 물류명·옵션만 표시된 화면'},
 selection:{label:'복사한 표의 원래 화면',type:'PNG',path:'assets/screenshot-5.png',note:'SKU ID, 기존 물류명과 바코드를 함께 확보한 실제 화면'},
 manual:{label:'담당자가 보완한 2행',type:'PNG',path:'assets/screenshot-6.png',note:'AI가 확정하지 못한 기존 물류명 두 행을 직접 확인해 입력한 화면'},
 list1:{label:'복사한 SKU 목록 1',type:'TXT',path:'assets/sku-list-1.txt',note:'사용자가 직접 복사해 제공한 원문 목록'},
 list2:{label:'복사한 SKU 목록 2',type:'TXT',path:'assets/sku-list-2.txt',note:'사용자가 직접 복사해 제공한 원문 목록'},
 list3:{label:'복사한 SKU 목록 3',type:'TXT',path:'assets/sku-list-3.txt',note:'사용자가 직접 복사해 제공한 원문 목록'},
 list4:{label:'복사한 SKU 목록 4',type:'TXT',path:'assets/sku-list-4.txt',note:'사용자가 직접 복사해 제공한 원문 목록'},
 inventory:{label:'재고·변경 목록 보존 데이터',type:'JSON',path:'assets/input-preserved.json',note:'초기 정보엑셀 원본 파일이 아닌, 당시 작업에서 남긴 구조화 데이터'},
 output:{label:'최초 엑셀 작성본',type:'XLSX',path:'assets/result-first.xlsx',preview:'assets/result-first.preview.json',note:'현재 보관된 실제 작성본 · 미리보기는 C~J열 · 원본 엑셀을 함께 제공'},
 final:{label:'기존 물류명 입력본',type:'XLSX',path:'assets/result-logistics.xlsx',preview:'assets/result-logistics.preview.json',note:'현재 보관된 실제 I열 입력본 · 미리보기는 C~J열 · 원본 엑셀을 함께 제공'}
};
const STORY=[
 {short:'문제의 출발점',kicker:'01 · DEFINE THE PROBLEM',title:'필요한 정보가, 한곳에 없었습니다.',summary:'변경할 이름은 사내 구글시트에, 상품·옵션·SKU 정보는 재고 엑셀에, 기존 물류입고용 이름은 별도 화면에 있었습니다. AI의 쿠팡윙 직접 접근도 해결되지 않았습니다.',
 messages:[{who:'나',role:'업무와 목표 전달',text:'구글시트와 쿠팡윙에서 정보를 얻어서, 최종 엑셀을 완성해야 해. <strong>사람이 여러 곳의 정보를 옮겨 적던 작업</strong>이야.'},{who:'AI',role:'자료 접근 가능 여부 확인',text:'구글시트와 로컬 파일은 확인할 수 있지만, 쿠팡윙 화면은 접근 제한 때문에 직접 읽을 수 없습니다.'},{who:'나',role:'해결할 범위 구체화',text:'그럼 먼저 필요한 열과 입력 기준을 정할게. <strong>어떤 정보를 어디에 넣을지</strong>부터 설명하자.'}],takeaway:'자동 작성의 출발점을 ‘사이트 직접 접근’에서 ‘필요한 자료와 전달 방법 정의’로 옮겼습니다.',files:['settings1','settings2'],turns:[1,2,8,9,10,11,12,13,14,15,16,17]},
 {short:'업무 규칙 정의',kicker:'02 · MAKE THE RULES EXPLICIT',title:'익숙한 수작업을, 명확한 규칙으로.',summary:'제품명만 비슷하다고 넣을 수는 없었습니다. 대상 목록의 순서, 옵션별 행 구분, 반품 제외와 예외 처리까지 실제 업무 기준을 AI가 적용할 수 있게 풀었습니다.',
 messages:[{who:'나',role:'대상과 행 구성 정의',text:'정보엑셀의 모든 제품을 넣으면 안 돼. <strong>구글 표에 있는 대상만, 표의 제품 순서대로</strong> 작성해줘. 옵션이 여러 개면 옵션마다 행을 나눠줘.'},{who:'나',role:'자동 작성 범위와 예외 기준 설정',text:'정보 엑셀에는 반품 상품도 섞여 있어. <strong>반품을 제외한 새 상품만 적용하게 NEW가 아닌 행은 제외</strong>해서 작성해줘. 정보가 부족한 항목은 공란으로 비워줘.<br>기존 물류입고용 상품명은 아직 확인할 자료가 없으니 <strong>우선 비워두자.</strong>'},{who:'AI',role:'선별·대조·작성',text:'대상 제품과 새 상품 조건을 함께 확인하고, 등록상품 ID·옵션 ID·SKU ID를 연결해 작성하겠습니다. 자료가 없는 제품은 확인할 수 있도록 남기겠습니다.'}],takeaway:'담당자의 암묵적인 판단을 대상·조건·순서·예외라는 반복 가능한 입력 기준으로 바꿨습니다.',files:['inventory','output'],turns:[18,19,22,23,24]},
 {short:'연결 자료 확보',kicker:'03 · CONNECT THE MISSING DATA',title:'못 읽는 화면은, 전달할 수 있는 자료로.',summary:'바코드 PDF에는 SKU ID가 없었습니다. 사용자는 출력 전 단계의 표를 복사하면 SKU와 바코드를 함께 얻을 수 있다는 점을 찾아냈습니다.',
 messages:[{who:'나',role:'새로운 자료 전달 방식 탐색',text:'바코드를 PDF로 받으면 기존 물류입고용 이름은 보이는데, <strong>여기엔 SKU ID가 없어.</strong> 대신 출력 전 단계의 표를 복사해봤어.'},{who:'AI',role:'연결 구조 확인',text:'복사한 표에 SKU ID와 바코드가 함께 있습니다. <strong>SKU ID → 바코드 → PDF의 기존 물류명</strong>으로 연결할 수 있습니다.'},{who:'나',role:'해석 기준 확정',text:'물류입고용 상품명은 <strong>‘기존 상품명 / 옵션명’</strong> 구조야. 앞의 상품명만 I열에 넣어줘. 이미지 주소나 대상이 아닌 상품은 섞여 있어도 무시해줘.'}],takeaway:'직접 접근이 막힌 화면에서 복사 가능한 표를 찾아, 흩어진 자료를 연결할 공통 기준을 확보했습니다.',files:['table','labels','labelshot','selection','list1','list2','list3','list4'],turns:[28,29,30,31,32]},
 {short:'대조와 예외 확인',kicker:'04 · VERIFY AND COMPLETE',title:'확실한 값은 채우고, 남은 두 행은 확인했습니다.',summary:'복사한 401개 기록을 바코드 PDF와 대조했습니다. 최종 대상 365행 중 기존 물류명 363행을 연결했고, 두 행은 담당자가 직접 확인해 보완했습니다.',
 messages:[{who:'AI',role:'대조 및 입력 결과 보고',text:'대상 SKU에 해당하는 <strong>기존 물류명 363행을 입력</strong>했습니다. 연결 자료가 없는 두 행은 비워두었습니다.'},{who:'나',role:'예외 보완',text:'남은 두 행은 확인해서 <strong>수기로 채웠어.</strong>'},{who:'AI',role:'최종 확인 지원',text:'담당자가 보완한 값과 행 구성을 확인합니다. 이후 요청서의 수식 등 마지막 확인 사항도 점검합니다.'}],takeaway:'확정 가능한 부분은 AI가 처리하고, 자료가 부족한 예외는 담당자의 확인으로 완성했습니다.',files:['final','manual','archive'],turns:[32,33,34,35,36,37]},
 {short:'반복할 절차로 정리',kicker:'05 · MAKE IT REPEATABLE',title:'다음 직원이 따라 할 수 있는 방식으로.',summary:'한 번의 엑셀 작성에서 끝내지 않고, 준비할 자료와 AI에게 전달할 요청문을 두 쪽 안내서로 정리해 직원에게 공유했습니다.',
 messages:[{who:'나',role:'자료 준비 방법 문서화',text:'담당자는 <strong>변경할 상품 목록, 쿠팡 재고 엑셀, 복사한 SKU 표, 요청 양식</strong>을 준비하면 돼. 여러 번 나눠 보내면 자료 전송이 끝났다고 알려주도록 하자.'},{who:'나',role:'공유용 요청문과 확인 절차 정리',text:'대상 선별부터 열별 입력, 중복 SKU 확인, 보류 목록까지 <strong>그대로 전달할 수 있는 요청문</strong>으로 남겼어. 필요한 부분만 바꿔 다음 업무에도 쓸 수 있게.'},{who:'AI',role:'반복 작업 수행과 검증',text:'안내서의 기준에 따라 자료를 연결하고 요청서를 작성합니다. 확정하지 못한 항목은 확인 목록으로 돌려주고, 담당자가 최종 검토합니다.'}],takeaway:'담당자의 자료 준비 → AI의 작성·검증 → 담당자의 예외 확인이라는 협업 절차를 문서로 남겼습니다.',files:['guide','final','archive'],turns:[38]}
];
