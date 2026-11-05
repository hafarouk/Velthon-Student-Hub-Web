'use strict';
(() => {
  const initialHome = home, initialCourses = courses;
  const institutions = [...new Set(hubProgramCatalog.map(p => p.institution))];
  const encouragement = {
    Focused: ['Give one good question your full attention.', 'Let all things be done decently and in order. — 1 Corinthians 14:40 (KJV)'],
    Overwhelmed: ['Choose one small task. The rest can wait a moment.', 'Casting all your care upon him; for he careth for you. — 1 Peter 5:7 (KJV)'],
    Tired: ['A pause is part of a sustainable study day.', 'Come unto me, all ye that labour and are heavy laden, and I will give you rest. — Matthew 11:28 (KJV)'],
    Motivated: ['Use today’s energy to begin something you care about.', 'Let all your things be done with charity. — 1 Corinthians 16:14 (KJV)']
  };
  function options(items, value) {
    return items.map(x => '<option'+(x===value?' selected':'')+'>'+esc(x)+'</option>').join('');
  }
  function checkIn() {
    const p=state.profile;
    const mood=p.checkInDate===Student.day() && Object.hasOwn(encouragement,p.studyMood)?p.studyMood:'';
    const pref=p.inspirationChoice || 'Motivational quote';
    const now=new Date();
    const dayIndex=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000);
    const choices=Object.values(encouragement);
    const selection=mood?encouragement[mood]:choices[dayIndex%choices.length];
    const line=pref==='Off'?'':selection[pref==='Bible verse'?1:0];
    return '<section class="card dashboard-checkin"><h2>Study check-in</h2><div class="row wrap"><label>How are you feeling? <select id="hubMood"><option value="">Choose a mood</option>'+options(Object.keys(encouragement),mood)+'</select></label><label>Inspiration <select id="hubInspiration">'+options(['Off','Motivational quote','Bible verse'],pref)+'</select></label></div>'+(line?'<p class="quote" aria-live="polite">'+esc(line)+'</p>':'')+'</section>';
  }
  function planSettings() {
    const p=state.profile.coursePlanner || {};
    const institution=p.institution || state.profile.institution || '';
    const matches=hubProgramCatalog.filter(x=>x.institution===institution);
    const program=p.program || state.profile.program || '';
    const plan=matches.find(x=>x.program===program);
    const years=plan?Object.keys(plan.years).sort():['1','2','3','4','5','6'];
    const year=years.includes(String(p.year))?String(p.year):years[0];
    return {institution,program,plan,years,year,matches};
  }
  const key = value => String(value||'').toUpperCase().replace(/[\s-]/g,'');
  function planner() {
    const {institution,program,plan,years,year,matches}=planSettings();
    const rows=plan?.years[year]||[];
    const seen=new Set(state.courses.map(c=>key(c.code)));
    const review=rows.map(([code,name],i)=>'<label style="display:block"><input type="checkbox" data-course-index="'+i+'" '+(seen.has(key(code))?'disabled checked':'')+'> '+esc(code+' · '+name)+(seen.has(key(code))?' ✓':'')+'</label>').join('');
    const query=encodeURIComponent([institution,program,'year '+year,'official curriculum course calendar'].join(' '));
    return '<section class="card" id="hubPlanner"><h2>Find my courses</h2><div class="row wrap"><label>University or college <input id="hubInstitution" list="hubInstitutions" maxlength="160" value="'+esc(institution)+'"></label><datalist id="hubInstitutions">'+options(institutions,'')+'</datalist><label>Program and stream <input id="hubProgram" list="hubPrograms" maxlength="160" value="'+esc(program)+'"></label><datalist id="hubPrograms">'+options(matches.map(x=>x.program),'')+'</datalist><label>Year <select id="hubYear">'+options(years,year)+'</select></label></div>'+
    (plan?'<p>Suggested from the <a target="_blank" rel="noopener noreferrer" href="'+plan.url+'">official program sequence</a>. Check electives, optional work terms and your entry year against your timetable. '+(institution==='University of Windsor'&&year==='4'?'Choose one of MECH-4259 or MECH-4258. ':'')+'</p>'+review+'<button id="hubAddCourses" type="button">Add selected courses</button>':
    '<p>Choose a listed program for a year-by-year course list, or enter your own institution and program.</p>'+(institution&&program?'<a href="https://www.google.com/search?q='+query+'" target="_blank" rel="noopener noreferrer">Find this program’s published course list ↗</a>':''))+
    '<details><summary>Paste a course list</summary><label>One course per line, as code | course name<textarea id="hubPaste" rows="4" maxlength="16000" placeholder="COURSE 101 | Course name"></textarea></label><button type="button" id="hubReview">Review list</button><div id="hubReviewRows"></div></details><p><button type="button" data-action="addCourse">Add a missing course manually</button></p></section>';
  }
  home=function(){const html=initialHome();const i=html.indexOf('<div class="metrics');return i<0?html+checkIn():html.slice(0,i)+checkIn()+html.slice(i);};
  courses=function(){const html=initialCourses();if(state.profile.mode==='school')return html;const i=html.indexOf('<article');return i<0?html+planner():html.slice(0,i)+planner()+html.slice(i);};
  function saveFeedback(){persist().catch(()=>notify('Your changes could not be saved. Please retry.',true));}
  document.addEventListener('change',e=>{
    if(!account)return;
    const id=e.target.id;
    if(id==='hubMood'||id==='hubInspiration'){
      if(id==='hubMood'){state.profile.studyMood=e.target.value;state.profile.checkInDate=Student.day();}
      else state.profile.inspirationChoice=e.target.value;
      saveFeedback();render();return;
    }
    if(!['hubInstitution','hubProgram','hubYear'].includes(id))return;
    const current=planSettings(),value=e.target.value.trim();
    const match=(items)=>items.find(x=>x.toLowerCase()===value.toLowerCase())||value;
    const p={institution:current.institution,program:current.program,year:current.year};
    if(id==='hubInstitution'){p.institution=match(institutions);p.program='';p.year='1';}
    if(id==='hubProgram'){p.program=match(current.matches.map(x=>x.program));p.year='1';}
    if(id==='hubYear')p.year=value;
    state.profile.coursePlanner=p;saveFeedback();render();
    document.getElementById(id==='hubInstitution'?'hubProgram':id==='hubProgram'?'hubYear':id)?.focus();
  });
  document.addEventListener('click',e=>{
    if(!account)return;
    if(e.target.id==='hubReview'){
      const lines=document.getElementById('hubPaste').value.split(/\r?\n/).filter(x=>x.trim());
      const rows=lines.map(x=>x.split('|').map(y=>y.trim()));
      if(!rows.length||rows.length>150||rows.some(r=>r.length!==2||!r[0]||!r[1]||r[0].length>35||r[1].length>200)){
        document.getElementById('hubReviewRows').textContent='Use code | course name on each line (up to 150 courses).';return;
      }
      const seen=new Set(state.courses.map(c=>key(c.code)));
      document.getElementById('hubReviewRows').innerHTML=rows.map(([code,name])=>{
        const duplicate=seen.has(key(code));seen.add(key(code));
        return '<label style="display:block"><input type="checkbox" data-paste-code="'+esc(code)+'" data-paste-name="'+esc(name)+'" '+(duplicate?'disabled':'checked')+'> '+esc(code+' · '+name)+'</label>';
      }).join('')+'<button type="button" id="hubAddPasted">Add selected courses</button>';return;
    }
    if(e.target.id==='hubAddPasted'){
      const seen=new Set(state.courses.map(c=>key(c.code)));
      for(const box of document.querySelectorAll('#hubReviewRows input:checked:enabled')){
        const code=box.dataset.pasteCode;if(seen.has(key(code)))continue;
        state.courses.push({id:Student.id(),code,name:box.dataset.pasteName,credits:0,gpa:''});seen.add(key(code));
      }
      saveFeedback();render();return;
    }
    if(e.target.id!=='hubAddCourses')return;
    const {plan,year}=planSettings();if(!plan)return;
    const seen=new Set(state.courses.map(c=>key(c.code)));
    let count=0;
    for(const checkbox of document.querySelectorAll('#hubPlanner [data-course-index]:checked:enabled')){
      const row=plan.years[year][Number(checkbox.dataset.courseIndex)];
      if(!row||seen.has(key(row[0])))continue;
      state.courses.push({id:Student.id(),code:row[0],name:row[1],credits:0,gpa:''});
      seen.add(key(row[0]));count++;
    }
    if(count){saveFeedback();render();}else notify('Select a course to add.');
  });
})();
