import { store } from '../../../../configureStore.js';
import { history } from '../../../../index.js';
import { toggleMenu, toggleSkills } from '../../../actions/menu';
import { navigateGuides, refreshGuides } from '../../../actions/guides';
import axios from 'axios';

export default (c) => {
  if(!c || c.length <= 0) return false;

  let cArr = c.split(' ').map((l) => l.trim());

  switch(cArr[0].toLowerCase()) {
    case 'navigate':
      return handleNavigate(cArr);
    case 'play':
      return handlePlay(cArr);
    case 'goto':
      return handleGoto(cArr);
    case 'toggle':
      return handleToggle(cArr);
    case 'search':
      return handleSearch(cArr);
    default:
      return false;
  }

}

const handleSearch = (cArr) => {

  let c = cArr[1];
  let secondParam = null;

  switch(c.toLowerCase()) {
    case 'guides':
      let urlExtenstion = getGuideUrl(cArr);
      history.push('/guides/s/' + urlExtenstion);
      window.location.reload();
      return true;
    default:
      return false;
  }
}

const getGuideUrl = (cArr) => {
  let queryString = '';
  for(let i = 2; i < cArr.length; i++) {
    if(cArr.length-1 === i) {
      queryString = queryString.concat(cArr[i]);
    } else {
      queryString = queryString.concat(cArr[i] + " ");
    }
  }
  return queryString;
}

const handleToggle = (cArr) => {
  let c = cArr[1];

  switch(c.toLowerCase()) {
    case 'menu':
      store.dispatch(toggleMenu(!store.getState().menu.opened));
      return true;
    case 'skills':
      store.dispatch(toggleSkills(!store.getState().menu.skills));
      return true;
    default:
      return false;
  }
}

const handleNavigate = (cArr) => {

  let c = cArr[1];
  let d = cArr[2];
  let secondParam = null;

  switch(c.toLowerCase()) {
    case 'home':
      history.push('/home');
      return true;
    case 'projects':
      history.push('/projects');
      return true;
    case 'guides':
      history.push('/guides');
      return true;
    case 'about':
      history.push('/about');
      return true;
    case 'contact':
      history.push('/contact');
      return true;
    case 'help':
      history.push('/help');
      return true;
    case 'plugin':
      history.push('/plugin');
      return true;
    default:
      return false;
  }

}

const handleGoto = (cArr) => {

  let c = cArr[1];
  var win;

  switch(c.toLowerCase()) {
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
    default:
      return false;
  }

}
