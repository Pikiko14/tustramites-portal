(this["webpackJsonptus-tramites-administrador"]=this["webpackJsonptus-tramites-administrador"]||[]).push([[32],{445:function(e,n,t){"use strict";var a=t(0),c=t.n(a),o=t(256),i=t(47),r=t.n(i),l=t(8),s=t(13),d=t(3),p=t(6),b=t(75),u=t(14),m=t(20),j=t(211),g=t(4),v=t(76),h=t(200),f=c.a.forwardRef((function(e,n){var t=e.prefixCls,a=e.forceRender,o=e.className,i=e.style,l=e.children,s=e.isActive,p=e.role,b=c.a.useState(s||a),u=Object(d.a)(b,2),m=u[0],j=u[1];return c.a.useEffect((function(){(a||s)&&j(!0)}),[a,s]),m?c.a.createElement("div",{ref:n,className:r()("".concat(t,"-content"),Object(g.a)(Object(g.a)({},"".concat(t,"-content-active"),s),"".concat(t,"-content-inactive"),!s),o),style:i,role:p},c.a.createElement("div",{className:"".concat(t,"-content-box")},l)):null}));f.displayName="PanelContent";var O=f,x=["showArrow","headerClass","isActive","onItemClick","forceRender","className","prefixCls","collapsible","accordion","panelKey","extra","header","expandIcon","openMotion","destroyInactivePanel","children"],y=c.a.forwardRef((function(e,n){var t=e.showArrow,a=void 0===t||t,o=e.headerClass,i=e.isActive,s=e.onItemClick,d=e.forceRender,p=e.className,b=e.prefixCls,u=e.collapsible,j=e.accordion,f=e.panelKey,y=e.extra,C=e.header,I=e.expandIcon,N=e.openMotion,k=e.destroyInactivePanel,S=e.children,P=Object(m.a)(e,x),w="disabled"===u,E="header"===u,A="icon"===u,M=null!==y&&void 0!==y&&"boolean"!==typeof y,R=function(){null===s||void 0===s||s(f)},B="function"===typeof I?I(e):c.a.createElement("i",{className:"arrow"});B&&(B=c.a.createElement("div",{className:"".concat(b,"-expand-icon"),onClick:["header","icon"].includes(u)?R:void 0},B));var q=r()(Object(g.a)(Object(g.a)(Object(g.a)({},"".concat(b,"-item"),!0),"".concat(b,"-item-active"),i),"".concat(b,"-item-disabled"),w),p),H={className:r()(o,Object(g.a)(Object(g.a)(Object(g.a)({},"".concat(b,"-header"),!0),"".concat(b,"-header-collapsible-only"),E),"".concat(b,"-icon-collapsible-only"),A)),"aria-expanded":i,"aria-disabled":w,onKeyDown:function(e){"Enter"!==e.key&&e.keyCode!==h.a.ENTER&&e.which!==h.a.ENTER||R()}};return E||A||(H.onClick=R,H.role=j?"tab":"button",H.tabIndex=w?-1:0),c.a.createElement("div",Object(l.a)({},P,{ref:n,className:q}),c.a.createElement("div",H,a&&B,c.a.createElement("span",{className:"".concat(b,"-header-text"),onClick:"header"===u?R:void 0},C),M&&c.a.createElement("div",{className:"".concat(b,"-extra")},y)),c.a.createElement(v.c,Object(l.a)({visible:i,leavedClassName:"".concat(b,"-content-hidden")},N,{forceRender:d,removeOnLeave:k}),(function(e,n){var t=e.className,a=e.style;return c.a.createElement(O,{ref:n,prefixCls:b,className:t,style:a,isActive:i,forceRender:d,role:j?"tabpanel":void 0},S)})))})),C=["children","label","key","collapsible","onItemClick","destroyInactivePanel"];var I=function(e,n,t){return Array.isArray(e)?function(e,n){var t=n.prefixCls,a=n.accordion,o=n.collapsible,i=n.destroyInactivePanel,r=n.onItemClick,s=n.activeKey,d=n.openMotion,p=n.expandIcon;return e.map((function(e,n){var b=e.children,u=e.label,j=e.key,g=e.collapsible,v=e.onItemClick,h=e.destroyInactivePanel,f=Object(m.a)(e,C),O=String(null!==j&&void 0!==j?j:n),x=null!==g&&void 0!==g?g:o,I=null!==h&&void 0!==h?h:i,N=!1;return N=a?s[0]===O:s.indexOf(O)>-1,c.a.createElement(y,Object(l.a)({},f,{prefixCls:t,key:O,panelKey:O,isActive:N,accordion:a,openMotion:d,expandIcon:p,header:u,collapsible:x,onItemClick:function(e){"disabled"!==x&&(r(e),null===v||void 0===v||v(e))},destroyInactivePanel:I}),b)}))}(e,t):Object(j.a)(n).map((function(e,n){return function(e,n,t){if(!e)return null;var a=t.prefixCls,o=t.accordion,i=t.collapsible,r=t.destroyInactivePanel,l=t.onItemClick,s=t.activeKey,d=t.openMotion,p=t.expandIcon,b=e.key||String(n),u=e.props,m=u.header,j=u.headerClass,g=u.destroyInactivePanel,v=u.collapsible,h=u.onItemClick,f=!1;f=o?s[0]===b:s.indexOf(b)>-1;var O=null!==v&&void 0!==v?v:i,x={key:b,panelKey:b,header:m,headerClass:j,isActive:f,prefixCls:a,destroyInactivePanel:null!==g&&void 0!==g?g:r,openMotion:d,accordion:o,children:e.props.children,onItemClick:function(e){"disabled"!==O&&(l(e),null===h||void 0===h||h(e))},expandIcon:p,collapsible:O};return"string"===typeof e.type?e:(Object.keys(x).forEach((function(e){"undefined"===typeof x[e]&&delete x[e]})),c.a.cloneElement(e,x))}(e,n,t)}))},N=t(201);function k(e){var n=e;if(!Array.isArray(n)){var t=Object(p.a)(n);n="number"===t||"string"===t?[n]:[]}return n.map((function(e){return String(e)}))}var S=c.a.forwardRef((function(e,n){var t=e.prefixCls,a=void 0===t?"rc-collapse":t,o=e.destroyInactivePanel,i=void 0!==o&&o,p=e.style,m=e.accordion,j=e.className,g=e.children,v=e.collapsible,h=e.openMotion,f=e.expandIcon,O=e.activeKey,x=e.defaultActiveKey,y=e.onChange,C=e.items,S=r()(a,j),P=Object(b.a)([],{value:O,onChange:function(e){return null===y||void 0===y?void 0:y(e)},defaultValue:x,postState:k}),w=Object(d.a)(P,2),E=w[0],A=w[1];Object(u.a)(!g,"[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");var M=I(C,g,{prefixCls:a,accordion:m,openMotion:h,expandIcon:f,collapsible:v,destroyInactivePanel:i,onItemClick:function(e){return A((function(){return m?E[0]===e?[]:[e]:E.indexOf(e)>-1?E.filter((function(n){return n!==e})):[].concat(Object(s.a)(E),[e])}))},activeKey:E});return c.a.createElement("div",Object(l.a)({ref:n,className:S,style:p,role:m?"tablist":void 0},Object(N.a)(e,{aria:!0,data:!0})),M)})),P=Object.assign(S,{Panel:y}),w=P,E=(P.Panel,t(197)),A=t(218),M=t(212),R=t(23),B=t(214);var q=a.forwardRef(((e,n)=>{const{getPrefixCls:t}=a.useContext(R.a),{prefixCls:c,className:o,showArrow:i=!0}=e,l=t("collapse",c),s=r()({["".concat(l,"-no-arrow")]:!i},o);return a.createElement(w.Panel,Object.assign({ref:n},e,{prefixCls:l,className:s}))})),H=t(21),K=t(69),L=t(456),T=t(446),_=t(342);const G=e=>{const{componentCls:n,contentBg:t,padding:a,headerBg:c,headerPadding:o,collapseHeaderPaddingSM:i,collapseHeaderPaddingLG:r,collapsePanelBorderRadius:l,lineWidth:s,lineType:d,colorBorder:p,colorText:b,colorTextHeading:u,colorTextDisabled:m,fontSizeLG:j,lineHeight:g,lineHeightLG:v,marginSM:h,paddingSM:f,paddingLG:O,paddingXS:x,motionDurationSlow:y,fontSizeIcon:C,contentPadding:I,fontHeight:N,fontHeightLG:k}=e,S="".concat(Object(H.d)(s)," ").concat(d," ").concat(p);return{[n]:Object.assign(Object.assign({},Object(K.f)(e)),{backgroundColor:c,border:S,borderRadius:l,"&-rtl":{direction:"rtl"},["& > ".concat(n,"-item")]:{borderBottom:S,"&:last-child":{["\n            &,\n            & > ".concat(n,"-header")]:{borderRadius:"0 0 ".concat(Object(H.d)(l)," ").concat(Object(H.d)(l))}},["> ".concat(n,"-header")]:{position:"relative",display:"flex",flexWrap:"nowrap",alignItems:"flex-start",padding:o,color:u,lineHeight:g,cursor:"pointer",transition:"all ".concat(y,", visibility 0s"),["> ".concat(n,"-header-text")]:{flex:"auto"},"&:focus":{outline:"none"},["".concat(n,"-expand-icon")]:{height:N,display:"flex",alignItems:"center",paddingInlineEnd:h},["".concat(n,"-arrow")]:Object.assign(Object.assign({},Object(K.g)()),{fontSize:C,transition:"transform ".concat(y),svg:{transition:"transform ".concat(y)}}),["".concat(n,"-header-text")]:{marginInlineEnd:"auto"}},["".concat(n,"-icon-collapsible-only")]:{cursor:"unset",["".concat(n,"-expand-icon")]:{cursor:"pointer"}}},["".concat(n,"-content")]:{color:b,backgroundColor:t,borderTop:S,["& > ".concat(n,"-content-box")]:{padding:I},"&-hidden":{display:"none"}},"&-small":{["> ".concat(n,"-item")]:{["> ".concat(n,"-header")]:{padding:i,paddingInlineStart:x,["> ".concat(n,"-expand-icon")]:{marginInlineStart:e.calc(f).sub(x).equal()}},["> ".concat(n,"-content > ").concat(n,"-content-box")]:{padding:f}}},"&-large":{["> ".concat(n,"-item")]:{fontSize:j,lineHeight:v,["> ".concat(n,"-header")]:{padding:r,paddingInlineStart:a,["> ".concat(n,"-expand-icon")]:{height:k,marginInlineStart:e.calc(O).sub(a).equal()}},["> ".concat(n,"-content > ").concat(n,"-content-box")]:{padding:O}}},["".concat(n,"-item:last-child")]:{borderBottom:0,["> ".concat(n,"-content")]:{borderRadius:"0 0 ".concat(Object(H.d)(l)," ").concat(Object(H.d)(l))}},["& ".concat(n,"-item-disabled > ").concat(n,"-header")]:{"\n          &,\n          & > .arrow\n        ":{color:m,cursor:"not-allowed"}},["&".concat(n,"-icon-position-end")]:{["& > ".concat(n,"-item")]:{["> ".concat(n,"-header")]:{["".concat(n,"-expand-icon")]:{order:1,paddingInlineEnd:0,paddingInlineStart:h}}}}})}},z=e=>{const{componentCls:n}=e,t="> ".concat(n,"-item > ").concat(n,"-header ").concat(n,"-arrow");return{["".concat(n,"-rtl")]:{[t]:{transform:"rotate(180deg)"}}}},F=e=>{const{componentCls:n,headerBg:t,paddingXXS:a,colorBorder:c}=e;return{["".concat(n,"-borderless")]:{backgroundColor:t,border:0,["> ".concat(n,"-item")]:{borderBottom:"1px solid ".concat(c)},["\n        > ".concat(n,"-item:last-child,\n        > ").concat(n,"-item:last-child ").concat(n,"-header\n      ")]:{borderRadius:0},["> ".concat(n,"-item:last-child")]:{borderBottom:0},["> ".concat(n,"-item > ").concat(n,"-content")]:{backgroundColor:"transparent",borderTop:0},["> ".concat(n,"-item > ").concat(n,"-content > ").concat(n,"-content-box")]:{paddingTop:a}}}},X=e=>{const{componentCls:n,paddingSM:t}=e;return{["".concat(n,"-ghost")]:{backgroundColor:"transparent",border:0,["> ".concat(n,"-item")]:{borderBottom:0,["> ".concat(n,"-content")]:{backgroundColor:"transparent",border:0,["> ".concat(n,"-content-box")]:{paddingBlock:t}}}}}};var D=Object(T.b)("Collapse",(e=>{const n=Object(_.b)(e,{collapseHeaderPaddingSM:"".concat(Object(H.d)(e.paddingXS)," ").concat(Object(H.d)(e.paddingSM)),collapseHeaderPaddingLG:"".concat(Object(H.d)(e.padding)," ").concat(Object(H.d)(e.paddingLG)),collapsePanelBorderRadius:e.borderRadiusLG});return[G(n),F(n),X(n),z(n),Object(L.a)(n)]}),(e=>({headerPadding:"".concat(e.paddingSM,"px ").concat(e.padding,"px"),headerBg:e.colorFillAlter,contentPadding:"".concat(e.padding,"px 16px"),contentBg:e.colorBgContainer})));const J=a.forwardRef(((e,n)=>{const{getPrefixCls:t,direction:c,collapse:i}=a.useContext(R.a),{prefixCls:l,className:s,rootClassName:d,style:p,bordered:b=!0,ghost:u,size:m,expandIconPosition:g="start",children:v,expandIcon:h}=e,f=Object(B.a)((e=>{var n;return null!==(n=null!==m&&void 0!==m?m:e)&&void 0!==n?n:"middle"})),O=t("collapse",l),x=t(),[y,C,I]=D(O);const N=a.useMemo((()=>"left"===g?"start":"right"===g?"end":g),[g]),k=null!==h&&void 0!==h?h:null===i||void 0===i?void 0:i.expandIcon,S=a.useCallback((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n="function"===typeof k?k(e):a.createElement(o.a,{rotate:e.isActive?90:void 0});return Object(M.a)(n,(()=>{var e;return{className:r()(null===(e=null===n||void 0===n?void 0:n.props)||void 0===e?void 0:e.className,"".concat(O,"-arrow"))}}))}),[k,O]),P=r()("".concat(O,"-icon-position-").concat(N),{["".concat(O,"-borderless")]:!b,["".concat(O,"-rtl")]:"rtl"===c,["".concat(O,"-ghost")]:!!u,["".concat(O,"-").concat(f)]:"middle"!==f},null===i||void 0===i?void 0:i.className,s,d,C,I),q=Object.assign(Object.assign({},Object(A.a)(x)),{motionAppear:!1,leavedClassName:"".concat(O,"-content-hidden")}),H=a.useMemo((()=>v?Object(j.a)(v).map(((e,n)=>{var t,a;if(null===(t=e.props)||void 0===t?void 0:t.disabled){const t=null!==(a=e.key)&&void 0!==a?a:String(n),{disabled:c,collapsible:o}=e.props,i=Object.assign(Object.assign({},Object(E.a)(e.props,["disabled"])),{key:t,collapsible:null!==o&&void 0!==o?o:c?"disabled":void 0});return Object(M.a)(e,i)}return e})):null),[v]);return y(a.createElement(w,Object.assign({ref:n,openMotion:q},Object(E.a)(e,["rootClassName"]),{expandIcon:S,prefixCls:O,className:P,style:Object.assign(Object.assign({},null===i||void 0===i?void 0:i.style),p)}),H))}));var W=Object.assign(J,{Panel:q});n.a=W},473:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t(445),o=t(444),i=t(68),r=t(77),l=t(213),s=t(1);const{Panel:d}=c.a;n.default=()=>{const[e,n]=Object(a.useState)(),[t,p]=Object(a.useState)([]),[b,u]=Object(a.useState)([]),[m,j]=Object(a.useState)([]),[g,v]=Object(a.useState)(!1),[h,f]=Object(a.useState)([]),{dispatch:O}=Object(a.useContext)(r.a);return Object(a.useEffect)((()=>{(async()=>{const e=await i.a.get("/api/categoryquestion");200==e.status&&p(e.data)})(),(async()=>{const e=await i.a.get("/api/subcategoryquestion");200==e.status&&(n(e.data[0]._id),u(e.data))})(),(async()=>{const e=await i.a.get("/api/question");200==e.status&&e.data.length>0&&j(e.data)})()}),[]),Object(s.jsxs)(l.a,{visible:!1,children:[Object(s.jsxs)("div",{className:"page-title",children:[Object(s.jsx)("h1",{children:"Preguntas frecuentes"}),Object(s.jsx)("img",{src:"/assets/images/question.png"})]}),Object(s.jsxs)("div",{className:"page-content",children:[Object(s.jsxs)("div",{className:"frequent-questions",children:[Object(s.jsxs)("div",{className:"tree-root",children:[Object(s.jsx)(o.a.Search,{placeholder:"Buscar ...",onSearch:e=>{if(""!=e){let n=m.filter((n=>n.question.search(e)>-1||n.answer.search(e)>-1));v(!0),f(n)}else v(!1),f([])}}),Object(s.jsx)(c.a,{style:{marginTop:"20px"},defaultActiveKey:["0"],children:t.map(((t,a)=>Object(s.jsx)(d,{header:t.name,children:Object(s.jsx)("ul",{children:b.filter((e=>e.category._id==t._id)).map(((t,a)=>Object(s.jsx)("li",{className:e==t._id?"active":"",onClick:()=>n(t._id),children:t.name},a)))})},a)))})]}),Object(s.jsx)("div",{className:"tree-content",children:Object(s.jsx)("div",{className:"page-content-frequent",children:g?Object(s.jsx)(s.Fragment,{children:h.map(((e,n)=>Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h2",{children:e.question}),Object(s.jsx)("p",{children:e.answer})]})))}):Object(s.jsx)(s.Fragment,{children:m.filter((n=>n.subcategory._id==e)).map(((e,n)=>Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h2",{children:e.question}),Object(s.jsx)("p",{children:e.answer})]})))})})})]}),Object(s.jsxs)("div",{className:"frequent-icon",children:[Object(s.jsx)("p",{className:"frequent-icon-title",children:"Si tienes alguna inquietud adicional, no dudes en contactarnos."}),Object(s.jsxs)("ul",{children:[Object(s.jsxs)("li",{onClick:()=>O({type:"CHAT_ME",payload:!0}),children:[Object(s.jsx)("img",{src:"/assets/icon/home_message.svg"}),Object(s.jsx)("p",{children:"Chat en l\xednea"})]}),Object(s.jsxs)("li",{onClick:()=>O({type:"CALL_ME",payload:!0}),children:[Object(s.jsx)("img",{src:"/assets/icon/home_support.svg"}),Object(s.jsx)("p",{children:"Nosotros te llamamos"})]})]})]})]})]})}}}]);
//# sourceMappingURL=32.8d31b4c7.chunk.js.map