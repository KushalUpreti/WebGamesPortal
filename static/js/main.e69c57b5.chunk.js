(this.webpackJsonpwebgames=this.webpackJsonpwebgames||[]).push([[0],{34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a(3),r=a.n(n),i=a(27),o=a.n(i),s=(a(34),a(12)),l=a(5),d=(a(35),a(9)),u=a(15),j=(a(36),function(e){return Object(c.jsx)("div",{style:{marginTop:"".concat(e.marginTop)},className:"Container",children:e.children})}),h=(a(37),function(e){return Object(c.jsx)("form",{className:"From",onSubmit:e.submit,children:e.children})}),m=(a(38),Object(n.createContext)({value:"",searchItem:function(){}})),b=function(e){return Object(c.jsx)(m.Consumer,{children:function(t){return Object(c.jsx)("input",{className:"Input",id:e.id,type:e.type,placeholder:e.placeholder,onChange:t.searchItem,value:t.value||e.value})}})},f=function(e){return Object(c.jsx)(h,{children:Object(c.jsx)(b,{type:"text",placeholder:"Search..",name:"search"})})},g=(a(39),function(e){return Object(c.jsx)("select",{onChange:e.change,className:"Dropdown",children:e.children})}),O=(a(40),function(e){return Object(c.jsx)(s.b,{to:{pathname:"/game",search:"?id=".concat(e.id,"&category=").concat(e.category),data:e.gameUrl,title:e.title,firebase:e.fireb},children:Object(c.jsxs)("div",{className:"GameCard",children:[Object(c.jsx)("img",{src:e.url,alt:"Cover_image"}),Object(c.jsx)("h3",{children:e.title})]})})}),v=a(18);v.a.initializeApp({apiKey:"AIzaSyCa21G1mEhrJKmoPLRZ8hbJikyI4lGdY5Y",authDomain:"dif-instantgames.firebaseapp.com",databaseURL:"https://dif-instantgames.firebaseio.com/",storageBucket:"dif-instantgames.appspot.com"});var x=v.a;a(49);var y=function(){return Object(c.jsx)(r.a.Fragment,{children:Object(c.jsxs)("div",{className:"loader",children:[Object(c.jsx)("div",{className:"face",children:Object(c.jsx)("div",{className:"circle"})}),Object(c.jsx)("div",{className:"face",children:Object(c.jsx)("div",{className:"circle"})})]})})},p=(a(50),function(e){var t=Object(n.useState)({gamelist:[],dataLoaded:!1}),a=Object(u.a)(t,2),i=a[0],o=a[1];return Object(n.useEffect)((function(){var t,a,c;t=e.category,a=" ",c=6,t=t.toLowerCase(),x.database().ref("/Game Collection/"+t).orderByKey().startAt(a).limitToFirst(c).once("value").then((function(e){e.forEach((function(e){!function(e,t){x.database().ref("/Game Collection/all").orderByKey().startAt(e).limitToFirst(t).once("value").then(l)}(e.key,c)}))}))}),[]),Object(c.jsx)(r.a.Fragment,{children:Object(c.jsxs)("div",{children:[Object(c.jsxs)(j,{children:[Object(c.jsx)("h2",{children:e.title}),Object(c.jsx)(s.c,{to:{pathname:"/category",search:"&category=".concat(e.category)},children:"More"})]}),Object(c.jsx)(j,{marginTop:"10px",children:i.dataLoaded?i.gamelist.map((function(e){return Object(c.jsx)(O,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(y,{})})]})});function l(e){var t=[];e.forEach((function(e){var a={gameId:e.key,name:e.val().name,url:e.val().url,imageUrl:e.val().imageUrl,category:e.val().category};t.push(a)})),o(Object(d.a)(Object(d.a)({},i),{},{gamelist:[].concat(t),dataLoaded:!0}))}}),L=Object(l.e)((function(e){var t=Object(n.useState)({discoverList:[],searchKey:"",dataLoaded:!1}),a=Object(u.a)(t,2),r=a[0],i=a[1],o=Object(n.useState)({categoryList:[]}),s=Object(u.a)(o,2),l=s[0],h=s[1];Object(n.useEffect)((function(){!function(){var e;e=x.database().ref("/Game Collection/Categories Included");var t=[];e.once("value").then((function(e){e.forEach((function(e){var a=e.val();t.push(a)})),h({categoryList:[].concat(t)})}))}(),x.database().ref("/Discover Cards").once("value").then((function(e){var t=[];e.forEach((function(e){var a={title:e.val().title,category:e.val().category};t.push(a)})),i(Object(d.a)(Object(d.a)({},r),{},{discoverList:[].concat(t),dataLoaded:!0}))}))}),[]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(j,{children:[Object(c.jsx)(m.Provider,{value:{value:r.searchKey,searchItem:function(e){var t,a;e.target.value.length>0?(t=e.target.value,a=12,t=t.toLowerCase(),x.database().ref("/Game Collection/search index").orderByValue().startAt(t).limitToFirst(a).once("value").then((function(e){e.forEach((function(e){O(e.key,1)}))}))):O(" ",r.itemCount)}},children:Object(c.jsx)(f,{})}),Object(c.jsxs)(g,{change:function(t){var a=t.target.value;e.history.push({pathname:"/category",search:"&category=".concat(a)})},children:[Object(c.jsx)("option",{value:"",defaultValue:"selected",disabled:"disabled",children:"Genre"}),l.categoryList.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))]})]}),r.dataLoaded?r.discoverList.map((function(e){var t=e.title.slice(0,15);return Object(c.jsx)(p,{category:e.category,title:e.title},t)})):Object(c.jsx)(y,{})]});function b(e){var t=[];e.forEach((function(e){var a={gameId:e.key,name:e.val().name,url:e.val().url,imageUrl:e.val().imageUrl,category:e.val().category};t.push(a)})),i(Object(d.a)(Object(d.a)({},r),{},{gamelist:[].concat(t),dataLoaded:!0}))}function O(e,t){x.database().ref("/Game Collection/all").orderByKey().startAt(e).limitToFirst(t).once("value").then(b)}})),C=(a(51),a(52),function(e){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("ul",{className:"NavLinks",children:[Object(c.jsx)("li",{children:Object(c.jsx)(s.c,{to:"/about",children:"ABOUT US"})}),Object(c.jsx)("li",{children:Object(c.jsx)(s.c,{to:"/contact",children:"CONTACT US"})}),Object(c.jsx)("li",{children:Object(c.jsx)(s.c,{to:"/login",children:"AUTHENTICATE"})})]})})}),I=function(e){return Object(c.jsxs)("header",{className:"MainHeader",children:[Object(c.jsx)("h1",{className:"main-navigation__title",children:Object(c.jsx)(s.b,{to:"/",children:"Web Games Portal"})}),Object(c.jsx)(C,{})]})},T=(a(53),function(e){return Object(c.jsx)("iframe",{className:"IFrame",title:"gamespace",src:e.path})}),U=Object(l.e)((function(e){var t=Object(n.useState)({gamelist:[],dataLoaded:!1}),a=Object(u.a)(t,2),r=a[0],i=a[1];return Object(n.useEffect)((function(){var t=new URLSearchParams(e.location.search).get("category"),a=t.indexOf(",");-1!==a&&(t=t.slice(0,a)),function(e,t,a){e=e.toLowerCase(),x.database().ref("/Game Collection/"+e).orderByKey().startAt(t).limitToFirst(a).once("value").then((function(e){e.forEach((function(e){!function(e,t){x.database().ref("/Game Collection/all").orderByKey().startAt(e).limitToFirst(t).once("value").then(o)}(e.key,a)}))}))}(t," ",24)}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h2",{style:{color:"white"},children:e.location.title}),Object(c.jsx)(j,{marginTop:0,children:Object(c.jsx)(T,{path:e.location.data})}),Object(c.jsx)(j,{children:r.dataLoaded?r.gamelist.map((function(e){return Object(c.jsx)(O,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(y,{})})]});function o(e){var t=[];e.forEach((function(e){var a={gameId:e.key,name:e.val().name,url:e.val().url,imageUrl:e.val().imageUrl,category:e.val().category};t.push(a)})),i(Object(d.a)(Object(d.a)({},r),{},{gamelist:[].concat(t),dataLoaded:!0}))}})),F=Object(l.e)((function(e){var t=new URLSearchParams(e.location.search).get("category"),a=Object(n.useState)({gameList:[],searchKey:"",dataLoaded:!1}),r=Object(u.a)(a,2),i=r[0],o=r[1],s=Object(n.useState)({categoryList:[]}),l=Object(u.a)(s,2),h=l[0],b=l[1];Object(n.useEffect)((function(){!function(){var e;e=x.database().ref("/Game Collection/Categories Included");var t=[];e.once("value").then((function(e){e.forEach((function(e){var a=e.val();t.push(a)})),b({categoryList:[].concat(t)})}))}(),function(e,t,a){e=e.toLowerCase(),x.database().ref("/Game Collection/"+e).orderByKey().startAt(t).limitToFirst(a).once("value").then((function(e){e.forEach((function(e){p(e.key,a)}))}))}(new URLSearchParams(e.location.search).get("category")," ",24)}),[]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(j,{children:[Object(c.jsx)(m.Provider,{value:{value:i.searchKey,searchItem:function(e){var t,a;e.target.value.length>0?(t=e.target.value,a=12,t=t.toLowerCase(),x.database().ref("/Game Collection/search index").orderByValue().startAt(t).limitToFirst(a).once("value").then((function(e){e.forEach((function(e){p(e.key,1)}))}))):p(" ",i.itemCount)}},children:Object(c.jsx)(f,{})}),Object(c.jsxs)(g,{change:function(t){var a=t.target.value;e.history.push({pathname:"/category",search:"&category=".concat(a)})},children:[Object(c.jsx)("option",{value:"",defaultValue:"selected",disabled:"disabled",children:"Genre"}),h.categoryList.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))]})]}),Object(c.jsx)("h1",{style:{color:"white",paddingLeft:"10%",marginTop:"40px"},children:t}),Object(c.jsx)(j,{marginTop:"15px",children:i.dataLoaded?i.gameList.map((function(e){return Object(c.jsx)(O,{url:e.imageUrl,gameUrl:e.url,title:e.name,id:e.gameId,category:e.category},e.gameId)})):Object(c.jsx)(y,{})})]});function v(e){var t=[];e.forEach((function(e){var a={gameId:e.key,name:e.val().name,url:e.val().url,imageUrl:e.val().imageUrl,category:e.val().category};t.push(a)})),o(Object(d.a)(Object(d.a)({},i),{},{gameList:[].concat(t),dataLoaded:!0}))}function p(e,t){x.database().ref("/Game Collection/all").orderByKey().startAt(e).limitToFirst(t).once("value").then(v)}}));var E=function(){return Object(c.jsx)(s.a,{children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(I,{}),Object(c.jsx)(l.a,{path:"/",exact:!0,children:Object(c.jsx)(L,{})}),Object(c.jsx)(l.a,{path:"/game",children:Object(c.jsx)(U,{})}),Object(c.jsx)(l.a,{path:"/category",children:Object(c.jsx)(F,{})})]})})},N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,55)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),c(e),n(e),r(e),i(e)}))};o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),N()}},[[54,1,2]]]);
//# sourceMappingURL=main.e69c57b5.chunk.js.map