elbody = document.querySelector('body'), // 바디
elHeader = elbody.querySelector('header'), // 헤더 전체
elHeaderA = elHeader.querySelectorAll('a'), // 소개 보유능력 포트폴리오
el_secAll = elbody.querySelectorAll('section'), //sec 전부
elKeywordArticle = el_secAll[0].querySelector('article.keyword_intro'), //키워드 article
elKeywordLiAll = elKeywordArticle.querySelectorAll('ul.keyword_name>li'), //키워드 네임
elKeyCommentsLiAll = elKeywordArticle.querySelectorAll('div.keywordTxt>ul.keywordComments>li'), //키워드 글귀
el_artic_skill = el_secAll[1].querySelector('article.skill_skill'), //스킬 sec의 skill 박스
elUl_skillAll = el_artic_skill.querySelectorAll('ul.skillGroup'), // 스킬박스의 각 그룹
elCheck_SkillIcon = el_artic_skill.querySelector('input#skillIcon'), // 스킬 체크박스
elA_pofolAll = el_secAll[2].querySelectorAll('div.contentsWrapper>nav.polderMenu>a.polder'), // 포폴 폴더 메뉴
elUl_pofol = el_secAll[2].querySelector('div.contentsWrapper>ul.portfolioContents'), // 포폴 Ul
elTopBtn = elbody.querySelector('button.topUpBtn'), // 탑버튼
elFooter = elbody.querySelector('footer'), // 푸터버튼
elCallA = elFooter.querySelector('a.callBtn'), // 전화버튼
elkakaoA = elFooter.querySelector('a.kakaoBtn'), // 카카오버튼
elKakaoQR = elbody.querySelector('div.kakaoQR'), // 내려오는 카카오 QR전체
elKakaoCopyBtn = elKakaoQR.querySelector('div.kakoIDCopy button.copyBtn'), // 카카오 카피버튼
elcloseBtn = elKakaoQR.querySelector('button.close'); // 카카오 QR X버튼

// fetch("../myJson/mySkill.json", {
fetch("./myJson/mySkill.json", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  })
  .then(res => res.json())
  .then((skillObj)=>{
    const keys = Object.keys(skillObj);
    const widthAll = []; // 게이지의 width값을 2차배열로 저장할 배열변수

    elUl_skillAll.forEach((elUl, k) => {
        let tag = '';
        const ulWidthAll = []; // 2차배열에 각 요소로 넣을 임시 배열변수

        // "frontEnd" 배열(k=0), "backEnd" 배열(k=1), "etc" 배열(k=2)
        skillObj[keys[k]].forEach((liInfo)=>{ 
            tag += `<li title=${liInfo.name}>
                        <i>
                            <img src=${liInfo.img} alt=${liInfo.name}>
                            <span class="txtVer
                            ">${liInfo.name}</span>
                        </i>
                        <div class="gaugeBar">
                            <span class="gauge" style="width: 0%"></span>
                        </div>
                    </li>`;

            ulWidthAll.push(liInfo.proficiency);
        });
        widthAll.push(ulWidthAll);

        elUl.innerHTML = tag;
    });//elUl_skillAll.forEach((elUl, k)

    // 마주칠 때 게이지 채우기
    const options = {
        threshold: 0.2 // 요소가 20%정도 보였을 때, 감지
    }

    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry =>{

            if(entry.isIntersecting){
                elUl_skillAll.forEach((elUl, k1) => {
                    elUl.querySelectorAll('li span.gauge').forEach((elSpan, k2) => {
                        elSpan.style.width = widthAll[k1][k2] + '%';
                    })
                });//elUl_skillAll.forEach((elUl, k1) => {

                observer.unobserve(el_artic_skill);
            }//if(entry.isIntersecting)

        })
    }, options)//const io = new IntersectionObserver
    io.observe(el_artic_skill);
    
    // 스킬아이콘 토글버튼 체크박스 change이벤트
    elCheck_SkillIcon.onchange = (e) => {
        if(e.target.checked){
            el_artic_skill.classList.remove('OFF');
        }else{
            el_artic_skill.classList.add('OFF');
        }

    }//elCheck_SkillIcon.onchange
    
})//.then((skillObj)=>{

