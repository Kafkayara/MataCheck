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
  const heading = () => assert(document.activeElement === find('h1'), 'Heading focus lost');
  const attempt = n => {
    const button = document.createElement('button'); button.dataset.go = String(n);
    root.append(button); button.click(); button.remove();
  };
  try {
    screen(0); fit(); assert(!find('nav'), 'Reviewer navigation present');
    for (const n of [-1,8,1.5,'NaN',2,3,4,5,6,7]) { attempt(n); screen(0); }
    click('[data-go="1"]'); screen(1); heading(); fit();
    assert(find('#next').disabled, 'Empty form allowed');
    check('[value="yes"]'); check('#consent');
    assert(!find('#stop').hidden, 'Stop message missing');
    assert(find('#next').disabled, 'Symptoms allowed');
    for (const n of [2,3,4,5,6,7]) { attempt(n); screen(1); }
    check('[value="no"]'); check('#consent', false);
    assert(find('#next').disabled, 'Consent missing');
    check('#consent'); click('#next'); screen(2); fit();
    attempt(3); screen(2); check('.setup');
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
      screen(eye); assert(find('#ready') && !find('[data-answer]'), 'Eye confirmation skipped'); fit();
      click('#ready'); heading(); fit();
      const progress = find('.kicker').textContent;
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
      if (eye===3) { screen(7); fit(); attempt(4); screen(7); assert(find('#next').disabled,'Switch confirmation missing'); check('#switch-eye'); click('#next'); screen(4); }
    }
    screen(5); fit(); assert(root.querySelectorAll('.response-log li').length===6,'Wrong response log');
    assert([...root.querySelectorAll('.results strong')].every(e=>e.textContent==='3 dari 3 respons'), 'Wrong counts');
    click('#restart'); screen(1);
    assert(!find('#consent').checked && !find('[name=condition]:checked'), 'Restart retained form');
    attempt(5); screen(1);
    check('[value="no"]'); check('#consent'); click('#next');
    assert([...root.querySelectorAll('.setup')].every(e=>!e.checked), 'Restart retained preparation');
    check('.setup'); check('label.check:nth-of-type(2) .setup'); click('#next');
    screen(6); assert(find('#next').disabled, 'Restart retained practice'); click('[data-practice="kanan"]'); click('#next'); click('#ready'); click('[data-answer="kanan"]'); click('#clear-session');
    screen(0); click('[data-go="1"]');
    assert(!find('#consent').checked && !find('[name=condition]:checked'), 'Clear retained form');
    attempt(5); screen(1);
    check('[value="no"]'); check('#consent'); click('#next');
    assert([...root.querySelectorAll('.setup')].every(e=>!e.checked), 'Clear retained preparation');
    attempt(4); screen(2); click('#clear-session'); screen(0); fit();
    const result = document.createElement('pre'); result.id='qa-result';
    result.textContent='PASS '+count+' assertions; guards, symptoms, retained inputs, both eyes, pause, focus, reset, overflow';
    document.body.append(result);
  } catch (error) {
    const result=document.createElement('pre'); result.id='qa-result';
    result.textContent='FAIL after '+count+' assertions: '+error.message;
    document.body.append(result);
  }
})();
