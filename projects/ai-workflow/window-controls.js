/* Shared document window: pointer/keyboard move, resize, maximize and restore. */
'use strict';
const windowDialog=document.querySelector('#file-dialog');
const windowHeader=document.querySelector('#dialog-drag-handle');
const windowResize=document.querySelector('#dialog-resize');
const windowMaximize=document.querySelector('#dialog-maximize');
let restoredBounds=null,windowGesture=null;
function viewportBounds(){return {w:window.innerWidth,h:window.innerHeight};}
function applyWindowBounds(rect){
 const vp=viewportBounds(),gap=8;
 const width=Math.min(Math.max(rect.width,Math.min(520,vp.w-16)),vp.w-16);
 const height=Math.min(Math.max(rect.height,Math.min(380,vp.h-16)),vp.h-16);
 const left=Math.min(Math.max(gap,rect.left),vp.w-width-gap);
 const top=Math.min(Math.max(gap,rect.top),vp.h-height-gap);
 Object.assign(windowDialog.style,{margin:'0',left:left+'px',top:top+'px',width:width+'px',height:height+'px'});
}
function readWindowBounds(){const r=windowDialog.getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};}
function resetDialogWindow(){windowDialog.removeAttribute('style');windowDialog.classList.remove('window-maximized','window-manipulating');restoredBounds=null;windowMaximize.setAttribute('aria-pressed','false');windowMaximize.setAttribute('aria-label','자료 창 최대화');windowMaximize.textContent='□';}
function toggleMaximize(){
 if(windowDialog.classList.contains('window-maximized')){windowDialog.classList.remove('window-maximized');if(restoredBounds)applyWindowBounds(restoredBounds);windowMaximize.setAttribute('aria-pressed','false');windowMaximize.setAttribute('aria-label','자료 창 최대화');windowMaximize.textContent='□';}
 else{restoredBounds=readWindowBounds();windowDialog.classList.add('window-maximized');const vp=viewportBounds();applyWindowBounds({left:8,top:8,width:vp.w-16,height:vp.h-16});windowMaximize.setAttribute('aria-pressed','true');windowMaximize.setAttribute('aria-label','자료 창 이전 크기로 복원');windowMaximize.textContent='❐';}
}
function startWindowGesture(e,mode){
 if(e.button!==0||e.target.closest('button')||windowDialog.classList.contains('window-maximized'))return;
 e.preventDefault();windowGesture={mode,x:e.clientX,y:e.clientY,rect:readWindowBounds(),element:e.currentTarget};
 e.currentTarget.setPointerCapture(e.pointerId);windowDialog.classList.add('window-manipulating');
}
function moveWindowGesture(e){if(!windowGesture)return;const g=windowGesture,dx=e.clientX-g.x,dy=e.clientY-g.y;applyWindowBounds(g.mode==='move'?{...g.rect,left:g.rect.left+dx,top:g.rect.top+dy}:{...g.rect,width:g.rect.width+dx,height:g.rect.height+dy});}
function endWindowGesture(){windowGesture=null;windowDialog.classList.remove('window-manipulating');}
windowHeader.addEventListener('pointerdown',e=>startWindowGesture(e,'move'));
windowResize.addEventListener('pointerdown',e=>startWindowGesture(e,'resize'));
for(const el of [windowHeader,windowResize]){el.addEventListener('pointermove',moveWindowGesture);el.addEventListener('pointerup',endWindowGesture);el.addEventListener('pointercancel',endWindowGesture);el.addEventListener('lostpointercapture',endWindowGesture);el.addEventListener('keydown',e=>{
 if(e.target!==el||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)||windowDialog.classList.contains('window-maximized'))return;
 e.preventDefault();const r=readWindowBounds(),step=e.shiftKey?40:12;const dx=e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0,dy=e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0;
 applyWindowBounds(el===windowHeader?{...r,left:r.left+dx,top:r.top+dy}:{...r,width:r.width+dx,height:r.height+dy});
});}
windowMaximize.addEventListener('click',toggleMaximize);
windowHeader.addEventListener('dblclick',e=>{if(!e.target.closest('button'))toggleMaximize();});
window.addEventListener('resize',()=>{if(!windowDialog.open)return;if(windowDialog.classList.contains('window-maximized')){const v=viewportBounds();applyWindowBounds({left:8,top:8,width:v.w-16,height:v.h-16});}else applyWindowBounds(readWindowBounds());});