const options2 = {
    threshold: 0.4 // 요소가 40%정도 보였을 때, 감지
}
const io2 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry =>{

        if(entry.isIntersecting){
            entry.target.classList.add('ani');
            observer.unobserve(entry.target);
        }//if(entry.isIntersecting)

    })
}, options2)//const io = new IntersectionObserver
io2.observe(elKeywordArticle);

let preKeywordKey = 0;
elKeywordLiAll.forEach((ele, k)=>{
    ele.onclick = () => {
        elKeyCommentsLiAll[k].classList.toggle('active');
        if(k != preKeywordKey) elKeyCommentsLiAll[preKeywordKey].classList.remove('active');
        preKeywordKey = k;
    }
})

// 헤드 a버튼 클릭시 이동 이벤트
elHeaderA.forEach((elA, k) => {
    elA.onclick = () => {
        el_secAll[k].scrollIntoView({
                behavior: "smooth"
        })//el_secAll[k].scrollIntoView

    }//elA.onclick
    
});//elHeaderA.forEach((elA, k) => {

//el_secAll들과 끝의 Y절댓값 초기화(총 4개(sec 3개 + 끝 1개))
let el_secAll_y = [];
el_secAll.forEach((ele)=>{
    el_secAll_y.push(Math.floor(ele.getBoundingClientRect().y + window.scrollY));
})//el_secAll.forEach((ele, k)=>{
el_secAll_y.push(elbody.scrollHeight);

// 브라우저 크기가 변경될 때 0.3초씩 감지해서 sec의 y값 변경하기(sec의 크기가 바뀌기 때문)
// (* 너비만 바뀔 때 코드실행하게끔 해도 되는데, 뷰포트 높이를 쓸 수 있으니 일단 보류)
// resize 이벤트: 브라우저의 크기가 변경될 때 발생(브라우저만)
let resizeTimer;
window.addEventListener('resize', () => {

    // 컴퓨터 부담감을 줄이기 위한 디바운싱
    clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
        el_secAll_y = [];
        el_secAll.forEach((ele)=>{
            el_secAll_y.push(Math.floor(ele.getBoundingClientRect().y + window.scrollY));
        })//el_secAll.forEach((ele, k)=>{
        el_secAll_y.push(elbody.scrollHeight);
	}, 30); //0.3초씩 감지

});//window.addEventListener('resize',

// a태그 on활성화 초기화
let preA_k;
let firstLoadY = Math.floor(window.scrollY + window.innerHeight/2);
let pos = {
    y: firstLoadY, 
    pre_y: firstLoadY, 
    status: true
}; 
for(let k = 0; k < el_secAll_y.length-1; k++){
    if(el_secAll_y[k+1] > pos.y && pos.y >= el_secAll_y[k]){
        elHeaderA[k].classList.add('on');
        preA_k = k;
    }
}//for(let i = 0; i < el_secAll_y.length-1; i++){

// a태그 활성화 스크롤 이벤트
const menuFun = (k) => {
    elHeaderA[preA_k].classList.remove('on');
    elHeaderA[k].classList.add('on');
    preA_k = k;
}//menuFun() 함수정의

//스크롤 이벤트
let scrollTimer;                          // status: true이면 내려감, false이면 올라감
// let pos = {y: firstLoadY, pre_y: firstLoadY, status: true}; 
window.addEventListener('scroll', () => {

    // 컴퓨터 부담감을 줄이기 위한 디바운싱
    clearTimeout(scrollTimer);
	scrollTimer = setTimeout(() => {
        pos.y = Math.floor(window.scrollY + window.innerHeight/2);
        pos.status = (pos.y > pos.pre_y) ? true : false;

        // 스크롤이 아래로 가면 헤더 위로 사라짐, 위로 가면 헤더 돌아옴
        if(pos.status){
            elHeader.classList.add('active');
        }else{
            elHeader.classList.remove('active');
        }

        // 스크롤 하면서 a태그 활성화 변하기
        for(let k = 0; k < el_secAll_y.length-1; k++){
            if(el_secAll_y[k+1] > pos.y && pos.y >= el_secAll_y[k]){
                menuFun(k);
            }//if(el_secAll_y[k+1] > pos.y && pos.y >= el_secAll_y[k]){
        }//for(let k = 0; k<el_secAll_y.length; k++)

        if(window.scrollY >= 1){
            elHeader.classList.add('removeH1');
        }else{
            elHeader.classList.remove('removeH1');
        }
        
        pos.pre_y = pos.y; 
	}, 30); //0.3초씩 감지
})//window.addEventListener('scroll', () => {

