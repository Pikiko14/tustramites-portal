(this["webpackJsonptus-tramites-administrador"]=this["webpackJsonptus-tramites-administrador"]||[]).push([[29],{341:function(e,s,a){},454:function(e,s,a){"use strict";a.r(s);var t=a(483),c=a(444),n=a(229),i=a(0),r=a(9),o=a(70),l=a(68),d=a(74),j=a(79),m=a(71),b=(a(341),a(1));const h=new j.a;s.default=e=>{const[s]=t.a.useForm(),a=Object(r.g)(),{updateUser:j}=Object(i.useContext)(d.a);return Object(i.useEffect)((()=>{localStorage.clear();const e=new URLSearchParams(window.location.search);e.get("token")&&(h.set("token",e.get("token")),window.location.href="/")}),[]),Object(b.jsx)("div",{className:"login",style:{backgroundImage:"url(/assets/images/background-login.svg)"},children:Object(b.jsxs)("div",{className:"login-content",children:[Object(b.jsx)("div",{className:"login-back"}),Object(b.jsxs)("div",{className:"login-sub-content",children:[Object(b.jsxs)("div",{className:"login-header",children:[Object(b.jsx)("h3",{className:"title",children:"Inicia Sesi\xf3n"}),Object(b.jsx)("img",{className:"image-icon",src:"/assets/icon/logo-color.svg"})]}),Object(b.jsxs)("div",{className:"login-panel",children:[Object(b.jsxs)(t.a,{layout:"vertical",form:s,onFinish:e=>{(async e=>{await l.a.post("/api/user/login/landing",e).then((e=>{h.set("token",e.data.token),j(e.data.user),"CLIENTE"!==e.data.user.role?window.location.href="/general":window.location.href="/"})).catch((e=>{o.a.show({type:"error",title:"Error ",message:"Correo o contrese\xf1a incorrectos. Por favor verifica tus datos e intenta nuevamente.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"})}))})(e)},children:[Object(b.jsx)("div",{className:"form-control",children:Object(b.jsx)(t.a.Item,{name:"email",id:"email",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingresa tu email"}],children:Object(b.jsx)(c.a,{placeholder:"Correo electr\xf3nico"})})}),Object(b.jsx)("div",{className:"form-control",children:Object(b.jsx)(t.a.Item,{name:"password",id:"password",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingresa tu contrase\xf1a"}],children:Object(b.jsx)(c.a.Password,{placeholder:"Contrase\xf1a"})})}),Object(b.jsxs)("p",{className:"subtitle",children:["\xbfOlvidaste tu contrase\xf1a?",Object(b.jsx)("a",{onClick:()=>a.push("/remember"),className:"primary",children:"Haz click aqu\xed"})]}),Object(b.jsx)("div",{className:"containerButton",children:Object(b.jsx)(n.a,{htmlType:"submit",className:"form-action-login",children:"Inicia sesi\xf3n"})})]}),Object(b.jsxs)("div",{className:"content-btn",children:[Object(b.jsxs)("div",{className:"content-btn-list",children:[Object(b.jsx)("a",{className:"btn-goo",href:"https://api.tustramitess.xyz/api/auth/google",children:Object(b.jsx)(m.j,{})}),Object(b.jsx)("a",{className:"btn-goo",href:"https://api.tustramitess.xyz/api/auth/facebook",children:Object(b.jsx)(m.e,{})})]}),Object(b.jsx)("span",{className:"text",children:"Inicia sesi\xf3n con tu cuenta de Google y/o Facebook."})]}),Object(b.jsx)("div",{className:"notAccount",children:Object(b.jsxs)("p",{className:"text",children:["\xbfA\xfan no tienes cuenta?",Object(b.jsx)("a",{href:"/register",className:"link",children:"Reg\xedstrate"})]})})]}),Object(b.jsx)("br",{})]})]})})}}}]);
//# sourceMappingURL=29.c3ec7407.chunk.js.map