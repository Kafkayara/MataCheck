
(()=>{const root=document.getElementById('mata'),main=root.querySelector('main');let page=0,q=0,ready=false,paused=false,interrupted=false,answers=[[],[]];const names=['Beranda','Pemeriksaan awal','Persiapan','Mata kanan','Mata kiri','Ringkasan','Latihan menjawab','Jeda pergantian mata'];
const steps=[1,2,6,3,4,5];
const formState={screeningStopped:false,age:null,ageInput:'',ageInvalid:false,condition:null,consent:false,mode:null,setup:[false,false],practiced:false,switched:false,interruptions:[0,0],qualityResets:{display:0,position:0,correction:0},directions:[[],[]],distance:null,distanceEditing:false,correction:'unrecorded',endedEarly:false,startedAt:null,completedAt:null};
// SESSION METADATA START
const APP_VERSION='0.16.0';
function formatSessionTime(iso){
  if(!iso||!Number.isFinite(Date.parse(iso)))return 'Tidak tercatat';
  return new Date(iso).toLocaleString('id-ID',{year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZoneName:'short'});
}
// SESSION METADATA END
// AGE START
const ageError='Masukkan usia dalam tahun penuh berupa bilangan bulat nol atau lebih, atau kosongkan untuk tidak mencatat.';
function ageLabel(){return Number.isSafeInteger(formState.age)&&formState.age>=0?formState.age+' tahun penuh':'Tidak dicatat';}
root.addEventListener('input',e=>{
  if(page!==1||formState.screeningStopped||e.target.id!=='age')return;
  const text=e.target.value.trim(),value=Number(text);
  formState.ageInput=e.target.value;
  formState.ageInvalid=text!==''&&(!/^\d+$/.test(text)||!Number.isSafeInteger(value));
  formState.age=text!==''&&!formState.ageInvalid?value:null;
  main.querySelector('#age-error').textContent=formState.ageInvalid?ageError:'';
  main.querySelector('#next').disabled=!canEnter(2);
});
// AGE END
// ANSWER INPUT START
let lastPointerAnswerAt=-Infinity;
function submitAnswer(button,event){
  const answer=button.dataset.answer;
  if(!['atas','kanan','bawah','kiri','tidak terlihat'].includes(answer)||button.disabled||!main.contains(button)||paused||!ready||![3,4].includes(page)||q>=3)return;
  const pointer=event.detail>0,now=performance.now();
  // Brief pointer lock prevents a double tap from answering the next symbol.
  if(pointer&&(event.detail>1||now-lastPointerAnswerAt<300))return;
  if(pointer)lastPointerAnswerAt=now;
  answers[page-3].push(answer);q++;
  if(q===3)go(page===3?7:5);
  else{render();main.querySelector('[data-answer="'+answer+'"]')?.focus();}
}
// ANSWER INPUT END
// PREPARATION STATUS START
function preparationMessage(){
  if(!['solo','helper'].includes(formState.mode))return 'Pilih cara mencoba: sendiri atau dengan pendamping.';
  if(!formState.setup.every(Boolean))return 'Centang kedua kesiapan perangkat dan alat jawab.';
  if(formState.distanceEditing)return 'Simpan catatan jarak atau pilih Lanjut tanpa catatan jarak.';
  if(formState.calibration&&!['valid','skipped'].includes(formState.calibration.status))return 'Selesaikan pencocokan ukuran layar atau pilih demo tanpa kalibrasi.';
  return 'Persiapan demo siap. Lanjutkan ke latihan menjawab.';
}
// PREPARATION STATUS END
// QUALITY RESET START
const resetLabels={display:'Tampilan atau kalibrasi berubah',position:'Posisi atau catatan jarak berubah',correction:'Kacamata / lensa kontak berubah'};
function recordQualityReset(reason){
  if(!Object.hasOwn(resetLabels,reason)||!answers.some(list=>list.length>0))return;
  formState.qualityResets??={display:0,position:0,correction:0};
  formState.qualityResets[reason]++;
}
function qualityResetView(){
  const entries=Object.entries(resetLabels).filter(([reason])=>formState.qualityResets[reason]>0);
  return '<div id="quality-resets"><h3>Pengulangan persiapan</h3>'+(entries.length?'<ul>'+entries.map(([reason,label])=>'<li>'+label+': '+formState.qualityResets[reason]+' kali</li>').join('')+'</ul>':'<p>Tidak ada pengulangan persiapan setelah respons tercatat.</p>')+'<p class="helper">Hanya menghitung perubahan yang membuang respons sebelumnya dalam sesi ini. Respons yang dibuang tidak disimpan dalam catatan akhir. Ini bukan penilaian keandalan klinis.</p></div>';
}
// QUALITY RESET END
// CORRECTION START
const correctionLabels={unrecorded:'Tidak dicatat',none:'Tanpa kacamata atau lensa kontak',glasses:'Memakai kacamata',contacts:'Memakai lensa kontak'};
function correctionLabel(){return correctionLabels[formState.correction]??correctionLabels.unrecorded;}
function changeCorrection(value){
  if(!Object.hasOwn(correctionLabels,value)||value===formState.correction)return false;
  recordQualityReset('correction');formState.correction=value;answers=[[],[]];formState.directions=[[],[]];
  formState.practiced=false;formState.switched=false;ready=false;paused=false;interrupted=false;q=0;
  return true;
}
// CORRECTION END
// DEMO STIMULUS START
function newDirections(){return Array.from({length:3},()=>Math.floor(Math.random()*4));}
function demoSymbol(direction){
  if(!Number.isInteger(direction)||direction<0||direction>3)return '';
  return `<b aria-hidden="true"><svg class="demo-e" viewBox="0 0 5 5" focusable="false" style="transform:rotate(${direction*90}deg)"><path d="M0 0H5V1H1V2H5V3H1V4H5V5H0Z"/></svg></b>`;
}
function trialLog(eye){
  const directions=['Kanan','Bawah','Kiri','Atas'];
  const responses={atas:'Atas',kanan:'Kanan',bawah:'Bawah',kiri:'Kiri','tidak terlihat':'Tidak terlihat'};
  return answers[eye].map((answer,index)=>{
    const direction=formState.directions[eye][index];
    const symbol=Number.isInteger(direction)&&direction>=0&&direction<4?directions[direction]:'Tidak tercatat';
    const response=Object.hasOwn(responses,answer)?responses[answer]:'Tidak tercatat';
    return '<li><span class="trial-symbol">Simbol: <strong>'+symbol+'</strong></span><span class="trial-response">Respons: <strong>'+response+'</strong></span></li>';
  }).join('');
}
// DEMO STIMULUS END
// DISTANCE MODEL START
function parseDistanceCm(value){
  const text=String(value).trim().replace(',','.');
  if(!/^\d+(?:\.\d+)?$/.test(text))return null;
  const mm=Number(text)*10;
  return Number.isFinite(mm)&&mm>0?mm:null;
}
function clearPositionProgress(){
  recordQualityReset('position');
  answers=[[],[]];formState.directions=[[],[]];formState.practiced=false;formState.switched=false;
  formState.distance=null;ready=false;paused=false;interrupted=false;q=0;
}
function distanceLabel(){return formState.distance?`Jarak mata ke layar ${formState.distance.mm/10} cm, dikonfirmasi pengguna. Browser tidak memverifikasi posisi atau jarak secara otomatis.`:'Jarak mata ke layar belum dicatat atau diverifikasi pada demo ini.';}
// DISTANCE MODEL END
function distanceView(){
  const intro='<h2>Catatan jarak - opsional</h2><p>'+distanceLabel()+'</p>';
  if(!formState.distanceEditing)return '<section class="cal-summary">'+intro+'<button id="distance-open" '+(!['solo','helper'].includes(formState.mode)?'disabled':'')+'>'+(formState.distance?'Ubah catatan jarak':'Tambahkan catatan jarak')+'</button></section>';
  return `<section class="cal-summary">${intro}<p>Ukur dengan meteran dari bidang layar pada posisi simbol ke posisi mata, bukan ke keyboard atau tepi meja. Tandai posisi duduk. Aplikasi belum menetapkan jarak tes; catatan ini belum digunakan untuk mengukur penglihatan.</p><label for="distance-cm">Jarak yang diukur (cm)</label><input id="distance-cm" type="text" inputmode="decimal" autocomplete="off" aria-describedby="distance-error"><label class="check"><input id="distance-measured" type="checkbox">Saya mengukur jarak dengan meteran fisik.</label><label class="check"><input id="distance-stable" type="checkbox">Layar dan posisi duduk stabil.</label><label class="check"><input id="distance-input" type="checkbox">${solo()?'Saya dapat menjawab dari posisi ini tanpa maju ke laptop, misalnya dengan keyboard nirkabel.':'Pendamping dapat memasukkan jawaban sementara peserta tetap di posisi ukur.'}</label><p id="distance-error" role="alert"></p><div class="actions"><button id="distance-save">Simpan catatan jarak</button><button id="distance-skip">Lanjut tanpa catatan jarak</button></div></section>`;
}
// CALIBRATION MODEL START
function newCalibration(){return {status:'pending',stage:'match1',first:null,scale:null,width:300,failures:0,snapshot:null,message:''};}
function failCalibration(c){c.failures++;c.first=null;c.scale=null;c.stage='match1';c.width=300;c.snapshot=null;c.status=c.failures>=3?'blocked':'pending';c.message=c.status==='blocked'?'Tiga percobaan belum sesuai. Kamu bisa melanjutkan demo tanpa kalibrasi atau menghapus sesi.':'Ukuran belum konsisten. Ulangi pencocokan dari awal.';}
function recordMatch(c,pixels){
  if(c.status!=='pending'||!['match1','match2'].includes(c.stage))return;
  if(!Number.isFinite(pixels)||pixels<=0){failCalibration(c);return;}
  if(c.stage==='match1'){c.first=pixels;c.stage='match2';c.width=pixels>300?240:360;c.message='Cocokkan lagi dengan 10 cm pada penggaris.';return;}
  const average=(c.first+pixels)/2;
  if(Math.abs(c.first-pixels)/average>0.02){failCalibration(c);return;}
  c.scale=average/100;c.stage='verify';c.message='Ukur kedua garis verifikasi dengan penggaris.';
}
function verifyCalibration(c,x,y){
  if(c.status!=='pending'||c.stage!=='verify')return false;
  const values=[x,y].map(v=>String(v).trim().replace(',','.'));
  if(values.some(v=>v===''||!Number.isFinite(Number(v))||Number(v)<49||Number(v)>51)){failCalibration(c);return false;}
  c.status='valid';c.stage='done';c.message='Ukuran layar sudah dicocokkan dengan penggaris.';return true;
}
// CALIBRATION MODEL END
function displaySnapshot(){return JSON.stringify([innerWidth,innerHeight,devicePixelRatio,window.visualViewport?.scale??1,screen.width,screen.height,screen.orientation?.type??'',!!document.fullscreenElement]);}
function calibrationLabel(){const status=formState.calibration?.status;return status==='valid'?'Dicocokkan dengan penggaris (bukan validasi klinis)':status==='stale'?'Perlu dicocokkan ulang':status==='pending'?'Belum selesai':status==='blocked'?'Belum berhasil setelah tiga percobaan':'Tidak digunakan — sesi demo';}
function calibrationLine(length,vertical=false){return `<svg class="cal-line ${vertical?'vertical':''}" width="${vertical?24:length+12}" height="${vertical?length+12:24}" aria-hidden="true"><path d="${vertical?`M12 6V${length+6}M4 6H20M4 ${length+6}H20`:`M6 12H${length+6}M6 4V20M${length+6} 4V20`}"/></svg>`;}
function calibrationView(){
  const c=formState.calibration;
  let controls='';
  if(c.status==='pending'&&c.stage!=='verify')controls=`<p>Pencocokan ${c.stage==='match1'?'1':'2'} dari 2. Samakan jarak antara pusat kedua tanda dengan <strong>10 cm</strong> pada penggaris fisik. Ukur dari angka 0, bukan tepi penggaris. Dekatkan tanpa menekan layar.</p><div class="cal-area" id="cal-area">${calibrationLine(c.width)}</div><label for="cal-width">Panjang garis</label><input id="cal-width" type="range" min="100" max="900" step="0.1" value="${c.width}"><div class="actions"><button data-cal-adjust="-1">Lebih pendek</button><button data-cal-adjust="1">Lebih panjang</button><button id="cal-reset">Reset garis</button></div><p id="cal-fit" class="helper"></p><button id="cal-match" class="primary">Sesuai penggaris</button>`;
  if(c.status==='pending'&&c.stage==='verify')controls=`<p>Ukur jarak antara pusat tanda pada kedua garis berikut. Masukkan ukuran yang benar-benar terbaca, dalam milimeter.</p><div class="cal-area" id="cal-area">${calibrationLine(c.scale*50)}${calibrationLine(c.scale*50,true)}</div><label for="cal-x">Garis horizontal (mm)</label><input id="cal-x" type="text" inputmode="decimal" autocomplete="off"><label for="cal-y">Garis vertikal (mm)</label><input id="cal-y" type="text" inputmode="decimal" autocomplete="off"><p id="cal-fit" class="helper"></p><button id="cal-verify" class="primary">Periksa ukuran</button>`;
  if(c.status==='valid')controls='<p>Kalibrasi ini hanya mencocokkan ukuran layar. Demo berikutnya belum menggunakan ukuran ini untuk mengukur penglihatan.</p><button class="primary" data-go="2">Kembali ke persiapan</button>';
  if(c.status==='stale')controls='<button id="cal-retry" class="primary">Cocokkan ulang</button>';
  return `<h1 tabindex="-1">Cocokkan ukuran layar.</h1><p>Siapkan penggaris fisik. Tetap gunakan layar dan zoom yang sama setelah pencocokan.</p><p id="cal-message" role="status">${c.message}</p>${controls}<p class="helper">Percobaan yang belum sesuai: ${c.failures} dari 3. Ini uji persiapan layar, bukan pemeriksaan mata.</p><div class="actions"><button id="cal-skip">Lanjut demo tanpa kalibrasi</button><button id="cal-screen-change">Saya memindahkan layar / mengubah tampilan</button></div>`;
}
function fitCalibration(){
  const area=main.querySelector('#cal-area');if(!area)return;
  const fits=area.scrollWidth<=area.clientWidth;
  const button=main.querySelector('#cal-match,#cal-verify');if(button)button.disabled=!fits;
  main.querySelector('#cal-fit').textContent=fits?'Pastikan kedua tanda terlihat utuh.':'Garis tidak muat. Pendekkan jika masih sesuai penggaris, atau gunakan layar lebih besar. Jangan mengubah zoom setelah pencocokan.';
}
function invalidateCalibration(){
  const c=formState.calibration;if(!c||c.status==='skipped'||c.status==='blocked')return;
  if(page===5)return;
  recordQualityReset('display');
  c.status='stale';c.scale=null;c.first=null;c.snapshot=null;c.message='Tampilan berubah. Cocokkan ulang ukuran layar sebelum melanjutkan, atau pilih demo tanpa kalibrasi.';
  formState.distance=null;formState.distanceEditing=false;answers=[[],[]];formState.practiced=false;formState.switched=false;ready=false;paused=false;interrupted=false;q=0;
  if(page>=3)page=8;
  render();main.querySelector('h1')?.focus({preventScroll:true});
}
function checkCalibration(){const c=formState.calibration;if(c?.snapshot&&c.snapshot!==displaySnapshot())invalidateCalibration();if(page===8)fitCalibration();}
const action=(n,t,primary=true)=>`<button class="${primary?'primary':''}" data-go="${n}">${t}</button>`;
function canEnter(n){if(!Number.isInteger(n)||n<0||n>8)return false;if(n<=1)return true;if(formState.screeningStopped||formState.condition!=='no'||!formState.consent||formState.ageInvalid)return false;if(formState.endedEarly)return n===5;if(n===2)return true;if(n===8)return !!formState.calibration;if(formState.distanceEditing)return false;if(!['solo','helper'].includes(formState.mode)||!formState.setup.every(Boolean))return false;if(formState.calibration&& !['valid','skipped'].includes(formState.calibration.status))return false;if(n===6)return true;if(!formState.practiced)return false;if(n===3)return true;if(answers[0].length!==3)return false;if(n===7)return true;if(!formState.switched)return false;if(n===4)return true;return answers[1].length===3;}
function go(n){checkCalibration();if(!canEnter(n))return;if((page===3||page===4)&&ready&&q<3&&n!==5)answers[page-3]=[];const startLeft=page===7&&n===4;if(n===5&&!formState.completedAt)formState.completedAt=new Date().toISOString();page=n;q=0;ready=startLeft;paused=false;interrupted=false;if(startLeft){answers[1]=[];formState.directions[1]=newDirections();}render();main.querySelector("h1")?.focus({preventScroll:true})}
const solo=()=>formState.mode==='solo';
const keyboardHelp='Panah: arah E. N: Tidak terlihat. P: Jeda atau lanjutkan. Lepaskan tombol sebelum menjawab lagi.';
function eyeGuide(activeEye){
  return '<div class="eye-guide" role="img" aria-label="Kiri layar: mata kiri '+(activeEye==='kiri'?'terbuka':'ditutup')+'. Kanan layar: mata kanan '+(activeEye==='kanan'?'terbuka':'ditutup')+'.">'+['kiri','kanan'].map(side=>{
    const open=side===activeEye;
    const drawing=open?'<path d="M10 30Q50 -5 90 30Q50 65 10 30Z"/><circle cx="50" cy="30" r="12"/>':'<path d="M10 30Q50 60 90 30M25 40L20 50M50 46V57M75 40L80 50"/>';
    return '<span data-eye="'+side+'" class="'+(open?'eye-open':'eye-closed')+'"><svg viewBox="0 0 100 60" aria-hidden="true">'+drawing+'</svg>Mata '+side+'<strong>'+(open?'TERBUKA':'DITUTUP')+'</strong></span>';
  }).join('')+'</div>';
}
function render(){root.dataset.screen=String(page);root.querySelector('#clear-session').hidden=page===0;
if(page===8)main.innerHTML=calibrationView();
if(page===0)main.innerHTML=`<div class="grid"><section><div class="kicker">Satu langkah, satu instruksi</div><h1 tabindex="-1">Kenali alurnya.<br>Pelan-pelan,<br>satu mata dulu.</h1><p>Coba sendiri dengan keyboard atau bersama pendamping yang memasukkan jawabanmu. Latihan dulu, lalu tiga respons untuk setiap mata. Di akhir, lihat catatan jawaban sesi ini.</p>${action(1,'Mulai simulasi →')}<p class="note smallprint">Ini simulasi penglihatan, bukan pemeriksaan medis. Tidak menghasilkan resep atau diagnosis.</p></section><aside><div class="poster" aria-hidden="true"><div class="poster-title">LIHAT &middot; SEBUTKAN &middot; LANJUTKAN</div><div class="letter">E</div><div class="letter-row">E E E</div><div class="poster-caption">Ilustrasi simbol &mdash; bukan alat ukur</div></div><div class="prep-list"><h2>Yang perlu kamu siapkan</h2><div class="row">01 &nbsp; Gunakan laptop atau komputer</div><div class="row">02 &nbsp; Pilih sendiri atau dengan pendamping</div><div class="row">03 &nbsp; Ikuti instruksi bergantian</div></div></aside></div>`;
if(page===1)main.innerHTML=`<div class="kicker">01 / Sebelum mulai</div><h1 tabindex="-1">Periksa kesiapanmu.</h1><p>Pilih kondisi untuk mencoba alur prototipe.</p><fieldset style="border:0;padding:0"><legend>Apakah ada kehilangan penglihatan mendadak, nyeri mata berat, atau cedera mata?</legend><label class="check"><input type="radio" name="condition" value="no">Tidak ada keluhan tersebut, lanjut mencoba simulasi</label><label class="check"><input type="radio" name="condition" value="yes">Ya, atau saya tidak yakin</label></fieldset><div id="stop" role="alert" tabindex="-1" class="note" hidden>Hentikan tes mandiri. Jangan gunakan simulasi untuk menilai keluhan; cari bantuan tenaga medis. Sesi ini dihentikan dan respons sebelumnya dihapus. Jika jawaban dipilih keliru, mulai sesi baru dan isi pemeriksaan awal kembali.</div><label class="check"><input id="consent" type="checkbox">Saya memahami bahwa ini simulasi, bukan ukuran kacamata atau pemeriksaan kesehatan mata.</label><div class="actions">${action(0,'Kembali',false)}<button class="primary" id="next" data-go="2" disabled>Lanjut ke persiapan →</button></div>`;
if(page===2)main.innerHTML=`<div class="kicker">02 / Persiapan</div><h1 tabindex="-1">Atur tempatmu dulu.</h1><fieldset><legend>Bagaimana kamu ingin mencoba?</legend><label class="check"><input type="radio" name="mode" value="solo">Coba sendiri</label><label class="check"><input type="radio" name="mode" value="helper">Dengan pendamping</label></fieldset><div class="grid"><section><h2>${solo()?'Lihat dan jawab sendiri.':'Laptop untuk melihat. Pendamping untuk menjawab.'}</h2><p>Letakkan laptop dengan stabil. ${solo()?'Kenali tombol panah sebelum menutup satu mata.':'Pendamping memasukkan arah yang kamu sebutkan.'}</p><label class="check"><input class="setup" type="checkbox">Laptop siap dan layar terlihat tanpa pantulan mengganggu.</label><label class="check"><input class="setup" type="checkbox">${solo()?'Saya siap menggunakan keyboard atau tombol layar sendiri.':'Pendamping siap memasukkan jawaban.'}</label></section><aside><h2>${solo()?'Cara mencoba sendiri':'Siapa melakukan apa?'}</h2>${solo()?'<p>Lihat simbol dan masukkan arah kaki E. Gunakan satu tangan untuk menutup mata tanpa menekannya dan tangan lain untuk menjawab. Buka kembali mata atau berhenti jika posisi tidak nyaman.</p><p>'+keyboardHelp+'</p>':'<ol><li><strong>Peserta:</strong> duduk menghadap layar dan sebutkan arah kaki huruf E.</li><li><strong>Pendamping:</strong> baca instruksi, lalu klik jawaban yang disebutkan peserta.</li><li>Jika perlu berhenti, gunakan tombol Jeda.</li></ol>'}</aside></div><div class="note">Tidak perlu mundur ke jarak tertentu pada demo ini. Jarak dan kalibrasi harus ditetapkan sebelum tes sungguhan.</div><div class="actions">${action(1,'Kembali',false)}<button id="next" class="primary" data-go="6" disabled>Coba latihan menjawab →</button></div>`;

if(page===6)main.innerHTML=`<div class="kicker">${solo()?'Latihan sendiri':'Latihan bersama pendamping'}</div><h1 tabindex="-1">Kenali arah kaki huruf E.</h1><p>Kaki adalah tiga garis pendek pada huruf E. Pada contoh ini, semuanya mengarah ke <strong>kanan</strong>. Kedua mata boleh terbuka saat latihan.</p><div class="grid"><section><div class="symbol" aria-label="Contoh huruf E dengan kaki ke kanan">${demoSymbol(0)}</div><p>${solo()?'Tekan panah kanan pada keyboard, atau klik tombol Kanan.':'Peserta menyebut kanan. Pendamping menekan tombol Kanan.'}</p></section><aside><h2>Coba masukkan jawaban</h2><div class="actions">${['Atas','Kiri','Kanan','Bawah'].map(t=>'<button data-practice="'+t.toLowerCase()+'">'+t+'</button>').join('')}</div><p id="practice-feedback" role="status">${formState.practiced?'Latihan selesai. Jawaban latihan tidak masuk catatan sesi.':'Latihan ini menjelaskan tombol, bukan menilai penglihatan.'}</p></aside></div><div class="actions">${action(2,'Kembali ke persiapan',false)}<button id="next" class="primary" data-go="3" ${formState.practiced?'':'disabled'}>Siapkan mata kanan →</button></div>`;
if(page===7)main.innerHTML=`<div class="kicker">Mata kanan selesai</div><h1 tabindex="-1">Jeda dulu, lalu ganti mata.</h1><p>Tiga respons mata kanan sudah dicatat. Beristirahatlah sebelum melanjutkan.</p>${eyeGuide('kiri')}<ol><li>Buka kembali mata kiri.</li><li>Tutup mata kanan dengan lembut tanpa menekannya.</li><li>Biarkan mata kiri terbuka untuk demo berikutnya.</li></ol><label class="check"><input id="switch-eye" type="checkbox" ${formState.switched?'checked':''}>Peserta siap: mata kanan tertutup, mata kiri terbuka.</label><div class="actions"><button id="next" class="primary" data-go="4" ${formState.switched?'':'disabled'}>Mulai demo mata kiri →</button></div>`;

if(page===3||page===4){const eye=page===3?'kanan':'kiri',closed=page===3?'kiri':'kanan';if(!ready)main.innerHTML=`<div class="kicker">Demo mata ${eye}</div><h1 tabindex="-1">Sekarang, mata ${eye}.</h1><p>Tutup mata ${closed} dengan lembut, tanpa menekannya. Biarkan mata ${eye} terbuka.</p>${eyeGuide(eye)}<aside><h2>${solo()?'Untuk kamu':'Untuk pendamping'}</h2><p>${solo()?keyboardHelp:'Minta peserta menyebutkan arah kaki huruf E. Masukkan jawaban tanpa petunjuk. Pilih Tidak terlihat jika peserta tidak dapat menyebutkan arahnya.'}</p></aside><div class="actions">${action(2,'Kembali ke persiapan',false)}<button class="primary" id="ready">Siap, mulai demo →</button></div>`;else main.innerHTML=`<div class="kicker">Mata ${eye} · Percobaan ${q+1} dari 3 · Simulasi</div><h1 tabindex="-1">Ke arah mana?</h1><div class="grid"><section><div class="symbol">${paused?'Sesi dijeda':demoSymbol(formState.directions[page-3][q])}</div><p class="muted">${paused?'Simbol disembunyikan sampai sesi dilanjutkan.':`Mata ${closed} tertutup. Sebutkan arah kaki huruf E.`}</p></section><aside><h2>${solo()?'Masukkan jawabanmu':'Pendamping: masukkan jawaban'}</h2><div class="pad"><span></span><button data-answer="atas" aria-label="Atas" ${paused?'disabled':''}>↑</button><span></span><button data-answer="kiri" aria-label="Kiri" ${paused?'disabled':''}>←</button><span></span><button data-answer="kanan" aria-label="Kanan" ${paused?'disabled':''}>→</button><span></span><button data-answer="bawah" aria-label="Bawah" ${paused?'disabled':''}>↓</button></div><div class="actions"><button data-answer="tidak terlihat" aria-describedby="unseen-help" ${paused?'disabled':''}>Tidak terlihat</button><button id="pause">${interrupted?'Ulangi mata ini':paused?'Lanjutkan':'Jeda'}</button></div><p id="unseen-help" class="helper">Pilih Tidak terlihat jika arah kaki E tidak dapat dikenali. Tidak perlu menebak.${solo()?' Pintasan keyboard: N.':''}</p></aside></div>`}
if(page===5)main.innerHTML=`<article id="session-report"><div class="kicker">${formState.endedEarly?'Sesi dihentikan / Belum lengkap':'Sesi selesai / Ringkasan simulasi'}</div><h1 tabindex="-1">Catatan percobaanmu.</h1><div id="session-metadata"><p>Mulai: <time id="session-start" datetime="${formState.startedAt??''}">${formatSessionTime(formState.startedAt)}</time><br>${formState.endedEarly?'Dihentikan':'Selesai'}: <time id="session-end" datetime="${formState.completedAt??''}">${formatSessionTime(formState.completedAt)}</time></p><p class="helper">Waktu mengikuti jam perangkat. MataCheck v${APP_VERSION} · Simulasi, bukan pemeriksaan mata.</p></div><p>${formState.endedEarly?'Sesi dihentikan sebelum kedua mata selesai. Catatan parsial ini bukan hasil pengukuran.':'Kedua mata sudah menyelesaikan demo.'} Mode ${solo()?'coba sendiri':'dengan pendamping'}. Berikut arah simbol dan respons yang dicatat, sesuai urutan percobaan. Latihan awal tidak disertakan. Pasangan ini tidak dihitung sebagai skor penglihatan.</p><h2>Pengamatan</h2><div class="results" aria-live="polite"><div>Mata kanan<strong>${answers[0].length?answers[0].length+' dari 3 respons' :'0 dari 3 respons'}</strong></div><div>Mata kiri<strong>${answers[1].length?answers[1].length+' dari 3 respons' :'0 dari 3 respons'}</strong></div></div><div class="grid response-log">${answers.map((list,i)=>`<section><h2>Catatan mata ${i===0?'kanan':'kiri'}</h2>${list.length?'':'<p>Belum ada respons yang dicatat.</p>'}<ol>${trialLog(i)}</ol></section>`).join('')}</div><section id="session-quality"><h2>Kualitas sesi</h2>${formState.endedEarly?'<p class="note" id="incomplete-session">Sesi belum lengkap. Respons yang belum diberikan tidak dihitung sebagai Tidak terlihat. Mulai sesi baru jika ingin mencoba lagi.</p>':''}<p>Ukuran layar: ${calibrationLabel()}. Pencocokan ini belum digunakan untuk menilai penglihatan.</p><p>${distanceLabel()}</p><p id="session-age">Usia: ${ageLabel()}. Catatan pengguna, bukan penetapan kelayakan tes.</p><p>Kacamata / lensa kontak: ${correctionLabel()}. Dicatat dari pilihan pengguna.</p>${qualityResetView()}<p id="interruption-summary">Interupsi terdeteksi: mata kanan ${formState.interruptions[0]} kali; mata kiri ${formState.interruptions[1]} kali. Jawaban sebelum pengulangan tidak disertakan dalam catatan di atas.</p><p class="helper">Jumlah ini hanya mencatat perpindahan tab atau jendela yang terdeteksi saat demo mata berjalan. Tidak mencakup jeda manual atau semua perubahan posisi peserta.</p></section><section><h2>Makna catatan</h2><div class="note">Tidak ada kesimpulan kondisi mata. Prototipe ini tidak menghasilkan ukuran minus, plus, silinder, atau resep.</div></section><section><h2>Tindak lanjut</h2><p>Kamu dapat mengulang simulasi untuk mengenali alurnya. Untuk mengetahui kondisi penglihatan, lakukan pemeriksaan mata profesional; catatan ini tidak menggantikannya.</p></section></article><div class="actions"><button id="download-summary">Unduh catatan (.txt)</button><button id="print-summary">Cetak / simpan PDF</button></div><p class="helper">File disimpan di perangkatmu. Hapus sesi tidak menghapus file yang sudah diunduh. Untuk PDF, pilih Simpan sebagai PDF di dialog cetak jika tersedia.</p><p id="export-status" role="status"></p><div class="actions">${action(0,'Kembali ke beranda',false)}<button class="primary" id="restart">Ulangi simulasi</button></div>`;

if(page===1){const r=main.querySelector('[name=condition][value="'+formState.condition+'"]');if(r)r.checked=true;main.querySelector('#consent').checked=formState.consent;main.querySelector('#stop').hidden=formState.condition!=='yes';main.querySelector('#next').disabled=!(formState.condition==='no'&&formState.consent&&!formState.ageInvalid);main.insertAdjacentHTML('beforeend','<p class="helper">Jawab sesuai keadaan. Daftar ini bukan pemeriksaan lengkap atau penetapan kelayakan klinis.</p>');}
if(page===2){main.querySelectorAll('.setup').forEach((c,i)=>c.checked=formState.setup[i]);main.querySelectorAll('[name=mode]').forEach(c=>c.checked=c.value===formState.mode);main.querySelector('#next').disabled=!canEnter(6);main.insertAdjacentHTML('beforeend','<p id="preparation-status" class="helper" role="status">'+preparationMessage()+'</p>');}
main.querySelectorAll('.pad button').forEach(b=>{b.insertAdjacentHTML('beforeend','<span>'+b.getAttribute('aria-label')+'</span>')});
if(solo()&&((page===3||page===4)&&ready||page===6))main.insertAdjacentHTML('beforeend','<p class="helper">'+keyboardHelp+'</p>');
if(page===1||page===2)main.insertAdjacentHTML('beforeend','<section class="cal-summary"><h2>Kondisi saat mencoba</h2><label for="correction">Kacamata atau lensa kontak yang sedang dipakai</label><select id="correction" aria-describedby="correction-help">'+Object.entries(correctionLabels).map(([value,label])=>'<option value="'+value+'" '+(formState.correction===value?'selected':'')+'>'+label+'</option>').join('')+'</select><p id="correction-help" class="helper">Opsional. Catat kondisi yang sedang digunakan, tanpa memasukkan ukuran resep. Jika kondisi berubah, ulangi persiapan sebelum melanjutkan kedua mata.</p></section>');
if(page===1)main.querySelector('#consent').closest('label').before(main.querySelector('#correction').closest('section'));
if(page===1){
  main.querySelector('#correction').closest('section').insertAdjacentHTML('beforebegin','<section><label for="age">Usia dalam tahun penuh (opsional untuk demo)</label><input id="age" type="text" inputmode="numeric" autocomplete="off" aria-describedby="age-help age-error"><p id="age-help" class="helper">Boleh dikosongkan. Usia hanya dicatat dalam sesi dan ikut dalam unduhan/cetakan bila diisi. Rentang usia yang boleh mengikuti tes belum ditetapkan; isian ini bukan persetujuan kelayakan klinis.</p><p id="age-error" role="alert"></p></section>');
  main.querySelector('#age').value=formState.ageInput;
  main.querySelector('#age-error').textContent=formState.ageInvalid?ageError:'';
}
if(page===2)main.insertAdjacentHTML('beforeend',distanceView());
if([3,4,6,7].includes(page))main.insertAdjacentHTML('beforeend','<div class="actions"><button id="position-change">Posisi peserta berubah</button><button id="correction-change">Kacamata / lensa kontak berubah</button><button id="end-session">Berhenti &amp; lihat catatan</button></div>');
if(page===2)main.insertAdjacentHTML('beforeend','<section class="cal-summary"><h2>Ukuran layar — uji persiapan</h2><p>'+calibrationLabel()+'</p><p>Opsional untuk demo ini. Siapkan penggaris untuk mencoba pencocokan ukuran; hasil tetap catatan simulasi.</p><button id="cal-open">Cocokkan dengan penggaris</button></section>');
if(formState.calibration?.status==='valid'&&page!==0&&page!==5&&page!==8)main.insertAdjacentHTML('beforeend','<div class="actions"><button id="cal-screen-change">Saya memindahkan layar / mengubah tampilan</button></div>');
if(interrupted&&(page===3||page===4))main.insertAdjacentHTML('afterbegin','<p class="note" role="alert">Sesi terhenti karena kamu meninggalkan halaman atau jendela. Jawaban mata ini dibersihkan. Pastikan posisi dan mata yang ditutup sudah sesuai, lalu pilih Ulangi mata ini. Pintasan P tidak melanjutkan interupsi.</p>');
if(page===2){main.append(main.querySelector('#preparation-status'));main.append(main.querySelector('#next').closest('.actions'));}
if(page===1&&formState.screeningStopped){
  main.querySelectorAll('input,select').forEach(input=>input.disabled=true);
  main.querySelector('#next').disabled=true;
  main.querySelector('#stop').hidden=false;
  main.insertAdjacentHTML('beforeend','<button id="screening-restart">Mulai sesi baru</button>');
}
const step=steps.indexOf(page===8?2:page===7?4:page)+1;
if(page>0&&!(page===5&&formState.endedEarly))main.insertAdjacentHTML('afterbegin','<div class="step-label"><span>Langkah '+step+' dari '+steps.length+'</span><span>'+names[page===8?2:page===7?4:page]+'</span></div><div class="session-line" aria-label="Langkah '+step+' dari '+steps.length+'">'+steps.map((_,i)=>'<span class="'+(i<step?'done':'')+'"></span>').join('')+'</div>');
}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;checkCalibration();if(b.id==='clear-session'){resetSession(0);return;}if(b.id==='screening-restart'&&page===1&&formState.screeningStopped){resetSession(1);return;}if(b.dataset.go!==undefined){if(page===0&&b.dataset.go==='1')return resetSession(1);return go(+b.dataset.go);}if(b.dataset.practice&&page===6){if(b.dataset.practice==='kanan'){formState.practiced=true;main.querySelector('#next').disabled=false;main.querySelector('#practice-feedback').textContent='Benar untuk contoh ini: kaki huruf E mengarah ke kanan. Latihan selesai; lanjutkan saat siap.';}else{main.querySelector('#practice-feedback').textContent='Coba lagi: tiga garis pendek pada contoh ini mengarah ke kanan. Pilih tombol Kanan.';}return;}if(b.id==='ready'){checkCalibration();if(!canEnter(page)||page===8)return;ready=true;answers[page-3]=[];formState.directions[page-3]=newDirections();if(page===3){answers[1]=[];formState.switched=false;}render();main.querySelector('h1')?.focus()}if(b.id==='pause'){if(interrupted)formState.directions[page-3]=newDirections();paused=!paused;interrupted=false;render();main.querySelector('#pause')?.focus()}if(b.dataset.answer)submitAnswer(b,e);if(b.id==='restart')resetSession(1)});
root.addEventListener('change',e=>{if(page===1&&formState.screeningStopped)return;if(page===2&&e.target.name==='mode'){if(formState.mode!==null)formState.correction='unrecorded';formState.mode=e.target.value;formState.interruptions=[0,0];formState.qualityResets={display:0,position:0,correction:0};formState.directions=[[],[]];formState.distance=null;formState.distanceEditing=false;formState.calibration=null;formState.setup=[false,false];formState.practiced=false;formState.switched=false;answers=[[],[]];render();main.querySelector('[name=mode]:checked')?.focus();return;}if(page===7){formState.switched=root.querySelector('#switch-eye').checked;root.querySelector('#next').disabled=!formState.switched;}if(page===1){formState.condition=root.querySelector('[name=condition]:checked')?.value??null;formState.consent=root.querySelector('#consent').checked;if(formState.condition==='yes'){stopScreening();render();main.querySelector('#stop')?.focus();return;}}if(page===2){formState.setup=[...root.querySelectorAll('.setup')].map(c=>c.checked)}if(page===1){const s=root.querySelector('[name=condition]:checked');root.querySelector('#stop').hidden=!(s&&s.value==='yes');root.querySelector('#next').disabled=!(s&&s.value==='no'&&root.querySelector('#consent').checked&&!formState.ageInvalid)}if(page===2){root.querySelector('#next').disabled=!canEnter(6);root.querySelector('#preparation-status').textContent=preparationMessage();}});const heldKeys=new Set();
function handleKey(e){
  if(e.repeat&&['Enter',' ','Spacebar'].includes(e.key)&&e.target?.matches('button[data-answer]')){e.preventDefault();return;}
  if(!solo()||e.ctrlKey||e.altKey||e.metaKey||e.shiftKey||e.isComposing||e.target?.matches('input,select,textarea,[contenteditable]'))return;
  const keys={ArrowUp:'atas',ArrowLeft:'kiri',ArrowRight:'kanan',ArrowDown:'bawah',n:'tidak terlihat'};
  const key=e.key.length===1?e.key.toLowerCase():e.key;
  if(!keys[key]&&key!=='p')return;
  if(page!==6&&!((page===3||page===4)&&ready))return;
  e.preventDefault();
  if(e.repeat||heldKeys.has(key))return;
  heldKeys.add(key);
  if(key==='p'){if(interrupted)return;if(page!==6)main.querySelector('#pause')?.click();return;}
  if(paused)return;
  const selector=page===6?'[data-practice="'+keys[key]+'"]':'[data-answer="'+keys[key]+'"]';
  main.querySelector(selector)?.click();
}
document.addEventListener('keydown',handleKey);
document.addEventListener('keyup',e=>heldKeys.delete(e.key.length===1?e.key.toLowerCase():e.key));
// SCREENING STOP START
function stopScreening(){
  formState.screeningStopped=true;formState.consent=false;
  answers=[[],[]];formState.directions=[[],[]];
  formState.practiced=false;formState.switched=false;formState.completedAt=null;
  heldKeys.clear();ready=false;paused=false;interrupted=false;q=0;
}
// SCREENING STOP END
// SESSION END START
function resetSession(target){
  formState.screeningStopped=false;
  formState.age=null;formState.ageInput='';formState.ageInvalid=false;
  formState.calibration=null;answers=[[],[]];formState.correction='unrecorded';formState.interruptions=[0,0];formState.qualityResets={display:0,position:0,correction:0};formState.directions=[[],[]];formState.distance=null;formState.distanceEditing=false;formState.condition=null;formState.consent=false;formState.mode=null;formState.setup=[false,false];formState.practiced=false;formState.switched=false;lastPointerAnswerAt=-Infinity;formState.endedEarly=false;formState.startedAt=target===1?new Date().toISOString():null;formState.completedAt=null;heldKeys.clear();ready=false;paused=false;interrupted=false;q=0;go(target);
}
function endSession(){
  checkCalibration();
  if(![3,4,6,7].includes(page)||!canEnter(page))return;
  formState.endedEarly=true;heldKeys.clear();go(5);
}
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(b&&!b.disabled&&b.id==='end-session')endSession();
});
// SESSION END END
// CORRECTION UI START
root.addEventListener('change',e=>{
  if(![1,2].includes(page)||e.target.id!=='correction')return;
  if(formState.screeningStopped)return;
  if(!changeCorrection(e.target.value))return;
  // Update only readiness: preserve an unsaved distance editor and keyboard focus.
  if(page===2)main.querySelector('#next').disabled=!canEnter(6);
});
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled||b.id!=='correction-change'||![3,4,6,7].includes(page))return;
  if(formState.correction==='unrecorded')recordQualityReset('correction');
  changeCorrection('unrecorded');
  // Even an unrecorded change must discard responses made under the previous conditions.
  answers=[[],[]];formState.directions=[[],[]];formState.practiced=false;formState.switched=false;
  ready=false;paused=false;interrupted=false;q=0;formState.setup=[false,false];
  go(2);main.querySelector('#correction')?.focus();
});
// CORRECTION UI END
// DISTANCE UI START
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.id==='position-change'&&[3,4,6,7].includes(page)){
    clearPositionProgress();formState.distanceEditing=false;formState.setup=[false,false];go(2);return;
  }
  if(page!==2)return;
  if(b.id==='distance-open'){
    clearPositionProgress();formState.distanceEditing=true;render();main.querySelector('#distance-cm')?.focus();return;
  }
  if(b.id==='distance-skip'){
    clearPositionProgress();formState.distanceEditing=false;render();main.querySelector('#distance-open')?.focus();return;
  }
  if(b.id==='distance-save'&&formState.distanceEditing){
    const input=main.querySelector('#distance-cm'),mm=parseDistanceCm(input.value);
    const confirmed=['distance-measured','distance-stable','distance-input'].every(id=>main.querySelector('#'+id).checked);
    if(mm===null||!confirmed){
      main.querySelector('#distance-error').textContent=mm===null?'Masukkan jarak positif dalam cm, misalnya 150 atau 150,5.':'Centang ketiga konfirmasi setelah memeriksa posisi dan alat jawab.';
      if(mm===null)input.focus();return;
    }
    formState.distance={mm};formState.distanceEditing=false;render();main.querySelector('#distance-open')?.focus();
  }
});
// DISTANCE UI END
// SUMMARY EXPORT START
function exportSummary(kind){
  if(page!==5||!canEnter(5))return;
  const status=main.querySelector('#export-status');
  if(kind==='print'){
    try{window.print();status.textContent='Dialog cetak ditutup. File PDF hanya tersimpan jika kamu memilih menyimpannya.';}
    catch{status.textContent='Dialog cetak tidak dapat dibuka. Kamu masih dapat mengunduh catatan teks.';}
    return;
  }
  if(kind!=='text')return;
  let url,link;
  try{
    const text='MataCheck - Catatan simulasi\nBukan pemeriksaan mata atau resep.\n\n'+main.querySelector('#session-report').innerText;
    url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));
    link=document.createElement('a');link.href=url;link.download='MataCheck-catatan-simulasi.txt';
    document.body.append(link);link.click();
    status.textContent='Permintaan unduh dikirim ke browser. Periksa folder unduhanmu.';
  }catch{status.textContent='Catatan belum berhasil diunduh. Coba lagi atau gunakan Cetak / simpan PDF.';}
  finally{link?.remove();if(url)setTimeout(()=>URL.revokeObjectURL(url),10000);}
}
root.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button||button.disabled)return;
  if(button.id==='download-summary')exportSummary('text');
  if(button.id==='print-summary')exportSummary('print');
});
// SUMMARY EXPORT END
// INTERRUPTION START
function interruptSession(){
  heldKeys.clear();
  const c=formState.calibration;
  if(page===8&&c?.status==='pending'&&(c.first!==null||c.stage==='verify')){
    const failures=c.failures;formState.calibration=newCalibration();formState.calibration.failures=failures;
    formState.calibration.message='Pencocokan terhenti. Mulai lagi dari garis pertama agar kedua ukuran diambil dalam kondisi yang sama.';
    render();return;
  }
  if(page===6&&formState.practiced){formState.practiced=false;render();return;}
  if(page===7&&formState.switched){formState.switched=false;render();return;}
  if(!ready||![3,4].includes(page)||interrupted)return;
  formState.interruptions[page-3]++;
  answers[page-3]=[];q=0;paused=true;interrupted=true;render();
}
// INTERRUPTION END
window.addEventListener('blur',interruptSession);
function restoreSessionFocus(){checkCalibration();if(interrupted)main.querySelector('#pause')?.focus({preventScroll:true});}
document.addEventListener('visibilitychange',()=>{if(document.hidden)interruptSession();else restoreSessionFocus();});

