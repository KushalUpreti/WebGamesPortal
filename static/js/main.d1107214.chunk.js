(this.webpackJsonpwebgames=this.webpackJsonpwebgames||[]).push([[0],{39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a(3),r=a.n(n),i=a(31),s=a.n(i),o=(a(39),a(11)),l=a(15),j=a(5),d=(a(40),a(10)),u=a(12),b=(a(41),function(e){return Object(c.jsx)("div",{style:{marginTop:"".concat(e.marginTop)},className:"Container",children:e.children})}),g=function(e){return Object(c.jsx)("form",{onSubmit:e.submit,children:e.children})},O=(a(42),Object(n.createContext)({value:"",searchItem:function(){}})),h=function(e){var t=Object(n.useContext)(O);return Object(c.jsx)("input",{className:"Input",id:e.id,type:e.type,placeholder:e.placeholder,onChange:t.searchItem,value:t.value||e.value})},m=function(e){return Object(c.jsx)(g,{children:Object(c.jsx)(h,{type:"text",placeholder:"Search..",name:"search"})})},f=(a(43),function(e){return Object(c.jsx)("select",{onChange:e.change,className:"Dropdown",children:e.children})}),x=(a(44),function(e){return Object(c.jsx)(l.b,{to:{pathname:"/game",search:"?id=".concat(e.id,"&category=").concat(e.category),data:e.gameUrl,title:e.title,firebase:e.fireb},children:Object(c.jsxs)("div",{className:"GameCard",children:[Object(c.jsx)("img",{src:e.url,alt:"Cover_image"}),Object(c.jsx)("h3",{children:e.title})]})})}),v=a(33),p=a.n(v),y=a(9);a(54);p.a.config();y.a.initializeApp({apiKey:"AIzaSyC1iIknhchQD0_l92tVQXI6wk1NMLc2VPE",authDomain:"dif-instantgames.firebaseapp.com",databaseURL:"https://dif-instantgames.firebaseio.com/",storageBucket:"dif-instantgames.appspot.com"});y.a;var L=y.a.auth(),I=new y.a.auth.GoogleAuthProvider;function C(e,t,a){y.a.database().ref("/Game Collection/all").orderByKey().startAt(e).limitToFirst(t).once("value").then(a)}function S(e,t,a,c){e=e.toLowerCase(),y.a.database().ref("/Game Collection/"+e).orderByKey().startAt(t).limitToFirst(a).once("value").then((function(e){e.forEach((function(e){C(e.key,1,c)}))}))}function N(e){y.a.database().ref("/Game Collection/Categories Included").once("value").then(e)}var U=function(e){var t=[];return e.forEach((function(e){var a={gameId:e.key,name:e.val().name,url:e.val().url,imageUrl:e.val().imageUrl,category:e.val().category};t.push(a)})),t},T=function(e){var t=[];return e.forEach((function(e){var a=e.val();t.push(a)})),t},k=(a(55),function(){return Object(c.jsx)(r.a.Fragment,{children:Object(c.jsxs)("div",{className:"loader",children:[Object(c.jsx)("div",{className:"face",children:Object(c.jsx)("div",{className:"circle"})}),Object(c.jsx)("div",{className:"face",children:Object(c.jsx)("div",{className:"circle"})})]})})}),w=(a(56),function(e){var t=Object(n.useState)({gamelist:[],dataLoaded:!1}),a=Object(o.a)(t,2),i=a[0],s=a[1];Object(n.useEffect)((function(){j()}),[]);var j=function(){S(e.category," ",6,(function(e){var t=U(e);s((function(e){return Object(d.a)(Object(d.a)({},i),{},{gamelist:[].concat(Object(u.a)(e.gamelist),Object(u.a)(t)),dataLoaded:!0})}))}))};return Object(c.jsx)(r.a.Fragment,{children:Object(c.jsxs)("div",{children:[Object(c.jsxs)(b,{children:[Object(c.jsx)("h2",{children:e.title}),Object(c.jsx)(l.c,{to:{pathname:"/category",search:"&category=".concat(e.category)},children:"More"})]}),Object(c.jsx)(b,{marginTop:"10px",children:i.dataLoaded?i.gamelist.map((function(e){return Object(c.jsx)(x,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(k,{})})]})})}),F=Object(j.g)((function(e){var t=Object(n.useState)({discoverList:[],searchKey:"",dataLoaded:!1,login:!1,test:!1}),a=Object(o.a)(t,2),r=a[0],i=a[1],s=Object(n.useState)({categoryList:[]}),l=Object(o.a)(s,2),j=l[0],g=l[1];Object(n.useEffect)((function(){h()}),[]);var h=function(){var e;N((function(e){var t=T(e);g({categoryList:Object(u.a)(t)})})),e=function(e){var t=function(e){var t=[];return e.forEach((function(e){var a={title:e.val().title,category:e.val().category};t.push(a)})),t}(e);i(Object(d.a)(Object(d.a)({},r),{},{discoverList:Object(u.a)(t),dataLoaded:!0}))},y.a.database().ref("/Discover Cards").once("value").then(e)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(b,{children:[Object(c.jsx)(O.Provider,{value:{value:r.searchKey},children:Object(c.jsx)(m,{})}),Object(c.jsxs)(f,{change:function(t){var a=t.target.value;e.history.push({pathname:"/category",search:"&category=".concat(a)})},children:[Object(c.jsx)("option",{value:"",defaultValue:"selected",disabled:"disabled",children:"Genre"}),j.categoryList.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))]})]}),r.dataLoaded?r.discoverList.map((function(e){var t=e.title.slice(0,15);return Object(c.jsx)(w,{category:e.category,title:e.title},t)})):Object(c.jsx)(k,{})]})})),E=(a(57),a(58),Object(n.createContext)({loggedIn:!1,signIn:function(){},signOut:function(){}})),P=(a(59),function(e){return Object(c.jsxs)("div",{className:"Avatar",children:[Object(c.jsx)("img",{className:"img-small",src:e.imageUrl,alt:"dp"}),Object(c.jsx)("h3",{className:"name",children:e.name})]})}),G=function(e){var t=Object(n.useContext)(E),a="",r="";if(t.loggedIn){var i=JSON.parse(localStorage.getItem("userCred")),s=(r=i.displayName).indexOf(" ");-1!==s&&s<8?r=r.slice(0,s):(r=r.slice(0,8),r+="..."),a=i.photoURL}return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("ul",{className:"NavLinks",children:[t.loggedIn?Object(c.jsx)("li",{children:Object(c.jsx)(l.c,{style:{background:"none",border:"none",color:"white"},to:"/user",children:Object(c.jsx)(P,{imageUrl:a,name:r})})}):null,Object(c.jsx)("li",{children:Object(c.jsx)(l.c,{to:"/about",children:"ABOUT US"})}),Object(c.jsx)("li",{children:Object(c.jsx)(l.c,{to:"/contact",children:"CONTACT US"})}),t.loggedIn?Object(c.jsx)("button",{onClick:function(){t.signOut()},children:"LOG OUT"}):Object(c.jsx)("li",{children:Object(c.jsx)("button",{onClick:function(){var e;e=t.signIn,L.signInWithPopup(I).then((function(t){localStorage.setItem("userCred",JSON.stringify(t.user)),e()})).catch((function(e){console.log(e.message)}))},children:"LOG IN"})})]})})},A=function(e){return Object(c.jsxs)("header",{className:"MainHeader",children:[Object(c.jsx)("h1",{className:"main-navigation__title",children:Object(c.jsx)(l.b,{to:"/",children:"Web Games Portal"})}),Object(c.jsx)(G,{})]})},K=(a(60),function(e){return Object(c.jsx)("iframe",{className:"IFrame",title:"gamespace",src:e.path})}),B=Object(j.g)((function(e){var t=Object(n.useState)({gamelist:[],dataLoaded:!1,loadingMore:!1,lastIndex:" "}),a=Object(o.a)(t,2),r=a[0],i=a[1],s=Object(n.useState)({title:"",gameLink:""}),l=Object(o.a)(s,2),j=l[0],g=l[1];Object(n.useEffect)((function(){O()}),[]);var O=function(){var t=new URLSearchParams(e.location.search),a=t.get("category"),c=t.get("id"),n=a.indexOf(",");-1!==n&&(a=a.slice(0,n)),C(c,1,(function(e){var t=U(e);g(Object(d.a)(Object(d.a)({},j),{},{title:t[0].name,gameLink:t[0].url}))})),S(a," ",24,(function(e){var t=U(e);i((function(e){return Object(d.a)(Object(d.a)({},r),{},{gamelist:[].concat(Object(u.a)(e.gamelist),Object(u.a)(t)),dataLoaded:!0})}))}))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{style:{color:"white",paddingLeft:"10%"},children:j.title}),Object(c.jsx)(b,{marginTop:0,children:Object(c.jsx)(K,{path:j.gameLink})}),Object(c.jsx)("h1",{style:{color:"white",paddingLeft:"10%",marginTop:"50px"},children:"Similar games"}),Object(c.jsxs)(b,{marginTop:"10px",children:[r.dataLoaded?r.gamelist.map((function(e){return Object(c.jsx)(x,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(k,{}),r.loadingMore?Object(c.jsx)(k,{}):null]})]})})),M=Object(j.g)((function(e){var t=new URLSearchParams(e.location.search).get("category"),a=Object(n.useState)({gameList:[],searchKey:"",dataLoaded:!1,newLoaded:!0}),r=Object(o.a)(a,2),i=r[0],s=r[1],l=Object(n.useState)({categoryList:[]}),j=Object(o.a)(l,2),g=j[0],h=j[1];Object(n.useEffect)((function(){v()}),[]);var v=function(){N((function(e){var t=T(e);h({categoryList:Object(u.a)(t)})})),S(t," ",24,(function(e){var t=U(e);s((function(e){return Object(d.a)(Object(d.a)({},i),{},{gameList:[].concat(Object(u.a)(e.gameList),Object(u.a)(t)),dataLoaded:!0})}))}))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(b,{children:[Object(c.jsx)(O.Provider,{value:{value:i.searchKey},children:Object(c.jsx)(m,{})}),Object(c.jsxs)(f,{change:function(t){var a=t.target.value;e.history.push({pathname:"/category",search:"&category=".concat(a)})},children:[Object(c.jsx)("option",{value:"",defaultValue:"selected",disabled:"disabled",children:"Genre"}),g.categoryList.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))]})]}),Object(c.jsx)("h1",{style:{color:"white",paddingLeft:"10%",marginTop:"40px",textTransform:"capitalize"},children:t}),Object(c.jsxs)(b,{marginTop:"15px",children:[i.dataLoaded?i.gameList.map((function(e){return Object(c.jsx)(x,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(k,{}),i.newLoaded?null:Object(c.jsx)(k,{})]})]})}));var D=function(){var e=Object(n.useState)({loggedIn:!1}),t=Object(o.a)(e,2),a=t[0],r=t[1];Object(n.useEffect)((function(){null!==localStorage.getItem("userCred")&&r({loggedIn:!0})}),[]);var i=Object(n.useCallback)((function(){r({loggedIn:!0}),console.log("Signed in")}),[]),s=Object(n.useCallback)((function(){localStorage.removeItem("userCred"),console.log("Signed in"),r({loggedIn:!1})}),[]);return Object(c.jsx)(l.a,{children:Object(c.jsx)(E.Provider,{value:{loggedIn:a.loggedIn,signIn:i,signOut:s},children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(A,{}),Object(c.jsxs)(j.d,{children:[Object(c.jsx)(j.b,{path:"/",exact:!0,children:Object(c.jsx)(F,{})}),Object(c.jsx)(j.b,{path:"/game",children:Object(c.jsx)(B,{})}),Object(c.jsx)(j.b,{path:"/category",children:Object(c.jsx)(M,{})}),Object(c.jsx)(j.a,{to:"/"})]})]})})})},J=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,62)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),c(e),n(e),r(e),i(e)}))};s.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(D,{})}),document.getElementById("root")),J()}},[[61,1,2]]]);
//# sourceMappingURL=main.d1107214.chunk.js.map