fetch("./myJson/portfolio.json", {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    })
    .then(res => res.json())
    .then((pofolObj)=>{

    const pofolMenuFun = (menuName) => { 
        elUl_pofol.innerHTML = '';

        /*
        if(menuName == "all"){
            for(let keyName in pofolObj){
                pofolObj[keyName].forEach((obj)=>{
                    elUl_pofol.innerHTML += 
                    `<li>
                        <a class="contentsWrapper" href="${obj.url}" target="_blank">
                            <strong>${obj.name}</strong>
                        </a>
                        <i class="bg">
                            <img src="${obj.img}" alt="${obj.name}">
                        </i>
                    </li>`;
                })
            }//for(let keyName in pofolObj)

        }else{
            pofolObj[menuName].forEach((obj)=>{
                elUl_pofol.innerHTML += 
                `<li>
                    <a class="contentsWrapper" href="${obj.url}">
                        <strong>${obj.name}</strong>
                    </a>
                    <i class="bg">
                        <img src="${obj.img}" alt="${obj.name}">
                    </i>
                </li>`;
            })//pofolObj[menuName].forEach((obj)=>{

            if(pofolObj[menuName].length < 6){
                let rest = 6 - pofolObj[menuName].length;

                for(let i = 1; i <= rest; i++){
                    elUl_pofol.innerHTML += "<li class='empty'></li>";
                }
            }//if(pofolObj[menuName].length < 6)
        }
        */
        pofolObj[menuName].forEach((obj)=>{
            elUl_pofol.innerHTML += 
            `<li>
                <a class="contentsWrapper" href="${obj.url}" target="_blank">
                    <strong>${obj.name}</strong>
                </a>
                <i class="bg">
                    <img src="${obj.img}" alt="${obj.name}">
                </i>
            </li>`;
        })//pofolObj[menuName].forEach((obj)=>{

        let maxRowsN = pofolObj[menuName].length % 3 == 0 ? Math.trunc(pofolObj[menuName].length / 3) : Math.trunc(pofolObj[menuName].length / 3) + 1; //최대 높이 수 구하기
        
        let maxN = maxRowsN*3 < 6 ? 6 : maxRowsN * 3; // 최대 개수를 구함, 그러나 최대개수가 6개보다 적으면 6개로 하기


        if(pofolObj[menuName].length < maxN){
            let rest = maxN - pofolObj[menuName].length;

            for(let i = 1; i <= rest; i++){
                elUl_pofol.innerHTML += "<li class='empty'></li>";
            }
        }//if(pofolObj[menuName].length < 6)
    }//pofolMenuFun() 함수정의

    pofolMenuFun('all');

    // elA_pofolAll // elUl_pofol
    elA_pofolAll.forEach((elA, k) => {
        elA.onclick = (e) => {
            e.preventDefault();

            pofolMenuFun(elA.dataset['name']);
        }
    })//elA_pofolAll.forEach((elA, k)
})//.then((skillObj)=>{

// 카카오 열기 버튼
elkakaoA.onclick = () => {
    elKakaoQR.classList.add('on');
    elbody.classList.add('noScroll');
}//elkakaoA.onclick

//카카오 카피 버튼
elKakaoCopyBtn.onclick = () => {
    window.navigator.clipboard.writeText('kakajy123')
    .then(()=>{
        {
            Swal.fire({
                title: "카피 완료",
                text: "카피가 완료되었습니다.",
                confirmButtonText: "확인"
              });
        }
    })
    .catch(()=>{
        {
            Swal.fire({
                title: "카피 실패",
                text: "카피가 실패되었습니다.",
                confirmButtonText: "확인"
              });
        }
    })
}//elKakaoCopyBtn.onclick

// 카카오 닫기 버튼
elcloseBtn.onclick = () => {
    elKakaoQR.classList.remove('on');
    elbody.classList.remove('noScroll');
}//elcloseBtn.onclick

// 탑업 버튼
elTopBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}//elTopBtn.click

