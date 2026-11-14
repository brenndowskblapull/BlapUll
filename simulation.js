(() => {
  'use strict';
  const canvas = document.querySelector('#universe'), ctx = canvas.getContext('2d');
  const $ = id => document.getElementById(id);
  const total = 64, random = (a, b) => a + Math.random() * (b - a);
  let width, height, particles, collected, elapsed, paused, phase, flight, wait, last, compression, interaction, origin;
  function resize() {
    const box = canvas.getBoundingClientRect(), ratio = window.devicePixelRatio || 1;
    width = box.width; height = box.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function reset() {
    particles = Array.from({length: total}, () => ({x: random(.06,.94), y: random(.09,.91), size: random(.8,2.1), glow: random(0, Math.PI*2)}));
    collected = 0; elapsed = 0; paused = false; phase = 'collect'; flight = null; wait = .3; compression = 0; interaction = 0; origin = {x: .5, y: .5}; last = null;
    $('pause').innerHTML = 'Ⅱ <span>Pause</span>';
    $('phase').textContent = 'DIE SAMMLUNG'; $('scene-label').textContent = 'DER WICHT FLITZT';
    $('title').innerHTML = 'Alles beginnt mit einem Flitzen<span>.</span>';
    $('description').textContent = 'Der Wicht durchquert den Raum. Mit jedem Flitzen führt er Teilchen zum schwarzen Loch, bis nur noch eines übrig ist.';
    updateStats();
  }
  function updateStats() {
    $('remaining').textContent = particles.length; $('collected').textContent = collected;
    $('bar').style.width = (collected / (total - 1) * 100) + '%';
  }
  function startFlight() {
    const index = Math.floor(Math.random() * particles.length), p = particles[index];
    flight = {p, index, x0: random(.05,.95), y0: random(.08,.92), t: 0, duration: random(.35,.62)};
  }
  function update(dt) {
    elapsed += dt;
    if (phase === 'collect') {
      if (!flight) { wait -= dt; if (wait <= 0) startFlight(); }
      else {
        flight.t += dt / flight.duration;
        if (flight.t >= 1.7) {
          particles.splice(flight.index, 1); collected++; flight = null; wait = random(.12,.38); updateStats();
          if (particles.length === 1) {
            phase = 'compression'; compression = 0;
            origin = {x: particles[0].x, y: particles[0].y};
            $('phase').textContent = 'DAS LETZTE TEILCHEN'; $('scene-label').textContent = 'UNTER DER GANZEN SCHWERKRAFT';
            $('title').innerHTML = 'Nur eines bleibt<span>.</span>';
            $('description').textContent = 'Das letzte Teilchen bleibt außerhalb des schwarzen Lochs. Unter der gesamten Schwerkraft wird es zum Schwebeknecht gepresst.';
          }
        }
      }
    } else if (phase === 'compression') {
      compression += dt;
      if (compression >= 5) {
        phase = 'knecht';
        $('phase').textContent = 'DAS SCHWEBEKNECHT'; $('scene-label').textContent = 'EINE NEUE ENTSTEHUNG';
        $('title').innerHTML = 'Das Schwebeknecht entsteht<span>.</span>';
        $('description').textContent = 'Das Schwebeknecht schwebt und seine Fäden peitschen durch den Raum. Der Wicht flitzt hindurch und seine Begegnungen versetzen die Fäden in Bewegung.';
      }
    }
    if (phase !== 'collect') {
      if (!flight) {
        wait -= dt;
        if (wait <= 0) {
          flight = {x0: random(.05,.95), y0: random(.08,.92), p: {x: random(.05,.95), y: random(.08,.92)}, t: 0, duration: random(.35,.62), reacted: false};
        }
      }
      else { flight.t += dt / flight.duration; if (phase === 'knecht' && !flight.reacted) { const x = flight.x0 + (flight.p.x - flight.x0) * flight.t, y = flight.y0 + (flight.p.y - flight.y0) * flight.t; if (Math.hypot((x - origin.x) * width, (y - origin.y) * height) < Math.min(width, height) * .22) { interaction = 1; flight.reacted = true; } } if (flight.t >= 1) { flight = null; wait = random(.2, 1); } }
    }
    interaction = Math.max(0, interaction - dt * .8);
    const seconds = Math.floor(elapsed); $('time').textContent = String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  }
  function draw() {
    ctx.clearRect(0,0,width,height); const cx=width*.5, cy=height*.5, scale=Math.min(width,height);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,scale*.75); bg.addColorStop(0,'#343b2d'); bg.addColorStop(.4,'#1e241d'); bg.addColorStop(1,'#171a17'); ctx.fillStyle=bg; ctx.fillRect(0,0,width,height);
    ctx.strokeStyle='rgba(190,215,159,.055)'; ctx.lineWidth=1;
    for(let r=1;r<=3;r++){ctx.beginPath();ctx.ellipse(cx,cy,scale*(.12+r*.085),scale*(.075+r*.055),-.23,0,Math.PI*2);ctx.stroke();}
    if (phase !== 'knecht') {
    const radius=scale*(.026 + collected/total*.045);
    const glow=ctx.createRadialGradient(cx,cy,radius*.5,cx,cy,radius*4); glow.addColorStop(0,'rgba(204,235,151,.28)');glow.addColorStop(1,'rgba(204,235,151,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,radius*4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#080b08';ctx.strokeStyle='rgba(209,235,168,.65)';ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fill();ctx.stroke();
    }
    particles.forEach((p,i)=>{let x=p.x*width,y=p.y*height;if(flight && flight.p===p && flight.t>1){const t=Math.min((flight.t-1)/.7,1);x+=(cx-x)*t;y+=(cy-y)*t;} if(phase==='knecht' || (phase==='compression' && compression>3)) return;ctx.fillStyle=`rgba(220,235,197,${.45+.35*Math.sin(elapsed*2+p.glow)})`;ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();});
    if (phase === 'knecht' || (phase === 'compression' && compression > 2)) {
      const growth = phase === 'knecht' ? 1 : Math.min((compression - 2) / 3, 1);
      const eased = growth * growth * (3 - 2 * growth);
      const hover = phase === 'knecht' ? Math.sin(elapsed * 1.3) * scale * .018 : 0;
      ctx.fillStyle = `rgba(220,230,210,${.2 + eased * .55})`;
      for (const [x,y,z] of SCHWEBEKNECHT_STRUKTUR) {
        const reach = Math.min(1, Math.hypot(x, y - 104, z) / 110);
        const wave = phase === 'knecht' ? Math.sin(elapsed * 3.2 - reach * 8 + z * .025) * scale * (.008 + .05 * reach) * (1 + interaction * .8) : 0;
        const whip = phase === 'knecht' ? Math.sin(elapsed * 2.6 - reach * 7 + x * .02) * scale * .025 * reach * (1 + interaction) : 0;
        const px = origin.x * width + (x + z * .32) * scale / 430 * eased + wave;
        const py = origin.y * height + hover - (y - 104 - z * .18) * scale / 430 * eased + whip;
        const size = Math.max(.65, scale / 650) * (.4 + eased * .6);
        ctx.fillRect(px, py, size, size);
      }
    }
    if(flight && flight.t<1){const t=Math.min(flight.t,1), x=(flight.x0+(flight.p.x-flight.x0)*t)*width,y=(flight.y0+(flight.p.y-flight.y0)*t)*height;const dx=(flight.p.x-flight.x0)*width,dy=(flight.p.y-flight.y0)*height,l=Math.hypot(dx,dy)||1,len=8*(1-t);ctx.strokeStyle='#080b08';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-dx/l*len,y-dy/l*len);ctx.stroke();}
  }
  function frame(now) { if(last===null) last=now; const dt=Math.min((now-last)/1000,.05);last=now;if(!paused) update(dt*Number($('speed').value));draw();requestAnimationFrame(frame); }
  $('pause').addEventListener('click',()=>{paused=!paused;$('pause').innerHTML=paused?'▶ <span>Weiter</span>':'Ⅱ <span>Pause</span>';});
  $('restart').addEventListener('click',reset);window.addEventListener('resize',resize);resize();reset();requestAnimationFrame(frame);
})();
