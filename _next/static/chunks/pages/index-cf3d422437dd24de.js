(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(7299)}])},7299:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return k}});var i=s(5893),t=s(4110),a=s.n(t);let r=e=>(0,i.jsx)("div",{className:a().cell,onClick:e.onClick,children:0!==e.color&&(0,i.jsx)("div",{className:a().stone,style:{background:3===e.color?e.isMyturn?"#ffdc00":"#999696":1===e.color?"#000":"#fff"}})});var c=s(8239),l=s(24),o=s(7294),d=s(5371),_=s(1290),u=s(3377);let x=()=>{let[e]=(0,l.KO)(d.L),[n,s]=(0,o.useState)(),[i,t]=(0,o.useState)(1),[a,r]=(0,o.useState)(!1),[c,x]=(0,o.useState)({white:-1,black:-1}),[h,m]=(0,o.useState)(""),f=async()=>{let e=await _.x.board.$get().catch(u.F);null!==e&&(s(e.board),t(e.nowTurn),x(e.win))},j=async(e,n)=>{await _.x.board.$post({body:{x:e,y:n}}),await f()},w=async()=>{let e=await _.x.board.$post({body:{x:-1,y:-1}}).catch(u.F);null!==e&&(r(e.youCanTurn),m(e.msg))},v=async()=>{await _.x.board.$delete()};return(0,o.useEffect)(()=>{let e=setInterval(f,500),n=setInterval(w,500);return()=>{clearInterval(e),clearInterval(n)}},[]),{user:e,board:n,turnColor:i,isMyturn:a,win:c,msg:h,onClick:j,deleteBoard:v}},h=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,i.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var m=s(1733),f=s(7251),j=s(2038),w=s.n(j);let v=e=>{let{user:n}=e,s=async()=>{confirm("Logout?")&&await (0,f.k)()};return(0,i.jsx)("div",{className:w().container,children:(0,i.jsxs)("div",{className:w().main,children:[(0,i.jsx)("img",{src:m.D.frourio_svg,height:36,alt:"frourio logo"}),(0,i.jsxs)("div",{className:w().userBtn,onClick:s,children:[n.photoURL?(0,i.jsx)("img",{className:w().userIcon,src:n.photoURL,height:24,alt:n.displayName}):(0,i.jsx)(h,{size:18,fill:"#555"}),(0,i.jsx)("span",{className:w().userName,children:n.displayName})]})]})})};var N=s(7281),b=s.n(N);let p=()=>{let{user:e,board:n,turnColor:s,isMyturn:t,win:a,msg:l,onClick:o,deleteBoard:d}=x();return e&&n?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(v,{user:e}),(0,i.jsxs)("div",{className:b().container,children:[(0,i.jsx)("p",{children:l}),-1!==a.black&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h2",{className:b().win,children:["結果:",a.black===a.white?"引き分け":a.black>a.white?"黒の勝ち":"白の勝ち"]}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:["黒: ",a.black]}),(0,i.jsxs)("li",{children:["白: ",a.white]})]})]}),-1===a.black&&(0,i.jsxs)("p",{children:[(0,i.jsx)("b",{style:{color:"red"},children:t?"あなた":"相手"}),"(",1===s?"黒":"白",")のターン"]}),(0,i.jsx)("div",{className:b().board,children:n.map((e,n)=>e.map((e,s)=>(0,i.jsx)(r,{color:e,isMyturn:t,onClick:()=>o(s,n)},"".concat(s,"-").concat(n))))}),-1!==a.black&&(0,i.jsxs)("div",{className:b().reTitle,children:[(0,i.jsx)("div",{className:b().reTitleText,children:"再戦しますか？"}),(0,i.jsx)("button",{className:b().reBtn,onClick:()=>d(),children:"再戦する"})]})]})]}):(0,i.jsx)(c.g,{visible:!0})};var k=p},7251:function(e,n,s){"use strict";s.d(n,{_:function(){return r},k:function(){return c}});var i=s(7908),t=s(328),a=s(3377);let r=async()=>{let e=new i.GH;e.addScope("read:user"),await (0,i.rh)((0,t.l)(),e).catch(a.F)},c=async()=>{await (0,t.l)().signOut()}},4110:function(e){e.exports={cell:"cell_cell__VTQkI",stone:"cell_stone__pDME7"}},2038:function(e){e.exports={container:"BasicHeader_container__5rTZS",main:"BasicHeader_main__yd6De",userBtn:"BasicHeader_userBtn__B7CLf",userIcon:"BasicHeader_userIcon__fjiOn",userName:"BasicHeader_userName__vjAjN"}},7281:function(e){e.exports={title:"index_title___brqs",tasks:"index_tasks__owmij",deleteBtn:"index_deleteBtn__P835P",container:"index_container__twYoi",main:"index_main__NvCNi",footer:"index_footer__lrZ6z",description:"index_description__WXt7f",code:"index_code__Uk3z2",grid:"index_grid__W2sp0",card:"index_card__4cS9Y",logo:"index_logo__IeyQD",board:"index_board__j13uV",win:"index_win__tda0s",reTitle:"index_reTitle__0nZI_",reTitleText:"index_reTitleText__kUL6O",reBtn:"index_reBtn___bs7c"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);