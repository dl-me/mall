(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OrderDetail"],{"0363":function(t,e,r){var n=r("3ac6"),i=r("d659"),a=r("78e7"),o=r("3e80"),s=r("1e63"),c=r("62d0"),u=i("wks"),f=n.Symbol,l=c?f:o;t.exports=function(t){return a(u,t)||(s&&a(f,t)?u[t]=f[t]:u[t]=l("Symbol."+t)),u[t]}},"0aa1":function(t,e,r){var n=r("a5eb"),i=r("4fff"),a=r("a016"),o=r("06fa"),s=o((function(){a(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return a(i(t))}})},"0afa":function(t,e,r){t.exports=r("2696")},"0cf0":function(t,e,r){var n=r("b323"),i=r("9e57"),a=i.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,a)}},1561:function(t,e){var r=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:r)(t)}},"1c0a":function(t,e,r){"use strict";var n=r("d63b"),i=r("8f95");t.exports=n?{}.toString:function(){return"[object "+i(this)+"]"}},"1e63":function(t,e,r){var n=r("06fa");t.exports=!!Object.getOwnPropertySymbols&&!n((function(){return!String(Symbol())}))},2696:function(t,e,r){var n=r("801c");t.exports=n},2874:function(t,e,r){var n=r("d63b"),i=r("4180").f,a=r("0273"),o=r("78e7"),s=r("1c0a"),c=r("0363"),u=c("toStringTag");t.exports=function(t,e,r,c){if(t){var f=r?t:t.prototype;o(f,u)||i(f,u,{configurable:!0,value:e}),c&&!n&&a(f,"toString",s)}}},"2f5a":function(t,e,r){var n,i,a,o=r("96e9"),s=r("3ac6"),c=r("dfdb"),u=r("0273"),f=r("78e7"),l=r("b2ed"),d=r("6e9a"),p=s.WeakMap,v=function(t){return a(t)?i(t):n(t,{})},h=function(t){return function(e){var r;if(!c(e)||(r=i(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}};if(o){var b=new p,g=b.get,A=b.has,y=b.set;n=function(t,e){return y.call(b,t,e),e},i=function(t){return g.call(b,t)||{}},a=function(t){return A.call(b,t)}}else{var m=l("state");d[m]=!0,n=function(t,e){return u(t,m,e),e},i=function(t){return f(t,m)?t[m]:{}},a=function(t){return f(t,m)}}t.exports={set:n,get:i,has:a,enforce:v,getterFor:h}},"336c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAB00lEQVR4Xu3boU4DQRSF4XMMjoAjBIVB4dEoLBqD4EXwPAQJhleAhBdAokFgSAgKeIEhk7RJQ1p2ZnZm9t5Tamqa2/2/bXfF5hIGXyGEPQBXAI4BbALYAPAE4JTkW81DZs1hNWaFEI4A3AHYXjLvhuR5je+ZzzAFMIu/B7C1IvKZ5IEkQEJ87P4guSMHkBgfu99J7koBZMTH7luSZzIAmfGfAA5l7gKZ8V8ATkg+1jz7cdYkdwEr8ZMAWIrvDmAtviuAxfhuAFbjuwBYjm8OYD2+KYCH+GYAXuKbAHiKrw7gLb4qgMf4agBe46sAeI4fDeA9fhSAQnwxgEp8EYBSfDaAWnwWgGJ8MoBqfBKAcvwggHr8nwDrEP8PMPRgZB1+BYNPhtQRBgHi/0QZIQlAGSEZQBUhC0ARIRtADaEIQAmhGEAFYRSAAsJoAO8IVQA8I1QD8IpQFcAjQnUAbwhNADwhNAPwgtAUwANCcwDrCF0ALCN0A7CK0BXAIkJ3AGsIkwBYQpgMoABBa2UmAhQgaC1NFSDorc1lInyTXLVVOh+V9T7pNeD3kSY8gXoluZ9VOPBhUwAL14Rly9MBwAXJa2mAGcLi+nw8SS8ALkk+1IyPs34Avmx3UDjkHr0AAAAASUVORK5CYII="},3397:function(t,e,r){"use strict";var n=r("06fa");t.exports=function(t,e){var r=[][t];return!r||!n((function(){r.call(null,e||function(){throw 1},1)}))}},"3b7b":function(t,e,r){r("bbe3");var n=r("a169");t.exports=n("Array").indexOf},"3e80":function(t,e){var r=0,n=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++r+n).toString(36)}},4344:function(t,e,r){var n=r("dfdb"),i=r("6220"),a=r("0363"),o=a("species");t.exports=function(t,e){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?n(r)&&(r=r[o],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},4508:function(t,e,r){var n=r("1561"),i=Math.max,a=Math.min;t.exports=function(t,e){var r=n(t);return r<0?i(r+e,0):a(r,e)}},4896:function(t,e,r){var n=r("6f8d"),i=r("c230"),a=r("9e57"),o=r("6e9a"),s=r("edbd"),c=r("7a37"),u=r("b2ed"),f=u("IE_PROTO"),l="prototype",d=function(){},p=function(){var t,e=c("iframe"),r=a.length,n="<",i="script",o=">",u="java"+i+":";e.style.display="none",s.appendChild(e),e.src=String(u),t=e.contentWindow.document,t.open(),t.write(n+i+o+"document.F=Object"+n+"/"+i+o),t.close(),p=t.F;while(r--)delete p[l][a[r]];return p()};t.exports=Object.create||function(t,e){var r;return null!==t?(d[l]=n(t),r=new d,d[l]=null,r[f]=t):r=p(),void 0===e?r:i(r,e)},o[f]=!0},"4d01":function(t,e,r){"use strict";var n=r("8cdd"),i=r.n(n);i.a},"4fff":function(t,e,r){var n=r("1875");t.exports=function(t){return Object(n(t))}},"5d9b":function(t,e,r){"use strict";var n=r("bb4b"),i=r.n(n);i.a},6220:function(t,e,r){var n=r("fc48");t.exports=Array.isArray||function(t){return"Array"==n(t)}},"62d0":function(t,e,r){var n=r("1e63");t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol()},6386:function(t,e,r){var n=r("a421"),i=r("6725"),a=r("4508"),o=function(t){return function(e,r,o){var s,c=n(e),u=i(c.length),f=a(o,u);if(t&&r!=r){while(u>f)if(s=c[f++],s!=s)return!0}else for(;u>f;f++)if((t||f in c)&&c[f]===r)return t||f||0;return!t&&-1}};t.exports={includes:o(!0),indexOf:o(!1)}},6725:function(t,e,r){var n=r("1561"),i=Math.min;t.exports=function(t){return t>0?i(n(t),9007199254740991):0}},"6e9a":function(t,e){t.exports={}},7042:function(t,e){t.exports=!0},7685:function(t,e,r){var n=r("3ac6"),i=r("8fad"),a="__core-js_shared__",o=n[a]||i(a,{});t.exports=o},"7a34":function(t,e,r){t.exports=r("9afa")},"801c":function(t,e,r){r("8b7b");var n=r("764b");t.exports=n.Object.getOwnPropertySymbols},8106:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAH/0lEQVRoQ+1afYxcVRU/573Xne06g8RNq21Rs2MCIglE732zTqthQCWuIFVkJW01UcJHDCZ+JK3+oVjBGKkRiBEFgvyhsWq30GKhTTTWMa07Ozv3Kn6BRdkC2hpsUOP2czvvHXMmbyZ33ryZ9942y84mvcn89c459/zuPed3zz1zEXqM0dFRUa/XVS+Zxf7mOI6sVqu6mx/Yy0EhxMMAcOtig+g1PyI+rJS6PTXAUqmUnZ2d/ScAZPsZIAAcz+Vyq8rl8vEoP7vuoJTyNiJ6qM/BNdxDxNuVUhxtHaMrQCEE554wNO7SWn+lHwALIb4KAHcavmittUwMMIJcfAAY0Vq/1CcA3wQAhwHAavrTjWwid1BK+RAR3dZURsS9Sqlr+wFc0wcp5VNE9AHDx0iy6QAYRS6IuF4p9bM+A3g9ET1h+BRJNh0AI8jlSD6ff/PExITXTwDHx8ftmZmZFwFgjbGLHWTTAbCfySW8wEnIpg1gv5NLBMBYsmkDuBTIJQwyjmxaAJcKuUQA7Ek2LYBLhVzCAOPIpgUwglzu1lqb1UI/kWibL0KIuwDgy1GVTQPgUiOXNGTTALgUySUp2WCpVBqcnZ09Zl6L+rFyicsPKWUH2QwMDKxEKeUYEe01DPRl5RIHsAvZXMsAtxHRZsPAt7XWn4kz2I/fhRD3A0DLd0S8jwFuJ6INhsObtNbb+xFAnE9SyhuJaMKoTR9DIcSTAGBeha7TWj8VZyzqe6lUurBcLv93PrpNnXOxUSgUrvY875fG/Pt5Bx8lok8aqG9RSn0/rZNCiFEA4CvVe7XWf0yrz/JCCK4tK4h4q1LK5IVE5qSUG4jIjL4d6Lrunb7vcwugObZrrTclshgIsWOIOE1ErweAFzOZTGFycvJfaWwEpeJvAOByRJwFgLVKqT+lsRFx3N3DAF3f96cNQ3OO47jVavUPSYybjhlRUFmxYsVV+/btO5PExtatW609e/bw5fU6Q/6FTCYzmnShpJR5ImKfX9O0Ydv2e5CIGOTzRDRiOPg0ERW01md7OTg2NpY5duzYbiJ6f1gOEXdms9kN5XK53ssGzy+lfAAAPhUhV3Uc55pqtfq/XjaCBfo1ALzLwPByNpu9qFHJuK77Md/3fxgysj+Tydw8OTnJt+aOUSwW18zNzf0AAK7uMfmTQ0NDNx84cIALiY4xOjp6ged53yGij3ezwaHvOM5NU1NTL0TJCCFWIeKDRHS9+d2yrDtqtdp3GwCDVWT2ucoUCnLhHgB4gohmli9fnjl16tTFAHAj9yKJKBealLhNGbLxbwB40LKsXZ7n/XVwcNCv1+sj9Xp9fbBrq+JsAMBJBmFZ1k7btg9lMhn/xIkTV3Ce+r6/BQAuDM2pstlskaOn5UyhUBj2PK8KAG9JkjcRIfm0ZVmf8DzvJwDw1vnYAIAjjuOs9zzvW0R05TxtHB0YGChUKpUjrN+22q7rvsH3fW7XpxqIWB4cHLzh4MGD/1m7du3KM2fO8HHBx0aa8QwiflApNSOEGAKAn4ZIJ5Et27bz09PT3DNtjKimE4dZooGIrwDAF2q12qOI2NILkv4OALgbAF7byxginiKir+fz+W0TExNzpqzrupt8378XAFYmcggAtNbtKRJWFEKEAXKlcykAcK4w7b+EiM9alrVjeHh4b6+joFgsLq/X61zlcwl1CQDweWkR0d8R8W9E9LjjOLt6seT4+PjA4cOHxwDgpsCPN/JRQEQvsx9hBk8NMKyQdCVfLbnwhpwHGLcir9bOJJ0nzt9YkjkfokmXeoHkzu9g3DFxriHquu5lRHQLEV3Dx0QwHx81P0fER2q12p/PZXMXbQeD8+teIuJbQuuf2BAYHxG/NzIy8vnwIZ8U9KIAZHAzMzP7Ym4aJob9+Xx+bD4gFwWglJKvQFyqJR6I+IBS6tOJFQLB+QDkdkHrbUwul8t1e4MS5QznnO/7fLNuhSUi/gMAthBRuVEAI5YAgNuVFxk2fMuyLk+Tk+vWrcudPn26dRnm651S6gLTr6i/sA8REd/5GsO27Uump6efS7qyUsr7iOizTXkGt2zZsisqlQrfC1ujWCy+7uzZs783QSLi/UqpzyWdq1AoXOx53iFjrueUUlzztkbUQb8/dPFN1ScVQjArvs2YdKNS6sdRTkd0wZ7RWl+WFKAQYiMA/MiQ/5XWuq3DEAUw/MhmQmv90RSTtoU4AKzWWkfeMbndAABHDdvHtdbhLkHXqYUQOwBg3BDoeKwUFaJvJ6LfGkrceLpUa/18EpBxSR+2kVa+qS+E4M7DswCwzIiWdyilftczRPmjlPIvwf2tKbtLa31DnwF8HAA+bIA7pJTqaJV0e+nU1uNnI4i4RSn1zTiQaXckrXywAZuJaFvbTiGOK6V2hv3r9RivAgDvNBS46vhiHMi0DqeVl1IyuG+EqqMprXUxavG7AiwUCiO+79eIaDikuAsANnfLybQOJ5UPco4jqBWWQWS9YlmWazaaYnOwKeC67pW+7//CTOTgGxPPbv7Ztq2GhoaONouBpA4bZNHWA2oW9/yXwMmTJ1d7nsfPJD8U/FqE0vTDsqz31Wo17mpHjp5PmlmDQRLRYxE7GZeOC/qdO3qI+JFe4Bo7nMQLDlfP8/hvKTMnk6gulMyUbdsbu4Vl4hANe8f/oALA10JHyEKB6LCLiFyWfSmKLecdolGKUkouBjgv3o2Ia4ho9QI8Xj+OiEeJiFvwBxBxd/gQT7Ky/wdlPhrl6WsEgwAAAABJRU5ErkJggg=="},"8b7b":function(t,e,r){"use strict";var n=r("a5eb"),i=r("3ac6"),a=r("9883"),o=r("7042"),s=r("c1b2"),c=r("1e63"),u=r("62d0"),f=r("06fa"),l=r("78e7"),d=r("6220"),p=r("dfdb"),v=r("6f8d"),h=r("4fff"),b=r("a421"),g=r("7168"),A=r("2c6c"),y=r("4896"),m=r("a016"),w=r("0cf0"),O=r("8e11"),x=r("a205"),S=r("44ba"),P=r("4180"),j=r("7043"),C=r("0273"),I=r("d666"),_=r("d659"),k=r("b2ed"),B=r("6e9a"),E=r("3e80"),T=r("0363"),R=r("fbcc"),D=r("9bfb"),U=r("2874"),N=r("2f5a"),J=r("dee0").forEach,Q=k("hidden"),F="Symbol",K="prototype",L=T("toPrimitive"),q=N.set,M=N.getterFor(F),W=Object[K],z=i.Symbol,H=a("JSON","stringify"),X=S.f,V=P.f,Z=O.f,Y=j.f,G=_("symbols"),$=_("op-symbols"),tt=_("string-to-symbol-registry"),et=_("symbol-to-string-registry"),rt=_("wks"),nt=i.QObject,it=!nt||!nt[K]||!nt[K].findChild,at=s&&f((function(){return 7!=y(V({},"a",{get:function(){return V(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=X(W,e);n&&delete W[e],V(t,e,r),n&&t!==W&&V(W,e,n)}:V,ot=function(t,e){var r=G[t]=y(z[K]);return q(r,{type:F,tag:t,description:e}),s||(r.description=e),r},st=c&&"symbol"==typeof z.iterator?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof z},ct=function(t,e,r){t===W&&ct($,e,r),v(t);var n=g(e,!0);return v(r),l(G,n)?(r.enumerable?(l(t,Q)&&t[Q][n]&&(t[Q][n]=!1),r=y(r,{enumerable:A(0,!1)})):(l(t,Q)||V(t,Q,A(1,{})),t[Q][n]=!0),at(t,n,r)):V(t,n,r)},ut=function(t,e){v(t);var r=b(e),n=m(r).concat(vt(r));return J(n,(function(e){s&&!lt.call(r,e)||ct(t,e,r[e])})),t},ft=function(t,e){return void 0===e?y(t):ut(y(t),e)},lt=function(t){var e=g(t,!0),r=Y.call(this,e);return!(this===W&&l(G,e)&&!l($,e))&&(!(r||!l(this,e)||!l(G,e)||l(this,Q)&&this[Q][e])||r)},dt=function(t,e){var r=b(t),n=g(e,!0);if(r!==W||!l(G,n)||l($,n)){var i=X(r,n);return!i||!l(G,n)||l(r,Q)&&r[Q][n]||(i.enumerable=!0),i}},pt=function(t){var e=Z(b(t)),r=[];return J(e,(function(t){l(G,t)||l(B,t)||r.push(t)})),r},vt=function(t){var e=t===W,r=Z(e?$:b(t)),n=[];return J(r,(function(t){!l(G,t)||e&&!l(W,t)||n.push(G[t])})),n};if(c||(z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=E(t),r=function(t){this===W&&r.call($,t),l(this,Q)&&l(this[Q],e)&&(this[Q][e]=!1),at(this,e,A(1,t))};return s&&it&&at(W,e,{configurable:!0,set:r}),ot(e,t)},I(z[K],"toString",(function(){return M(this).tag})),j.f=lt,P.f=ct,S.f=dt,w.f=O.f=pt,x.f=vt,s&&(V(z[K],"description",{configurable:!0,get:function(){return M(this).description}}),o||I(W,"propertyIsEnumerable",lt,{unsafe:!0}))),u||(R.f=function(t){return ot(T(t),t)}),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:z}),J(m(rt),(function(t){D(t)})),n({target:F,stat:!0,forced:!c},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=z(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:ft,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:vt}),n({target:"Object",stat:!0,forced:f((function(){x.f(1)}))},{getOwnPropertySymbols:function(t){return x.f(h(t))}}),H){var ht=!c||f((function(){var t=z();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));n({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,r){var n,i=[t],a=1;while(arguments.length>a)i.push(arguments[a++]);if(n=e,(p(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),i[1]=e,H.apply(null,i)}})}z[K][L]||C(z[K],L,z[K].valueOf),U(z,F),B[Q]=!0},"8cdd":function(t,e,r){},"8e11":function(t,e,r){var n=r("a421"),i=r("0cf0").f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return i(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?s(t):i(n(t))}},"8f95":function(t,e,r){var n=r("d63b"),i=r("fc48"),a=r("0363"),o=a("toStringTag"),s="Arguments"==i(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(r){}};t.exports=n?i:function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=c(e=Object(t),o))?r:s?i(e):"Object"==(n=i(e))&&"function"==typeof e.callee?"Arguments":n}},"8fad":function(t,e,r){var n=r("3ac6"),i=r("0273");t.exports=function(t,e){try{i(n,t,e)}catch(r){n[t]=e}return e}},"96e9":function(t,e,r){var n=r("3ac6"),i=r("ab85"),a=n.WeakMap;t.exports="function"===typeof a&&/native code/.test(i.call(a))},9883:function(t,e,r){var n=r("764b"),i=r("3ac6"),a=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?a(n[t])||a(i[t]):n[t]&&n[t][e]||i[t]&&i[t][e]}},"9afa":function(t,e,r){var n=r("a0cd");t.exports=n},"9bfb":function(t,e,r){var n=r("764b"),i=r("78e7"),a=r("fbcc"),o=r("4180").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});i(e,t)||o(e,t,{value:a.f(t)})}},"9df4":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"orderDetail"},[r("Header",{attrs:{theme:"white"}},[r("template",{slot:"mid"},[t._v("订单详情")])],2),r("div",{staticClass:"payment-scrool"},[r("div",{staticClass:"payment-status"},[r("p",[t._v(t._s(t.statusText))]),r("p",{staticClass:"remain"},[t._v("剩余："+t._s(parseInt(t.lastPayTime/60))+"小时"+t._s(parseInt(t.lastPayTime%60))+"分钟")])]),r("div",{staticClass:"mailing-address"},[r("div",{staticClass:"mail-info"},[r("div",{staticClass:"info-desc"},[r("p",{staticClass:"info-name"},[t._v(t._s(t.order.receiverName)+" "+t._s(t.order.receiverPhone))]),r("p",{staticClass:"info-address"},[t._v(t._s(t.order.receiverProvince)+t._s(t.order.receiverCity)+t._s(t.order.receiverDetailAddress))])])]),r("div",{staticClass:"mail"})]),r("div",{staticClass:"pending-desc"},[t._m(0),t._l(t.order.orderItemList,(function(e){return r("div",{key:e.id,staticClass:"order-content"},[r("div",{staticClass:"show-img"},[r("img",{attrs:{src:e.productPic,alt:""}})]),r("div",{staticClass:"show-desc"},[r("p",{staticClass:"show-title"},[t._v(t._s(e.productName))]),r("p",{staticClass:"show-content"},[t._v(t._s(JSON.parse(e.productAttr).map((function(t){var e=t.value;return e})).join(";")))]),r("div",{staticClass:"price"},[r("span",{staticClass:"show-price"},[t._v("￥"+t._s(e.productPrice))]),r("span",{staticClass:"show-num"},[t._v("x "+t._s(e.productQuantity))])])])])}))],2),t._m(1),r("div",{staticClass:"price-all"},[void 0!==t.order.totalAmount?r("p",{staticClass:"price"},[r("span",[t._v("商品总额")]),r("span",[t._v("¥"+t._s(t.order.totalAmount.toFixed(2)))])]):t._e(),void 0!==t.order.freightAmount?r("p",{staticClass:"price"},[r("span",[t._v("运费")]),r("span",[t._v("+ ¥"+t._s(t.order.freightAmount.toFixed(2)))])]):t._e(),void 0!==t.order.payAmount?r("p",{staticClass:"price"},[r("span",[t._v("实付金额")]),r("span",{staticClass:"actual-payment"},[t._v("¥"+t._s(t.order.payAmount.toFixed(2)))])]):t._e()]),r("div",{staticClass:"price-all"},[r("p",{staticClass:"price"},[r("span",[t._v("订单编号")]),r("span",[t._v(t._s(t.order.orderSn))])]),r("p",{staticClass:"price"},[r("span",[t._v("下单时间")]),r("span",[t._v(t._s(new Date(t.order.createTime).toLocaleString()))])]),r("p",{staticClass:"price"},[r("span",[t._v("付款时间")]),r("span",[t._v(t._s(new Date(t.order.createTime).toLocaleString()))])])]),r("div",{staticClass:"delete"},[0===t.order.status?[r("button",{on:{click:t.cancelOrder}},[t._v("取消订单")]),r("button",{staticClass:"immediately",on:{click:t.ensurePay}},[t._v("立即付款")])]:t._e(),2===t.order.status?[r("button",{staticClass:"immediately",on:{click:t.confirmOrder}},[t._v("确认收货")])]:t._e(),3===t.order.status?[r("button",{on:{click:t.deleteOrder}},[t._v("删除订单")])]:t._e()],2)])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"order-time"},[n("p",{staticClass:"order-time-title"},[n("img",{attrs:{src:r("8106")}}),n("span",[t._v("智冷库品")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"delivery-method"},[r("span",[t._v("配送方式")]),r("span",[t._v("包邮")])])}],a=(r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("ac1f"),r("5319"),r("159b"),r("2fa7")),o=r("f81b"),s=r.n(o),c=r("0afa"),u=r.n(c),f=r("7a34"),l=r.n(f);function d(t,e){if(null==t)return{};var r,n,i={},a=l()(t);for(n=0;n<a.length;n++)r=a[n],s()(e).call(e,r)>=0||(i[r]=t[r]);return i}function p(t,e){if(null==t)return{};var r,n,i=d(t,e);if(u.a){var a=u()(t);for(n=0;n<a.length;n++)r=a[n],s()(e).call(e,r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}r("96cf");var v=r("a960");function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var g={name:"orderDetail",data:function(){return{order:{},lastPayTime:1/0,timer:void 0,times:5}},computed:{id:function(){return this.$route.query.id},statusText:function(){if(!this.order)return"";switch(this.order.status){case 0:return"等待支付";case 2:return"卖家已发货";case 3:return"交易成功";default:return""}}},mounted:function(){this.$route.query.pay&&this.ensurePay(),this.getOrder()},methods:{ensurePay:function(){var t,e,r,n,i,a,o,s=this;return regeneratorRuntime.async((function(c){while(1)switch(c.prev=c.next){case 0:return c.next=2,regeneratorRuntime.awrap(this.$api.ensurePay({orderId:this.id,payType:2}));case 2:if(t=c.sent,c.prev=3,window.inWX){c.next=10;break}if(this.times){c.next=7;break}return c.abrupt("return",this.$notify("当前不在微信环境"));case 7:return this.times--,setTimeout((function(){s.ensurePay()}),1e3),c.abrupt("return");case 10:e=JSON.parse(t),r=e.nonce_str,n=e.appid,i=e.sign,a=e.sign_type,o=p(e,["nonce_str","appid","sign","sign_type"]),window.WeixinJSBridge.invoke("getBrandWCPayRequest",b({nonceStr:r,appId:n,paySign:i,signType:a},o),(function(t){switch(t.err_msg){case"get_brand_wcpay_request:ok":s.$notify({type:"success",message:"支付成功"});break;case"get_brand_wcpay_request:cancel":s.$notify("支付已取消");break;case"get_brand_wcpay_request:fail":s.$notify("支付失败");break}})),c.next=17;break;case 14:c.prev=14,c.t0=c["catch"](3),this.$notify("发起支付失败");case 17:case"end":return c.stop()}}),null,this,[[3,14]])},getOrder:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.$api.getOrder({},this.id));case 2:this.order=e.sent,this.lastPayTime=this.order.lastPayTime,this.timer&&clearInterval(this.timer),this.timer=setInterval((function(){t.lastPayTime-=1}),6e4);case 6:case"end":return e.stop()}}),null,this)},deleteOrder:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$dialog.alert({title:"删除订单",message:"是否删除此订单？",showCancelButton:!0,closeOnPopstate:!0}));case 2:return t.next=4,regeneratorRuntime.awrap(this.$api.deleteOrder({orderId:this.id}));case 4:this.$router.replace("/Order");case 5:case"end":return t.stop()}}),null,this)},confirmOrder:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$dialog.alert({title:"确认收货",message:"是否确认收货？",showCancelButton:!0,closeOnPopstate:!0}));case 2:return t.next=4,regeneratorRuntime.awrap(this.$api.confirmReceiptOrder({orderId:this.id}));case 4:case"end":return t.stop()}}),null,this)},cancelOrder:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$dialog.alert({title:"取消订单",message:"是否取消该订单？",showCancelButton:!0,closeOnPopstate:!0}));case 2:return t.next=4,regeneratorRuntime.awrap(this.$api.cancelOrder({orderId:this.id}));case 4:this.$router.replace("/Order");case 5:case"end":return t.stop()}}),null,this)}},components:{Header:v["a"]}},A=g,y=(r("4d01"),r("2877")),m=Object(y["a"])(A,n,i,!1,null,"4e6096c4",null);e["default"]=m.exports},"9e57":function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},a016:function(t,e,r){var n=r("b323"),i=r("9e57");t.exports=Object.keys||function(t){return n(t,i)}},a0cd:function(t,e,r){r("0aa1");var n=r("764b");t.exports=n.Object.keys},a169:function(t,e,r){var n=r("764b");t.exports=function(t){return n[t+"Prototype"]}},a205:function(t,e){e.f=Object.getOwnPropertySymbols},a960:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app-header"}},[n("div",{class:{headerfix:t.showAbs}},[n("div",{staticClass:"header-fix",class:t.theme},[n("div",{on:{click:t.goBack}},[n("div",{staticClass:"iconfont back-icon"},[t.hideBack?t._e():n("img",{attrs:{src:r("336c"),alt:""}})])]),n("div",[t._t("mid")],2),n("div",[t._t("right")],2)])])])},i=[],a={name:"Header",props:["theme","hideBack"],data:function(){return{showAbs:!1,starty:null}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{goBack:function(){this.hideBack||this.$router.go(-1)},handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,e=window.screen.height,r=document.body.scrollHeight;this.showAbs=r>e&&t>0}}},o=a,s=(r("5d9b"),r("2877")),c=Object(s["a"])(o,n,i,!1,null,"b6dc1770",null);e["a"]=c.exports},ab85:function(t,e,r){var n=r("d659");t.exports=n("native-function-to-string",Function.toString)},b2ed:function(t,e,r){var n=r("d659"),i=r("3e80"),a=n("keys");t.exports=function(t){return a[t]||(a[t]=i(t))}},b323:function(t,e,r){var n=r("78e7"),i=r("a421"),a=r("6386").indexOf,o=r("6e9a");t.exports=function(t,e){var r,s=i(t),c=0,u=[];for(r in s)!n(o,r)&&n(s,r)&&u.push(r);while(e.length>c)n(s,r=e[c++])&&(~a(u,r)||u.push(r));return u}},bb4b:function(t,e,r){},bbe3:function(t,e,r){"use strict";var n=r("a5eb"),i=r("6386").indexOf,a=r("3397"),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0,c=a("indexOf");n({target:"Array",proto:!0,forced:s||c},{indexOf:function(t){return s?o.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})},c230:function(t,e,r){var n=r("c1b2"),i=r("4180"),a=r("6f8d"),o=r("a016");t.exports=n?Object.defineProperties:function(t,e){a(t);var r,n=o(e),s=n.length,c=0;while(s>c)i.f(t,r=n[c++],e[r]);return t}},d0ff:function(t,e,r){var n=r("f4c9");t.exports=n},d63b:function(t,e,r){var n=r("0363"),i=n("toStringTag"),a={};a[i]="z",t.exports="[object z]"===String(a)},d659:function(t,e,r){var n=r("7042"),i=r("7685");(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.4.4",mode:n?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},d666:function(t,e,r){var n=r("0273");t.exports=function(t,e,r,i){i&&i.enumerable?t[e]=r:n(t,e,r)}},dee0:function(t,e,r){var n=r("194a"),i=r("638c"),a=r("4fff"),o=r("6725"),s=r("4344"),c=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,f=4==t,l=6==t,d=5==t||l;return function(p,v,h,b){for(var g,A,y=a(p),m=i(y),w=n(v,h,3),O=o(m.length),x=0,S=b||s,P=e?S(p,O):r?S(p,0):void 0;O>x;x++)if((d||x in m)&&(g=m[x],A=w(g,x,y),t))if(e)P[x]=A;else if(A)switch(t){case 3:return!0;case 5:return g;case 6:return x;case 2:c.call(P,g)}else if(f)return!1;return l?-1:u||f?f:P}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},edbd:function(t,e,r){var n=r("9883");t.exports=n("document","documentElement")},f4c9:function(t,e,r){var n=r("3b7b"),i=Array.prototype;t.exports=function(t){var e=t.indexOf;return t===i||t instanceof Array&&e===i.indexOf?n:e}},f81b:function(t,e,r){t.exports=r("d0ff")},fbcc:function(t,e,r){var n=r("0363");e.f=n}}]);
//# sourceMappingURL=OrderDetail.ae1156b4.js.map