// 탑업 버튼 footer에 닿으면 위로 올리는 함수
const topBtn_upFun = () => {
  if (!elTopBtn || !elFooter) return;

  const footerRect = elFooter.getBoundingClientRect(); // footerRect.top: 뷰포트로부터의 요소 수직 위치(실수, 소수점 포함) 알려줌
  const windowHeight = window.innerHeight; // 뷰포트 높이(innerHeight은 window객체에만 있음)

  // 뷰포트 바닥에 footer가 닿을때까지 거리
  const touchFooterHeight = windowHeight - footerRect.top;

  if (touchFooterHeight > 0) {
    // footer가 보이기 시작하면 '.up' 클래스 추가
    elTopBtn.classList.add('up');
  } else {
    // 바닥 요소가 아직 안 보이면 '.up' 클래스 빼기
    elTopBtn.classList.remove('up');
  }
  
  
}//topBtn_upFun() 함수 정의

// 스크롤 또는 브라우저 창 크기 변화시, 적당히 실행하게 끔 함
let isTicking = false; // 예약타이머 꺼두기
const onScrollOrResize = () => {
  if(!isTicking){ // 예약타이머가 on 상태면, 해당 코드 무시
    /* 
      window.requestAnimationFrame(콜백): 브라우저가 화면을 새로 그릴 때, 내 사양(=사용자 모니터 주사율 + 브라우저 처리 능력)에 맞춰 setTimeOut()을 걸어준다는 느낌
      
      ex. (모니터 주사율만 고려한다는 가정하에))
      모니터가 1초에 60번(0.016초마다) 화면을 그려준다면, 
      requestAnimationFrame()은 0.016초 이후 실행되는 setTimeOut()같은 거임
      스크롤 할때 rAF 0.016초후 한 번 실행이 아닌, 0.016초 예약이 스크롤마다 여러개 쌓임. 이를 isTicking으로 0.016초 후 1번만 실행하도록 한 거(* 이를 쓰로틀링(Throttling) 기법이라 함 )
      --------------------------------------------------
      
      쓰로틀링 (Throttling) vs 디바운싱 (Debouncing) 차이)
      
      - 쓰로틀링 (Throttling): 일정한 주기(ex. 0.016초)후, 한 번 실행
      - 디바운싱 (Debouncing): 이벤트(스크롤, 리사이즈) 끝난 후, 한 번 실행
      
      --------------------------------------------------
      (* topUp버튼이 bottom에 맞닿을 때, 스크롤 끝나고 topUp버튼이 올라가는 것보다 스크롤 중 올라가는 게 자연스럽기에 이번에 쓰로틀링 기법을 씀)
      --------------------------------------------------
      // 디바운싱으로 코드짠 경우 (이벤트 끝나고 대략 0.2초 안에 실행))
      let debounceTimer = null; // 실행 대기 중인 타이머의 ID를 저장할 변수

      const onScrollOrResize = () => {
        // 1. 이전에 예약해 둔 타이머가 있다면 즉시 취소합니다. (계속 스크롤 중이므로 실행 보류)
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        // 2. 새로운 타이머를 맞춥니다. (예: 200ms 동안 추가 스크롤이 없으면 그때 실행)
        debounceTimer = setTimeout(() => {
          topBtn_upFun();
          debounceTimer = null; // 실행 완료 후 타이머 변수 초기화
        }, 200); 
      };

      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize);
      */
    window.requestAnimationFrame(() => {
      topBtn_upFun();
      isTicking = false; //예약 풀려서 rAF의 콜백 실행후 마지막
    });
    isTicking = true; // 예약타이머 on상태
  }//if(!isTicking)
}//onScrollOrResize() 함수정의 

window.addEventListener('scroll', onScrollOrResize, { passive: true });
window.addEventListener('resize', onScrollOrResize);

// 초기 로드 시 위치 한 번 계산
topBtn_upFun();


elCallA.onclick = (e) => {
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(!userAgent.includes('mobile')){
      e.preventDefault();
      Swal.fire({
        title: "핸드폰으로 바로 연결 가능",
        text: "전화번호\n010-3253-1109",
        // icon: "info",
        confirmButtonText: "확인"
      });
      
    }//if(userAgent.includes('mobile'))

}//elCallA.onclick