root.addEventListener('input',e=>{if(e.target.id==='cal-width'){const c=formState.calibration;if(c?.status!=='pending')return;c.width=Number(e.target.value);main.querySelector('#cal-area').innerHTML=calibrationLine(c.width);fitCalibration();}});
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.id==='cal-open'){if(!formState.calibration||formState.calibration.status==='skipped'){const failures=formState.calibration?.failures??0;formState.calibration=newCalibration();formState.calibration.failures=failures;if(failures>=3){formState.calibration.status='blocked';formState.calibration.message='Tiga percobaan belum sesuai. Hapus sesi untuk mulai ulang, atau lanjutkan demo.';}}go(8);fitCalibration();return;}
  const c=formState.calibration;if(!c)return;
  if(b.id==='cal-screen-change'){invalidateCalibration();return;}
  if(page!==8)return;
  if(b.id==='cal-skip'){c.status='skipped';c.scale=null;c.first=null;c.snapshot=null;go(2);return;}
  if(b.id==='cal-retry'){const failures=c.failures;formState.calibration=newCalibration();formState.calibration.failures=failures;}
  if(b.id==='cal-reset'&&c.status==='pending')c.width=c.stage==='match2'?240:300;
  if(b.dataset.calAdjust&&c.status==='pending')c.width=Math.max(100,Math.min(900,c.width+Number(b.dataset.calAdjust)));
  if(b.id==='cal-match'&&c.status==='pending'){
    const box=main.querySelector('.cal-line').getBoundingClientRect();
    if(c.snapshot&&c.snapshot!==displaySnapshot()){invalidateCalibration();return;}
    c.snapshot=displaySnapshot();recordMatch(c,box.width-12);
  }
  if(b.id==='cal-verify'&&c.status==='pending'){
    if(c.snapshot!==displaySnapshot()){invalidateCalibration();return;}
    if(verifyCalibration(c,main.querySelector('#cal-x').value,main.querySelector('#cal-y').value))c.snapshot=displaySnapshot();
  }
  render();fitCalibration();
  main.querySelector('#cal-width,#cal-x,[data-go="2"],#cal-skip')?.focus();
});
for(const event of ['resize','orientationchange'])window.addEventListener(event,checkCalibration);
window.visualViewport?.addEventListener('resize',checkCalibration);
document.addEventListener('fullscreenchange',checkCalibration);
window.addEventListener('focus',restoreSessionFocus);
window.addEventListener('pageshow',e=>{if(e.persisted){heldKeys.clear();root.querySelector('#clear-session').click();}});
let densityQuery;
function watchDensity(){densityQuery?.removeEventListener('change',densityChanged);densityQuery=window.matchMedia('(resolution: '+devicePixelRatio+'dppx)');densityQuery.addEventListener('change',densityChanged);}
function densityChanged(){checkCalibration();watchDensity();}
watchDensity();
render();})();
