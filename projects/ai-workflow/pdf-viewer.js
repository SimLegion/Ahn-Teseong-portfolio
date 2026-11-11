/* Portable, locally bundled previews; no external PDF viewer dependency. */
function renderPdfPreview(body,id,file){
 body.classList.add('pdf-preview-body');
 const controls=document.createElement('div');controls.className='pdf-controls';
 const down=document.createElement('button'),up=document.createElement('button'),fit=document.createElement('button'),value=document.createElement('span'),count=document.createElement('span');
 down.type=up.type=fit.type='button';down.textContent='− 축소';up.textContent='+ 확대';fit.textContent='너비 맞춤';value.setAttribute('aria-live','polite');
 const files=PDF_PREVIEWS[id]||[];count.textContent=files.length+'쪽';count.className='pdf-page-count';
 controls.append(down,value,up,fit,count);
 const viewport=document.createElement('div');viewport.className='pdf-pages';viewport.setAttribute('aria-label',file.label+' 페이지 미리보기');
 const stack=document.createElement('div');stack.className='pdf-page-stack';
 files.forEach((path,i)=>{const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');img.src=path;img.loading=i?'lazy':'eager';img.alt=file.label+' '+(i+1)+'쪽';img.draggable=false;caption.textContent=(i+1)+' / '+files.length;figure.append(img,caption);stack.append(figure)});
 viewport.append(stack);body.append(controls,viewport);
 let scale=100;function update(){stack.style.width=scale+'%';value.textContent=scale===100?'너비 맞춤':scale+'%';down.disabled=scale===100;up.disabled=scale===250;}
 down.addEventListener('click',()=>{scale=Math.max(100,scale-25);update()});up.addEventListener('click',()=>{scale=Math.min(250,scale+25);update()});fit.addEventListener('click',()=>{scale=100;update();viewport.scrollLeft=0});update();
}
