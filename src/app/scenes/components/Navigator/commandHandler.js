import { store } from '../../../../configureStore.js';
import { history } from '../../../../index.js';
import { toggleBees } from '../../../actions/menu';
import { navigateGuides } from '../../../actions/guides';
import axios from 'axios';

export const pushCommand = (c) => {
  if(!c || c.length <= 0) return false;

  let cArr = c.trim().split(' ').map((l) => l.trim());

  switch(cArr[0].toLowerCase()) {
    case 'play':
      return handlePlay(cArr);
    case 'goto':
      return handleGoto(cArr);
    case 'search':
      return handleSearch(cArr);
    case 'topic':
      return handleTopic(cArr);
    case 'admin':
      return handleAdmin(cArr);
    default:
      return false;
  }

}

export const autoComplete = (c) => {
  if(!c || c.length <= 0) return null;

  let cArr = c.trim().split(' ').map((l) => l.trim());

  switch(cArr[0].toLowerCase()) {
    case 'play':
      const pcmd = autoCompletePlay(cArr);
      if(Array.isArray(pcmd)) {
        return pcmd;
      } else if(pcmd) {
        return 'play ' + pcmd
      } else {
        return false;
      }
    case 'goto':
      const gcmd = autoCompleteGoto(cArr);
      if(Array.isArray(gcmd)) {
        return gcmd;
      } else if(gcmd) {
        return 'goto ' + gcmd
      } else {
        return false;
      }
    case 'search':
      const scmd = autoCompleteSearch(cArr);
      if(Array.isArray(scmd)) {
        return scmd;
      } else if(scmd) {
        return 'search ' + scmd
      } else {
        return false;
      }
    case 'topic':
      const tcmd = autoCompleteTopic(cArr);
      if(Array.isArray(tcmd)) {
        return tcmd
      } else if(tcmd) {
        return 'topic ' + tcmd
      } else {
        return false;
      }
    case 'admin':
      const acmd = autoCompleteAdmin(cArr);
      if(Array.isArray(acmd)) {
        return acmd;
      } else if(acmd) {
        return 'admin ' + acmd
      } else {
        return false;
      }
    default:
      return false;
  }
}

const autoCompleteAdmin = (cArr) => {
  const cs = ['edit', 'topic', 'stats', 'home', 'create', 'logout', 'login'];

  if(!cArr[1]) { return null; }

  const mcs = cs.filter((c) => c.match(cArr[1]));
  for(let i = 0; i < mcs.length; i++) {
    if(mcs[i].startsWith(cArr[1])) {
      const scmd = autoCompleteAdminSecond(cArr);
      if(Array.isArray(scmd)) {
        return scmd;
      } else if(scmd) {
        return mcs[i] + ' ' + scmd
      } else {
        return mcs[i];
      }
    }
  }
  return mcs;
}

const autoCompleteAdminSecond = (cArr) => {
  const guides = store.getState().guides.guides.data;
  const topics = store.getState().topics.topics.data;

  if(!cArr[2]) { return null; }

  if(cArr[1] === 'edit') {

    let mcs = guides.filter((c) => c.searchTitle.match(cArr[2].toLowerCase()));
    for(let i = 0; i < mcs.length; i++) {
      if(mcs[i].searchTitle.startsWith(cArr[2].toLowerCase())) { return mcs[i].searchTitle; }
    }
    return mcs.map((c) => c.searchTitle);

  } else if(cArr[1] === 'topic') {

    let mcs = topics.filter((c) => c.title.toLowerCase().match(cArr[2].toLowerCase()));
    for(let i = 0; i < mcs.length; i++) {
      if(mcs[i].title.toLowerCase().startsWith(cArr[2].toLowerCase())) { return mcs[i].title; }
    }
    return mcs.map((c) => c.title);

  } else if(cArr[1] === 'create') {

    let arr = ['guide', 'topic'];
    let mcs = arr.filter((c) => c.match(cArr[2].toLowerCase()));
    for(let i = 0; i < mcs.length; i++) {
      if(mcs[i].startsWith(cArr[2].toLowerCase())) { return mcs[i]; }
    }
    return mcs;

  }

  return null;
}

const autoCompleteTopic = (cArr) => {
  const topics = store.getState().topics.topics.data;

  let mcs = topics.filter((c) => c.title.toLowerCase().match(cArr[1].toLowerCase()));
  for(let i = 0; i < mcs.length; i++) {
    if(mcs[i].title.toLowerCase().startsWith(cArr[1].toLowerCase())) { return mcs[i].title; }
  }
  return mcs.map((c) => c.title);
}

