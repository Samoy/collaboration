"use strict";(self.webpackChunkcollaboration=self.webpackChunkcollaboration||[]).push([[758],{1977:function(de,z,a){a.d(z,{n:function(){return O}});var A=a(97685),C=a(71002),y=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,S=function(i){return i==="*"||i==="x"||i==="X"},n=function(i){var s=parseInt(i,10);return isNaN(s)?i:s},k=function(i,s){return(0,C.Z)(i)!==(0,C.Z)(s)?[String(i),String(s)]:[i,s]},M=function(i,s){if(S(i)||S(s))return 0;var c=k(n(i),n(s)),E=(0,A.Z)(c,2),R=E[0],_=E[1];return R>_?1:R<_?-1:0},b=function(i,s){for(var c=0;c<Math.max(i.length,s.length);c++){var E=M(i[c]||"0",s[c]||"0");if(E!==0)return E}return 0},v=function(i){var s,c=i.match(y);return c==null||(s=c.shift)===null||s===void 0||s.call(c),c},O=function(i,s){var c=v(i),E=v(s),R=c.pop(),_=E.pop(),te=b(c,E);return te!==0?te:R||_?R?-1:1:0}},73177:function(de,z,a){a.d(z,{X:function(){return k},b:function(){return n}});var A=a(67159),C=a(51812),y=a(1977),S=a(34155),n=function(){var b,v;return typeof S=="undefined"?A.Z:((b=S)===null||S===void 0||(v={NODE_ENV:"production",PUBLIC_PATH:"/collaboration/"})===null||v===void 0?void 0:v.ANTD_VERSION)||A.Z},k=function(b,v){var O=(0,y.n)(n(),"4.23.0")>-1?{open:b,onOpenChange:v}:{visible:b,onVisibleChange:v};return(0,C.Y)(O)}},78164:function(de,z,a){a.d(z,{S:function(){return O}});var A=a(15671),C=a(43144),y=a(97326),S=a(32531),n=a(73568),k=a(4942),M=a(29905),b=a(67294),v=a(85893),O=function(I){(0,S.Z)(s,I);var i=(0,n.Z)(s);function s(){var c;(0,A.Z)(this,s);for(var E=arguments.length,R=new Array(E),_=0;_<E;_++)R[_]=arguments[_];return c=i.call.apply(i,[this].concat(R)),(0,k.Z)((0,y.Z)(c),"state",{hasError:!1,errorInfo:""}),c}return(0,C.Z)(s,[{key:"componentDidCatch",value:function(E,R){console.log(E,R)}},{key:"render",value:function(){return this.state.hasError?(0,v.jsx)(M.ZP,{status:"error",title:"Something went wrong.",extra:this.state.errorInfo}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(E){return{hasError:!0,errorInfo:E.message}}}]),s}(b.Component)},48171:function(de,z,a){a.d(z,{J:function(){return y}});var A=a(74902),C=a(67294),y=function(n){var k=(0,C.useRef)(null);return k.current=n,(0,C.useCallback)(function(){for(var M,b=arguments.length,v=new Array(b),O=0;O<b;O++)v[O]=arguments[O];return(M=k.current)===null||M===void 0?void 0:M.call.apply(M,[k].concat((0,A.Z)(v)))},[])}},85265:function(de,z,a){a.d(z,{Z:function(){return Ve}});var A=a(94184),C=a.n(A),y=a(1413),S=a(97685),n=a(67294),k=a(2788),M=a(8410),b=a(4942),v=a(87462),O=a(82225),I=a(15105),i=a(64217),s=n.createContext(null),c=s,E=function(t){var l=t.prefixCls,o=t.className,r=t.style,h=t.children,d=t.containerRef,u=t.onMouseEnter,f=t.onMouseOver,x=t.onMouseLeave,g=t.onClick,N=t.onKeyDown,w=t.onKeyUp,Z={onMouseEnter:u,onMouseOver:f,onMouseLeave:x,onClick:g,onKeyDown:N,onKeyUp:w};return n.createElement(n.Fragment,null,n.createElement("div",(0,v.Z)({className:C()("".concat(l,"-content"),o),style:(0,y.Z)({},r),"aria-modal":"true",role:"dialog",ref:d},Z),h))},R=E,_=a(80334);function te(e){return typeof e=="string"&&String(Number(e))===e?((0,_.ZP)(!1,"Invalid value type of `width` or `height` which should be number type instead."),Number(e)):e}function Je(e){warning(!("wrapperClassName"in e),"'wrapperClassName' is removed. Please use 'rootClassName' instead."),warning(canUseDom()||!e.open,"Drawer with 'open' in SSR is not work since no place to createPortal. Please move to 'useEffect' instead.")}var De={width:0,height:0,overflow:"hidden",outline:"none",position:"absolute"};function $e(e,t){var l,o,r,h,d=e.prefixCls,u=e.open,f=e.placement,x=e.inline,g=e.push,N=e.forceRender,w=e.autoFocus,Z=e.keyboard,K=e.rootClassName,L=e.rootStyle,T=e.zIndex,U=e.className,$=e.style,W=e.motion,H=e.width,D=e.height,B=e.children,ne=e.contentWrapperStyle,ae=e.mask,oe=e.maskClosable,re=e.maskMotion,le=e.maskClassName,se=e.maskStyle,X=e.afterOpenChange,V=e.onClose,ie=e.onMouseEnter,ve=e.onMouseOver,fe=e.onMouseLeave,he=e.onClick,pe=e.onKeyDown,j=e.onKeyUp,J=n.useRef(),F=n.useRef(),ce=n.useRef();n.useImperativeHandle(t,function(){return J.current});var Ce=function(P){var q=P.keyCode,ee=P.shiftKey;switch(q){case I.Z.TAB:{if(q===I.Z.TAB){if(!ee&&document.activeElement===ce.current){var Ee;(Ee=F.current)===null||Ee===void 0||Ee.focus({preventScroll:!0})}else if(ee&&document.activeElement===F.current){var xe;(xe=ce.current)===null||xe===void 0||xe.focus({preventScroll:!0})}}break}case I.Z.ESC:{V&&Z&&(P.stopPropagation(),V(P));break}}};n.useEffect(function(){if(u&&w){var m;(m=J.current)===null||m===void 0||m.focus({preventScroll:!0})}},[u]);var ge=n.useState(!1),ye=(0,S.Z)(ge,2),ue=ye[0],Q=ye[1],p=n.useContext(c),me;g===!1?me={distance:0}:g===!0?me={}:me=g||{};var Y=(l=(o=(r=me)===null||r===void 0?void 0:r.distance)!==null&&o!==void 0?o:p==null?void 0:p.pushDistance)!==null&&l!==void 0?l:180,Xe=n.useMemo(function(){return{pushDistance:Y,push:function(){Q(!0)},pull:function(){Q(!1)}}},[Y]);n.useEffect(function(){if(u){var m;p==null||(m=p.push)===null||m===void 0||m.call(p)}else{var P;p==null||(P=p.pull)===null||P===void 0||P.call(p)}},[u]),n.useEffect(function(){return function(){var m;p==null||(m=p.pull)===null||m===void 0||m.call(p)}},[]);var je=ae&&n.createElement(O.ZP,(0,v.Z)({key:"mask"},re,{visible:u}),function(m,P){var q=m.className,ee=m.style;return n.createElement("div",{className:C()("".concat(d,"-mask"),q,le),style:(0,y.Z)((0,y.Z)({},ee),se),onClick:oe&&u?V:void 0,ref:P})}),Fe=typeof W=="function"?W(f):W,G={};if(ue&&Y)switch(f){case"top":G.transform="translateY(".concat(Y,"px)");break;case"bottom":G.transform="translateY(".concat(-Y,"px)");break;case"left":G.transform="translateX(".concat(Y,"px)");break;default:G.transform="translateX(".concat(-Y,"px)");break}f==="left"||f==="right"?G.width=te(H):G.height=te(D);var Ye={onMouseEnter:ie,onMouseOver:ve,onMouseLeave:fe,onClick:he,onKeyDown:pe,onKeyUp:j},Ge=n.createElement(O.ZP,(0,v.Z)({key:"panel"},Fe,{visible:u,forceRender:N,onVisibleChanged:function(P){X==null||X(P)},removeOnLeave:!1,leavedClassName:"".concat(d,"-content-wrapper-hidden")}),function(m,P){var q=m.className,ee=m.style;return n.createElement("div",(0,v.Z)({className:C()("".concat(d,"-content-wrapper"),q),style:(0,y.Z)((0,y.Z)((0,y.Z)({},G),ee),ne)},(0,i.Z)(e,{data:!0})),n.createElement(R,(0,v.Z)({containerRef:P,prefixCls:d,className:U,style:$},Ye),B))}),Ne=(0,y.Z)({},L);return T&&(Ne.zIndex=T),n.createElement(c.Provider,{value:Xe},n.createElement("div",{className:C()(d,"".concat(d,"-").concat(f),K,(h={},(0,b.Z)(h,"".concat(d,"-open"),u),(0,b.Z)(h,"".concat(d,"-inline"),x),h)),style:Ne,tabIndex:-1,ref:J,onKeyDown:Ce},je,n.createElement("div",{tabIndex:0,ref:F,style:De,"aria-hidden":"true","data-sentinel":"start"}),Ge,n.createElement("div",{tabIndex:0,ref:ce,style:De,"aria-hidden":"true","data-sentinel":"end"})))}var Ie=n.forwardRef($e),Re=Ie,Ze=function(t){var l=t.open,o=l===void 0?!1:l,r=t.prefixCls,h=r===void 0?"rc-drawer":r,d=t.placement,u=d===void 0?"right":d,f=t.autoFocus,x=f===void 0?!0:f,g=t.keyboard,N=g===void 0?!0:g,w=t.width,Z=w===void 0?378:w,K=t.mask,L=K===void 0?!0:K,T=t.maskClosable,U=T===void 0?!0:T,$=t.getContainer,W=t.forceRender,H=t.afterOpenChange,D=t.destroyOnClose,B=t.onMouseEnter,ne=t.onMouseOver,ae=t.onMouseLeave,oe=t.onClick,re=t.onKeyDown,le=t.onKeyUp,se=n.useState(!1),X=(0,S.Z)(se,2),V=X[0],ie=X[1],ve=n.useState(!1),fe=(0,S.Z)(ve,2),he=fe[0],pe=fe[1];(0,M.Z)(function(){pe(!0)},[]);var j=he?o:!1,J=n.useRef(),F=n.useRef();(0,M.Z)(function(){j&&(F.current=document.activeElement)},[j]);var ce=function(ue){var Q;if(ie(ue),H==null||H(ue),!ue&&F.current&&!(!((Q=J.current)===null||Q===void 0)&&Q.contains(F.current))){var p;(p=F.current)===null||p===void 0||p.focus({preventScroll:!0})}};if(!W&&!V&&!j&&D)return null;var Ce={onMouseEnter:B,onMouseOver:ne,onMouseLeave:ae,onClick:oe,onKeyDown:re,onKeyUp:le},ge=(0,y.Z)((0,y.Z)({},t),{},{open:j,prefixCls:h,placement:u,autoFocus:x,keyboard:N,width:Z,mask:L,maskClosable:U,inline:$===!1,afterOpenChange:ce,ref:J},Ce);return n.createElement(k.Z,{open:j||W||V,autoDestroy:!1,getContainer:$,autoLock:L&&(j||V)},n.createElement(Re,ge))},Ke=Ze,ke=Ke,be=a(33603),we=a(53124),_e=a(65223),Le=a(69760),Pe=e=>{const{prefixCls:t,title:l,footer:o,extra:r,closeIcon:h,closable:d,onClose:u,headerStyle:f,drawerStyle:x,bodyStyle:g,footerStyle:N,children:w}=e,Z=n.useCallback($=>n.createElement("button",{type:"button",onClick:u,"aria-label":"Close",className:`${t}-close`},$),[u]),[K,L]=(0,Le.Z)(d,h,Z,void 0,!0),T=n.useMemo(()=>!l&&!K?null:n.createElement("div",{style:f,className:C()(`${t}-header`,{[`${t}-header-close-only`]:K&&!l&&!r})},n.createElement("div",{className:`${t}-header-title`},L,l&&n.createElement("div",{className:`${t}-title`},l)),r&&n.createElement("div",{className:`${t}-extra`},r)),[K,L,r,f,t,l]),U=n.useMemo(()=>{if(!o)return null;const $=`${t}-footer`;return n.createElement("div",{className:$,style:N},o)},[o,N,t]);return n.createElement("div",{className:`${t}-wrapper-body`,style:x},T,n.createElement("div",{className:`${t}-body`,style:g},w),U)},Te=a(4173),Ae=a(67968),Ue=a(45503),We=e=>{const{componentCls:t,motionDurationSlow:l}=e,o={"&-enter, &-appear, &-leave":{"&-start":{transition:"none"},"&-active":{transition:`all ${l}`}}};return{[t]:{[`${t}-mask-motion`]:{"&-enter, &-appear, &-leave":{"&-active":{transition:`all ${l}`}},"&-enter, &-appear":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}}},[`${t}-panel-motion`]:{"&-left":[o,{"&-enter, &-appear":{"&-start":{transform:"translateX(-100%) !important"},"&-active":{transform:"translateX(0)"}},"&-leave":{transform:"translateX(0)","&-active":{transform:"translateX(-100%)"}}}],"&-right":[o,{"&-enter, &-appear":{"&-start":{transform:"translateX(100%) !important"},"&-active":{transform:"translateX(0)"}},"&-leave":{transform:"translateX(0)","&-active":{transform:"translateX(100%)"}}}],"&-top":[o,{"&-enter, &-appear":{"&-start":{transform:"translateY(-100%) !important"},"&-active":{transform:"translateY(0)"}},"&-leave":{transform:"translateY(0)","&-active":{transform:"translateY(-100%)"}}}],"&-bottom":[o,{"&-enter, &-appear":{"&-start":{transform:"translateY(100%) !important"},"&-active":{transform:"translateY(0)"}},"&-leave":{transform:"translateY(0)","&-active":{transform:"translateY(100%)"}}}]}}}};const Be=e=>{const{componentCls:t,zIndexPopup:l,colorBgMask:o,colorBgElevated:r,motionDurationSlow:h,motionDurationMid:d,padding:u,paddingLG:f,fontSizeLG:x,lineHeightLG:g,lineWidth:N,lineType:w,colorSplit:Z,marginSM:K,colorIcon:L,colorIconHover:T,colorText:U,fontWeightStrong:$,footerPaddingBlock:W,footerPaddingInline:H}=e,D=`${t}-content-wrapper`;return{[t]:{position:"fixed",inset:0,zIndex:l,pointerEvents:"none","&-pure":{position:"relative",background:r,[`&${t}-left`]:{boxShadow:e.boxShadowDrawerLeft},[`&${t}-right`]:{boxShadow:e.boxShadowDrawerRight},[`&${t}-top`]:{boxShadow:e.boxShadowDrawerUp},[`&${t}-bottom`]:{boxShadow:e.boxShadowDrawerDown}},"&-inline":{position:"absolute"},[`${t}-mask`]:{position:"absolute",inset:0,zIndex:l,background:o,pointerEvents:"auto"},[D]:{position:"absolute",zIndex:l,maxWidth:"100vw",transition:`all ${h}`,"&-hidden":{display:"none"}},[`&-left > ${D}`]:{top:0,bottom:0,left:{_skip_check_:!0,value:0},boxShadow:e.boxShadowDrawerLeft},[`&-right > ${D}`]:{top:0,right:{_skip_check_:!0,value:0},bottom:0,boxShadow:e.boxShadowDrawerRight},[`&-top > ${D}`]:{top:0,insetInline:0,boxShadow:e.boxShadowDrawerUp},[`&-bottom > ${D}`]:{bottom:0,insetInline:0,boxShadow:e.boxShadowDrawerDown},[`${t}-content`]:{width:"100%",height:"100%",overflow:"auto",background:r,pointerEvents:"auto"},[`${t}-wrapper-body`]:{display:"flex",flexDirection:"column",width:"100%",height:"100%"},[`${t}-header`]:{display:"flex",flex:0,alignItems:"center",padding:`${u}px ${f}px`,fontSize:x,lineHeight:g,borderBottom:`${N}px ${w} ${Z}`,"&-title":{display:"flex",flex:1,alignItems:"center",minWidth:0,minHeight:0}},[`${t}-extra`]:{flex:"none"},[`${t}-close`]:{display:"inline-block",marginInlineEnd:K,color:L,fontWeight:$,fontSize:x,fontStyle:"normal",lineHeight:1,textAlign:"center",textTransform:"none",textDecoration:"none",background:"transparent",border:0,outline:0,cursor:"pointer",transition:`color ${d}`,textRendering:"auto","&:focus, &:hover":{color:T,textDecoration:"none"}},[`${t}-title`]:{flex:1,margin:0,color:U,fontWeight:e.fontWeightStrong,fontSize:x,lineHeight:g},[`${t}-body`]:{flex:1,minWidth:0,minHeight:0,padding:f,overflow:"auto"},[`${t}-footer`]:{flexShrink:0,padding:`${W}px ${H}px`,borderTop:`${N}px ${w} ${Z}`},"&-rtl":{direction:"rtl"}}}};var Se=(0,Ae.Z)("Drawer",e=>{const t=(0,Ue.TS)(e,{});return[Be(t),We(t)]},e=>({zIndexPopup:e.zIndexPopupBase,footerPaddingBlock:e.paddingXS,footerPaddingInline:e.padding})),Me=function(e,t){var l={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(l[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(l[o[r]]=e[o[r]]);return l};const et=null,ze={distance:180},Oe=e=>{var t;const{rootClassName:l,width:o,height:r,size:h="default",mask:d=!0,push:u=ze,open:f,afterOpenChange:x,onClose:g,prefixCls:N,getContainer:w,style:Z,className:K,visible:L,afterVisibleChange:T}=e,U=Me(e,["rootClassName","width","height","size","mask","push","open","afterOpenChange","onClose","prefixCls","getContainer","style","className","visible","afterVisibleChange"]),{getPopupContainer:$,getPrefixCls:W,direction:H,drawer:D}=n.useContext(we.E_),B=W("drawer",N),[ne,ae]=Se(B),oe=w===void 0&&$?()=>$(document.body):w,re=C()({"no-mask":!d,[`${B}-rtl`]:H==="rtl"},l,ae),le=n.useMemo(()=>o!=null?o:h==="large"?736:378,[o,h]),se=n.useMemo(()=>r!=null?r:h==="large"?736:378,[r,h]),X={motionName:(0,be.m)(B,"mask-motion"),motionAppear:!0,motionEnter:!0,motionLeave:!0,motionDeadline:500},V=ie=>({motionName:(0,be.m)(B,`panel-motion-${ie}`),motionAppear:!0,motionEnter:!0,motionLeave:!0,motionDeadline:500});return ne(n.createElement(Te.BR,null,n.createElement(_e.Ux,{status:!0,override:!0},n.createElement(ke,Object.assign({prefixCls:B,onClose:g,maskMotion:X,motion:V},U,{open:f!=null?f:L,mask:d,push:u,width:le,height:se,style:Object.assign(Object.assign({},D==null?void 0:D.style),Z),className:C()(D==null?void 0:D.className,K),rootClassName:re,getContainer:oe,afterOpenChange:x!=null?x:T}),n.createElement(Pe,Object.assign({prefixCls:B},U,{onClose:g}))))))},He=e=>{const{prefixCls:t,style:l,className:o,placement:r="right"}=e,h=Me(e,["prefixCls","style","className","placement"]),{getPrefixCls:d}=n.useContext(we.E_),u=d("drawer",t),[f,x]=Se(u),g=C()(u,`${u}-pure`,`${u}-${r}`,x,o);return f(n.createElement("div",{className:g,style:l},n.createElement(Pe,Object.assign({prefixCls:u},h))))};Oe._InternalPanelDoNotUseOrYouWillBeFired=He;var Ve=Oe}}]);
