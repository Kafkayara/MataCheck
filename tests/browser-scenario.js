(() => {
  let count = 0;
  const assert = (value, message) => { if (!value) throw Error(message); count++; };
  const root = document.querySelector('#mata');
  const find = selector => root.querySelector(selector);
  const click = selector => { const e = find(selector); assert(e, 'Missing '+selector); e.click(); };
  const check = (selector, value = true) => {
    const e = find(selector); e.checked = value;
    e.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const screen = n => assert(root.dataset.screen === String(n), 'Expected screen '+n);
  const fit = () => assert(document.documentElement.scrollWidth <= innerWidth, 'Overflow on screen '+root.dataset.screen);
  const eyeGuide = active => {
    const left=find('[data-eye="kiri"]'),right=find('[data-eye="kanan"]');
    assert(left&&right,'Eye guide missing');
    assert(left.getBoundingClientRect().right<=right.getBoundingClientRect().left,'Eye cards must stay left/right');
    assert(left.getBoundingClientRect().top===right.getBoundingClientRect().top,'Eye cards stacked');
    assert(left.classList.contains('eye-open')===(active==='kiri'),'Left eye state wrong');
    assert(right.classList.contains('eye-open')===(active==='kanan'),'Right eye state wrong');
  };
  const heading = () => {
    assert(document.activeElement === find('h1'), 'Heading focus lost');
    assert(getComputedStyle(find('h1')).outlineStyle==='none','Heading has a distracting focus outline');
  };
  const attempt = n => {
    const button = document.createElement('button'); button.dataset.go = String(n);
    root.append(button); button.click(); button.remove();
  };
  try {
    screen(0); fit(); assert(!find('nav'), 'Reviewer navigation present');
    for (const n of [-1,9,1.5,'NaN',2,3,4,5,6,7]) { attempt(n); screen(0); }
    click('[data-go="1"]'); screen(1); heading(); fit();
    assert(find('#next').disabled, 'Empty form allowed');
    check('[value="yes"]'); check('#consent');
    assert(!find('#stop').hidden, 'Stop message missing');
    assert(find('#next').disabled, 'Symptoms allowed');
    for (const n of [2,3,4,5,6,7]) { attempt(n); screen(1); }
    check('[value="no"]'); check('#consent', false);
    assert(find('#next').disabled, 'Consent missing');
    check('#consent'); click('#next'); screen(2); fit();
    attempt(3); screen(2); check('[name=mode][value=helper]'); check('.setup');
    assert(find('#next').disabled, 'Only one preparation accepted');
    check('label.check:nth-of-type(2) .setup');
    click('[data-go="1"]');
    assert(find('[value="no"]').checked && find('#consent').checked, 'Initial form lost');
    click('#next');
    assert([...root.querySelectorAll('.setup')].every(e=>e.checked), 'Preparation lost');
    click('#next'); screen(6); fit();
    assert(!find('#size'), 'Calibration slider present');
    attempt(3); screen(6);
    click('[data-practice="atas"]'); assert(find('#next').disabled, 'Wrong practice unlocked');
    click('[data-practice="kanan"]'); assert(!find('#next').disabled, 'Practice did not unlock');
    click('#next'); screen(3); fit();
    attempt(4); screen(3); attempt(5); screen(3);
    for (let eye = 3; eye <= 4; eye++) {
      screen(eye);
      if(eye===3){eyeGuide('kanan');assert(find('#ready')&&!find('[data-answer]'),'Right eye confirmation skipped');click('#ready');}
      else {assert(!find('#ready')&&find('[data-answer]'),'Left eye asks for a duplicate confirmation');assert(find('.step-label').textContent.includes('Langkah 5 dari 6'),'Left eye progress incorrect');}
      heading(); fit();
      const progress = find('.kicker').textContent;
      click('[data-answer="atas"]');
      window.dispatchEvent(new Event('blur'));
      assert(!find('.symbol b'),'Interruption left symbol visible');
      assert(find('#pause').textContent==='Ulangi mata ini','Interruption missing explicit restart');
      assert([...root.querySelectorAll('[data-answer]')].every(e=>e.disabled),'Interruption accepted responses');
      click('#pause');
      assert(find('.kicker').textContent===progress,'Interrupted eye did not restart at first trial');
      click('#pause'); fit();
      assert(document.activeElement.id === 'pause', 'Pause focus lost');
      assert([...root.querySelectorAll('[data-answer]')].every(e=>e.disabled), 'Paused answers enabled');
      assert(!find('.symbol b'), 'Paused symbol visible');
      click('[data-answer="kanan"]');
      assert(find('.kicker').textContent === progress, 'Pause advanced trial');
      click('#pause'); assert(document.activeElement.id === 'pause', 'Resume focus lost');
      assert(find('.kicker').textContent === progress, 'Resume advanced trial');
      for (const answer of ['atas','tidak terlihat','kiri']) {
        click('[data-answer="'+answer+'"]'); fit();
        if (answer !== 'kiri') assert(document.activeElement.dataset.answer === answer, 'Answer focus lost');
      }
      heading();
      if (eye===3) { screen(7); eyeGuide('kiri'); fit(); attempt(4); screen(7); assert(find('#next').disabled,'Switch confirmation missing'); check('#switch-eye'); click('#next'); screen(4); }
    }
    screen(5); fit(); assert(root.querySelectorAll('.response-log li').length===6,'Wrong response log');
      assert(find('#interruption-summary').textContent.includes('mata kanan 1 kali; mata kiri 1 kali'),'Wrong interruption counts');
      for(const title of ['Pengamatan','Kualitas sesi','Makna catatan','Tindak lanjut'])assert([...root.querySelectorAll('h2')].some(e=>e.textContent===title),'Missing summary section: '+title);
    assert([...root.querySelectorAll('.results strong')].every(e=>e.textContent==='3 dari 3 respons'), 'Wrong counts');
    click('#restart'); screen(1);
    assert(!find('#consent').checked && !find('[name=condition]:checked'), 'Restart retained form');
    attempt(5); screen(1);
    check('[value="no"]'); check('#consent'); click('#next');
    assert([...root.querySelectorAll('.setup')].every(e=>!e.checked), 'Restart retained preparation');
    check('[name=mode][value=helper]'); check('.setup'); check('label.check:nth-of-type(2) .setup'); click('#next');
    screen(6); assert(find('#next').disabled, 'Restart retained practice'); click('[data-practice="kanan"]'); click('#next'); click('#ready'); click('[data-answer="kanan"]'); click('#clear-session');
    screen(0); click('[data-go="1"]');
    assert(!find('#consent').checked && !find('[name=condition]:checked'), 'Clear retained form');
    attempt(5); screen(1);
    check('[value="no"]'); check('#consent'); click('#next');
    assert([...root.querySelectorAll('.setup')].every(e=>!e.checked), 'Clear retained preparation');
    attempt(4); screen(2); click('#clear-session'); screen(0); fit();
    // Solo mode: actual DOM events, held keys, pause and both eyes.
    click('[data-go="1"]');check('[value="no"]');check('#consent');click('#next');
    check('[name=mode][value=solo]');check('.setup');check('label.check:nth-of-type(2) .setup');click('#next');screen(6);
    // Real keyboard events start at the focused element and bubble to document.
    const key=(value,release=true)=>{document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:value,bubbles:true}));if(release)document.activeElement.dispatchEvent(new KeyboardEvent('keyup',{key:value,bubbles:true}));};
    key('ArrowRight');assert(!find('#next').disabled,'Solo practice failed');click('#next');click('#ready');screen(3);
    key('ArrowUp',false);const progress=find('.kicker').textContent;key('ArrowUp');assert(find('.kicker').textContent===progress,'Held key advanced');
    key('p');key('ArrowDown');assert(find('.kicker').textContent===progress,'Paused key advanced');key('p');
    key('n');key('ArrowLeft');screen(7);check('#switch-eye');click('#next');assert(!find('#ready')&&find('[data-answer]'),'Solo left eye asks for duplicate confirmation');
    key('ArrowUp');key('ArrowRight');key('n');screen(5);fit();
    assert(root.querySelectorAll('.response-log li').length===6,'Solo summary missing');
      assert(find('#interruption-summary').textContent.includes('mata kanan 0 kali; mata kiri 0 kali'),'Restart retained interruption counts');
    click('#restart');check('[value="no"]');check('#consent');click('#next');
    assert(!find('[name=mode]:checked'),'Reset retained mode');
    check('[name=mode][value=solo]');check('.setup');check('label.check:nth-of-type(2) .setup');click('#next');key('ArrowRight');click('[data-go="2"]');
    check('[name=mode][value=helper]');assert([...root.querySelectorAll('.setup')].every(e=>!e.checked),'Mode change retained preparation');attempt(3);screen(2);click('#clear-session');screen(0);
    // Calibration uses synthetic measurements here; physical accuracy requires a ruler.
    click('[data-go="1"]');check('[value="no"]');check('#consent');click('#next');
    check('[name=mode][value=solo]');check('.setup');check('label.check:nth-of-type(2) .setup');
    click('#cal-open');screen(8);fit();
    const match=()=>{const slider=find('#cal-width');slider.value='200';slider.dispatchEvent(new Event('input',{bubbles:true}));assert(!find('#cal-match').disabled,'Fitting calibration line blocked');click('#cal-match');};
    match();match();find('#cal-x').value='50';find('#cal-y').value='50';click('#cal-verify');
    assert(find('#cal-message').textContent.includes('sudah dicocokkan'),'Calibration did not complete');
    click('[data-go="2"]');assert(!find('#next').disabled,'Valid calibration blocked demo');
    click('#next');click('[data-practice="kanan"]');click('#next');click('#ready');click('[data-answer="atas"]');
    // Exercise the same invalidation used by display signals.
    window.dispatchEvent(new Event('resize'));assert(find('[data-answer]'),'Unchanged viewport invalidated calibration');
    click('#cal-screen-change');screen(8);assert(find('#cal-retry')&&!find('[data-answer]'),'Manual invalidation did not stop trial');
    click('#cal-retry');match();match();find('#cal-x').value='50';find('#cal-y').value='50';click('#cal-verify');click('[data-go="2"]');
    click('#next');assert(find('#next').disabled,'Invalidation retained practice');click('[data-practice="kanan"]');click('#next');click('#ready');
    click('[data-answer="atas"]');
    click('[data-answer="atas"]');click('[data-answer="atas"]');check('#switch-eye');click('#next');
    click('[data-answer="atas"]');click('[data-answer="atas"]');click('[data-answer="atas"]');screen(5);
    click('#restart');check('[value="no"]');check('#consent');click('#next');
    check('[name=mode][value=solo]');check('.setup');check('label.check:nth-of-type(2) .setup');click('#cal-open');
    match();match();find('#cal-x').value='50';find('#cal-y').value='52';click('#cal-verify');
    assert(find('#cal-message').textContent.includes('belum konsisten'),'Bad vertical measurement accepted');
    click('#cal-reset');
    for(let i=0;i<2;i++){match();match();find('#cal-x').value='52';find('#cal-y').value='50';click('#cal-verify');}
    assert(!find('#cal-match')&&find('#cal-message').textContent.includes('Tiga'),'Failure limit bypassed');
    click('#cal-skip');click('#cal-open');assert(!find('#cal-match'),'Reopening bypassed failure limit');click('#cal-skip');
    click('#clear-session');screen(0);
    const result = document.createElement('pre'); result.id='qa-result';
    result.textContent='PASS '+count+' assertions; guards, symptoms, retained inputs, both eyes, pause, focus, reset, overflow';
    document.body.append(result);
  } catch (error) {
    const result=document.createElement('pre'); result.id='qa-result';
    result.textContent='FAIL after '+count+' assertions: '+error.message;
    document.body.append(result);
  }
})();
