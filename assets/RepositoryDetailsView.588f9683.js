import{_ as g}from"./backButton.vue_vue_type_script_setup_true_lang.c4e6d1ae.js";import{a as p,f as u,g as y,c as t,F as R,r as f,o,e as s,t as d,_ as v,h as m,b as C,u as h,B as b,S as M,p as k,q as x,C as D}from"./index.2ecaf742.js";import{a as E,b as S,c as w,M as I}from"./Modal.ad7239ed.js";const L={class:"commit-list"},T={key:0},V={key:0,class:"commit-list__commit"},B=["src"],N={class:"commit-list__content"},F={key:1},O={key:1,class:"commit-list__info"},q=p({__name:"repositoryCommitList",props:["currentRepository"],emits:["errorEmit"],setup(n,{emit:a}){const _=n,e=u();async function l(){try{const r=await E(_.currentRepository.full_name);e.value=r.data}catch(r){console.error(r),a("errorEmit")}}return y(()=>{l()}),(r,c)=>(o(),t("div",L,[e.value?(o(),t("div",T,[(o(!0),t(R,null,f(e.value,i=>(o(),t("li",{key:i.sha},[i.author!==null?(o(),t("div",V,[s("div",null,[s("img",{class:"commit-list__avatar",src:i.author.avatar_url},null,8,B)]),s("div",N,[s("div",null,d(i.commit.message),1),s("div",null,[s("div",null,d(i.author.login)+", ",1),s("div",null,d(new Date(i.commit.committer.date).toLocaleDateString()),1)])])])):(o(),t("div",F,d(i.commit.message),1))]))),128))])):(o(),t("div",O," Repository Commit list is empty "))]))}});const j=v(q,[["__scopeId","data-v-e00973d3"]]),z={class:"team-members"},A={key:0},G=["onClick"],H={class:"team-members__member"},J=["src"],K={class:"team-members__content"},P={key:1,class:"team-members__info"},Q=p({__name:"repositoryTeamMembers",props:["currentRepository"],emits:["errorEmit"],setup(n,{emit:a}){const _=n,e=u();async function l(){try{const r=await S(_.currentRepository.full_name);e.value=r.data}catch(r){console.error(r),a("errorEmit")}}return y(()=>{l()}),(r,c)=>(o(),t("div",z,[e.value?(o(),t("div",A,[(o(!0),t(R,null,f(e.value,i=>(o(),t("li",{key:i.id},[s("div",{onClick:oe=>r.$router.push(`/contributor-details/${i.id}`)},[s("div",H,[s("div",null,[s("img",{class:"team-members__avatar",src:i.avatar_url},null,8,J)]),s("div",K,[s("div",null,d(i.login),1),s("div",null,d(i.type),1)])])],8,G)]))),128))])):(o(),t("div",P," Repository Contributors list is empty "))]))}});const U=v(Q,[["__scopeId","data-v-ec616b5e"]]),$=n=>(k("data-v-d9d010a6"),n=n(),x(),n),W={key:0,class:"repository-details"},X=$(()=>s("div",{class:"repository-details__commit-list-title"}," Repository Commits ",-1)),Y=$(()=>s("div",{class:"repository-details__team-members-title"}," Repository Contributors ",-1)),Z={key:1,class:"repository-details__info"},ee=p({__name:"repositoryDetails",emits:["openModal"],setup(n,{emit:a}){const _=D(),e=u();async function l(){try{const r=await w(_.params.id.toString());e.value=r.data}catch(r){console.error(r),a("openModal")}}return y(()=>{l()}),(r,c)=>(o(),t("div",null,[m(g),e.value!==void 0?(o(),t("div",W,[X,m(j,{"current-repository":e.value,onErrorEmit:c[0]||(c[0]=i=>a("openModal"))},null,8,["current-repository"]),Y,m(U,{"current-repository":e.value,onErrorEmit:c[1]||(c[1]=i=>a("openModal"))},null,8,["current-repository"])])):(o(),t("div",Z,[C(" Repository is empty "),m(h(M),{type:"mdi",path:h(b)},null,8,["path"])]))]))}});const te=v(ee,[["__scopeId","data-v-d9d010a6"]]),ae=p({__name:"RepositoryDetailsView",setup(n){const a=u(!1);return(_,e)=>(o(),t("div",null,[m(te,{onOpenModal:e[0]||(e[0]=l=>a.value=!0)}),m(I,{showModal:a.value,modalText:"Repository Details list error",onCloseModal:e[1]||(e[1]=l=>a.value=!1)},null,8,["showModal"])]))}});export{ae as default};
