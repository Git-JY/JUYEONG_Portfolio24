elbody = document.querySelector('body'), // 바디
elHeader = elbody.querySelector('header'), // 헤더 전체
elHeaderA = elHeader.querySelectorAll('a'), // 소개 보유능력 포트폴리오
el_secAll = elbody.querySelectorAll('section'), //sec 전부
// elKeywordLiAll = el_secAll[0].querySelectorAll('div.keywordName>ul>li'),
el_artic_skill = el_secAll[1].querySelector('section.sec_skill article.skill_skill'), //스킬 sec의 skill 박스
elUl_skillAll = el_artic_skill.querySelectorAll('ul.skillGroup'), // 스킬박스의 각 그룹
elCheck_SkillIcon = el_artic_skill.querySelector('input#skillIcon'), // 스킬 체크박스
elTopBtn = elbody.querySelector('button.topUpBtn'), // 탑버튼
elFooter = elbody.querySelector('footer'), // 푸터버튼
elCallA = elFooter.querySelector('a.callBtn'), // 전화버튼
elkakaoA = elFooter.querySelector('a.kakaoBtn'), // 카카오버튼
elKakaoQR = elbody.querySelector('div.kakaoQR'), // 내려오는 카카오 QR전체
elcloseBtn = elKakaoQR.querySelector('button.close'); // 카카오 QR X버튼


$.ajax({
    url: "../myJson/mySkill.json",
    success: function(skillObj) {
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
    }
  });
// fetch("../myJson/mySkill.json", {
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//     }
//   }).then(res => res.json()).then((skillObj)=>{
//     const keys = Object.keys(skillObj);
//     const widthAll = []; // 게이지의 width값을 2차배열로 저장할 배열변수

//     elUl_skillAll.forEach((elUl, k) => {
//         let tag = '';
//         const ulWidthAll = []; // 2차배열에 각 요소로 넣을 임시 배열변수

//         // "frontEnd" 배열(k=0), "backEnd" 배열(k=1), "etc" 배열(k=2)
//         skillObj[keys[k]].forEach((liInfo)=>{ 
//             tag += `<li title=${liInfo.name}>
//                         <i>
//                             <img src=${liInfo.img} alt=${liInfo.name}>
//                             <span class="txtVer
//                             ">${liInfo.name}</span>
//                         </i>
//                         <div class="gaugeBar">
//                             <span class="gauge" style="width: 0%"></span>
//                         </div>
//                     </li>`;

//             ulWidthAll.push(liInfo.proficiency);
//         });
//         widthAll.push(ulWidthAll);

//         elUl.innerHTML = tag;
//     });//elUl_skillAll.forEach((elUl, k)

//     // 마주칠 때 게이지 채우기
//     const options = {
//         threshold: 0.2 // 요소가 20%정도 보였을 때, 감지
//     }

//     const io = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry =>{

//             if(entry.isIntersecting){
//                 elUl_skillAll.forEach((elUl, k1) => {
//                     elUl.querySelectorAll('li span.gauge').forEach((elSpan, k2) => {
//                         elSpan.style.width = widthAll[k1][k2] + '%';
//                     })
//                 });//elUl_skillAll.forEach((elUl, k1) => {

//                 observer.unobserve(el_artic_skill);
//             }//if(entry.isIntersecting)

//         })
//     }, options)//const io = new IntersectionObserver
//     io.observe(el_artic_skill);
    
//     // 스킬아이콘 토글버튼 체크박스 change이벤트
//     elCheck_SkillIcon.onchange = (e) => {
//         if(e.target.checked){
//             el_artic_skill.classList.remove('OFF');
//         }else{
//             el_artic_skill.classList.add('OFF');
//         }

//     }//elCheck_SkillIcon.onchange
    
// })//.then((skillObj)=>{

const options2 = {
    threshold: 0.2 // 요소가 20%정도 보였을 때, 감지
}
// const io2 = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry =>{

//         if(entry.isIntersecting){
//             entry.target.classList.add('active');
//             observer.unobserve(entry.target);
//         }//if(entry.isIntersecting)

//     })
// }, options2)//const io = new IntersectionObserver
// elKeywordLiAll.forEach((ele)=>{
//     io2.observe(ele);
// })

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
        let el_secAll_y = [];
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

// 카카오 열기 버튼
elkakaoA.onclick = () => {
    elKakaoQR.classList.add('on');
    elbody.classList.add('noScroll');
}//elkakaoA.onclick

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
