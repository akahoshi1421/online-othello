(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(7323)}])},7323:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return p}});var i=s(5893),t=s(24),a=s(7294),r=s(4110),c=s.n(r);let l=e=>(0,i.jsx)("div",{className:c().cell,onClick:e.onClick,children:0!==e.color&&(0,i.jsx)("div",{className:c().stone,style:{background:3===e.color?e.isMyturn?"#ffdc00":"#999696":1===e.color?"#000":"#fff"}})});var o=s(8239);let d=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,i.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var _=s(1733),u=s(7251),x=s(2038),h=s.n(x);let m=e=>{let{user:n}=e,s=async()=>{confirm("Logout?")&&await (0,u.k)()};return(0,i.jsx)("div",{className:h().container,children:(0,i.jsxs)("div",{className:h().main,children:[(0,i.jsx)("img",{src:_.D.frourio_svg,height:36,alt:"frourio logo"}),(0,i.jsxs)("div",{className:h().userBtn,onClick:s,children:[n.photoURL?(0,i.jsx)("img",{className:h().userIcon,src:n.photoURL,height:24,alt:n.displayName}):(0,i.jsx)(d,{size:18,fill:"#555"}),(0,i.jsx)("span",{className:h().userName,children:n.displayName})]})]})})};var f=s(1290),j=s(3377),w=s(5371),v=s(7281),N=s.n(v);let b=()=>{let[e]=(0,t.KO)(w.L),[n,s]=(0,a.useState)(),[r,c]=(0,a.useState)(1),[d,_]=(0,a.useState)(!1),[u,x]=(0,a.useState)({white:-1,black:-1}),[h,v]=(0,a.useState)(""),b=async()=>{let e=await f.x.board.$get().catch(j.F);null!==e&&(s(e.board),c(e.nowTurn),x(e.win))},p=async(e,n)=>{await f.x.board.$post({body:{x:e,y:n}}),await b()},k=async()=>{let e=await f.x.board.$post({body:{x:-1,y:-1}}).catch(j.F);null!==e&&(_(e.youCanTurn),v(e.msg))},g=async()=>{await f.x.board.$delete()};return((0,a.useEffect)(()=>{let e=setInterval(b,500),n=setInterval(k,500);return()=>{clearInterval(e),clearInterval(n)}},[]),e&&n)?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(m,{user:e}),(0,i.jsxs)("div",{className:N().container,children:[(0,i.jsx)("p",{children:h}),-1!==u.black&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h2",{className:N().win,children:["結果:",u.black===u.white?"引き分け":u.black>u.white?"黒の勝ち":"白の勝ち"]}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:["黒: ",u.black]}),(0,i.jsxs)("li",{children:["白: ",u.white]})]})]}),-1===u.black&&(0,i.jsxs)("p",{children:[(0,i.jsx)("b",{style:{color:"red"},children:d?"あなた":"相手"}),"(",1===r?"黒":"白",")のターン"]}),(0,i.jsx)("div",{className:N().board,children:n.map((e,n)=>e.map((e,s)=>(0,i.jsx)(l,{color:e,isMyturn:d,onClick:()=>p(s,n)},"".concat(s,"-").concat(n))))}),-1!==u.black&&(0,i.jsxs)("div",{className:N().reTitle,children:[(0,i.jsx)("div",{className:N().reTitleText,children:"再戦しますか？"}),(0,i.jsx)("button",{className:N().reBtn,onClick:()=>g(),children:"再戦する"})]})]})]}):(0,i.jsx)(o.g,{visible:!0})};var p=b},7251:function(e,n,s){"use strict";s.d(n,{_:function(){return r},k:function(){return c}});var i=s(7908),t=s(328),a=s(3377);let r=async()=>{let e=new i.GH;e.addScope("read:user"),await (0,i.rh)((0,t.l)(),e).catch(a.F)},c=async()=>{await (0,t.l)().signOut()}},4110:function(e){e.exports={cell:"cell_cell__VTQkI",stone:"cell_stone__pDME7"}},2038:function(e){e.exports={container:"BasicHeader_container__5rTZS",main:"BasicHeader_main__yd6De",userBtn:"BasicHeader_userBtn__B7CLf",userIcon:"BasicHeader_userIcon__fjiOn",userName:"BasicHeader_userName__vjAjN"}},7281:function(e){e.exports={title:"index_title___brqs",tasks:"index_tasks__owmij",deleteBtn:"index_deleteBtn__P835P",container:"index_container__twYoi",main:"index_main__NvCNi",footer:"index_footer__lrZ6z",description:"index_description__WXt7f",code:"index_code__Uk3z2",grid:"index_grid__W2sp0",card:"index_card__4cS9Y",logo:"index_logo__IeyQD",board:"index_board__j13uV",win:"index_win__tda0s",reTitle:"index_reTitle__0nZI_",reTitleText:"index_reTitleText__kUL6O",reBtn:"index_reBtn___bs7c"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);