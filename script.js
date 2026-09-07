const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
if(menuBtn&&mobileMenu){
  menuBtn.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
}

const toast=document.getElementById('toast')||document.getElementById('uploadStatus');
function notify(msg){
  const el=toast;
  if(!el) return;
  el.textContent=msg;
  clearTimeout(window.__tmr);
  window.__tmr=setTimeout(()=>el.textContent='',2300);
}
async function copyNumber(value){
  try{await navigator.clipboard.writeText(value)}
  catch{
    const ta=document.createElement('textarea');ta.value=value;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
  }
  notify('Nomor pembayaran berhasil disalin.');
}
document.querySelectorAll('.pay-method').forEach(btn=>{
  btn.addEventListener('click',()=>copyNumber(btn.dataset.copy));
});

const qrisBtn=document.getElementById('qrisBtn'), qrisCard=document.getElementById('qrisCard');
if(qrisBtn&&qrisCard){
  qrisBtn.addEventListener('click',()=>{
    qrisCard.classList.toggle('hidden');
    qrisBtn.innerHTML=qrisCard.classList.contains('hidden')
      ? '<span class="qris-mini">QR</span> TAMPILKAN QRIS'
      : '<span class="qris-mini">QR</span> SEMBUNYIKAN QRIS';
  });
}

const proofFile=document.getElementById('proofFile'), preview=document.getElementById('preview');
if(proofFile&&preview){
  proofFile.addEventListener('change',()=>{
    const file=proofFile.files[0]; if(!file) return;
    preview.classList.remove('hidden'); preview.innerHTML='';
    if(file.type.startsWith('image/')){
      const img=document.createElement('img'); img.src=URL.createObjectURL(file); img.alt='Preview bukti transfer'; preview.appendChild(img);
    }else{ preview.textContent='File dipilih: '+file.name; }
    notify('Bukti transfer siap dikonfirmasi.');
  });
}
const waBtn=document.getElementById('waBtn');
if(waBtn){
  waBtn.addEventListener('click',()=>{
    if(!proofFile||!proofFile.files[0]){notify('Pilih bukti transfer terlebih dahulu.');return;}
    const text=encodeURIComponent('Halo TAMA STORE, saya sudah melakukan pembayaran.\nProduk: Akun Polos On Mic\nTotal: Rp20.000\nSaya lampirkan bukti transfer di chat ini.');
    window.open('https://wa.me/62895391845923?text='+text,'_blank','noopener');
  });
}