const autoCompleteGoto = (cArr) => {
  const cs = [ 'guides', 'github', 'stack', 'freecodecamp', 'linkedin', 'quora', 'youtube']

  const mcs = cs.filter((c) => c.match(cArr[1]));
  for(let i = 0; i < mcs.length; i++) {
    if(mcs[i].startsWith(cArr[1])) { return mcs[i]; }
  }
  return mcs;
}

const autoCompletePlay = (cArr) => {
  const cs = [ 'bees' ]

  const mcs = cs.filter((c) => c.match(cArr[1]));
  for(let i = 0; i < mcs.length; i++) {
    if(mcs[i].startsWith(cArr[1])) { return mcs[i]; }
  }
  return mcs;
}

const autoCompleteSearch = (cArr) => {
  const popular = store.getState().guides.popular.data;
  const recent = store.getState().guides.recent.data;

  let mcs = popular.filter((c) => c.heading.toLowerCase().match(cArr[1].toLowerCase()));
  mcs = mcs.concat(recent.filter((c) => c.heading.toLowerCase().match(cArr[1].toLowerCase())));
  for(let i = 0; i < mcs.length; i++) {
    if(mcs[i].heading.toLowerCase().startsWith(cArr[1].toLowerCase())) { return mcs[i].heading.split(' ')[0]; }
  }

  return mcs.map((c) => c.heading);
}

const handleAdmin = (cArr) => {

  let c = cArr[1];
  let g = cArr[2];
  var win;

  switch(c.toLowerCase()) {
    case 'edit':
      if(!g) { return false; }
      history.replace('/admin/g/' + g);
      window.location.reload();
      return true;
    case 'topic':
      if(!g) { return false; }
      history.replace('/admin/t/' + g);
      window.location.reload();
      return true;
    case 'create':
      if(!g) { return false; }
      if(g === 'topic') {
        history.replace('/admin/t/new');
        window.location.reload();
        return true;
      } else if(g === 'guide') {
        history.replace('/admin/g/new');
        window.location.reload();
        return true;
      }
      return false;
    case 'home':
      history.replace('/admin');
      window.location.reload();
      return true;
    case 'login':
      history.replace('/login');
      window.location.reload();
      return true;
    case 'logout':
      localStorage.setItem('portfolio_auth_token', '');
      history.replace('/login');
      window.location.reload();
      return true;
    default:
      return false;
  }
}

const handleTopic = (cArr) => {
  history.replace('/t/' + cArr[1]);
  window.location.reload();
}

const handleSearch = (cArr) => {
  const getGuideUrl = (cArr) => {
    let queryString = '';
    for(let i = 1; i < cArr.length; i++) {
      if(cArr.length-1 === i) {
        queryString = queryString.concat(cArr[i]);
      } else {
        queryString = queryString.concat(cArr[i] + " ");
      }
    }
    return queryString;
  }

  let urlExtenstion = getGuideUrl(cArr);
  history.replace('/s/' + urlExtenstion);
  window.location.reload();
}

const handleGoto = (cArr) => {

  let c = cArr[1];
  var win;

  switch(c.toLowerCase()) {
    case 'guides':
      history.replace('/');
      window.location.reload();
      return true;
    case 'github':
      win = window.open('https://github.com/jackmead515', '_blank');
      if(win) win.focus();
      return true;
    case 'stack':
      win = window.open('https://stackoverflow.com/users/5132605/vocojax', '_blank');
      if(win) win.focus();
      return true;
    case 'freecodecamp':
      win = window.open('https://www.freecodecamp.org/jackmead515', '_blank');
      if(win) win.focus();
      return true;
    case 'linkedin':
      win = window.open('https://www.linkedin.com/in/jack-mead-687507a2/', '_blank');
      if(win) win.focus();
      return true;
    case 'quora':
      win = window.open('https://www.quora.com/profile/Jack-Mead-3', '_blank');
      if(win) win.focus();
      return true;
    case 'youtube':
      win = window.open('https://www.youtube.com/channel/UCFXk8QukN7_GXBiuHMoXHLw', '_blank');
      if(win) win.focus();
      return true;
    default:
      return false;
  }
}

const handlePlay = (cArr) => {

  let c = cArr[1];

  switch(c.toLowerCase()) {
    case 'march':
    case 'bees':
      store.dispatch(toggleBees(!store.getState().menu.bees))
      return true;
    default:
      return false;
  }

}
