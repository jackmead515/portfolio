import axios from 'axios';

export const tracking = () => {
  return new Promise((resolve, reject) => {
    axios.post('/tracking/get_tracking', {token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
      if(res.data.status === 200) {

        let { tracking } = res.data;

        tracking = tracking.map((g) => {
          return {
            searchTitle: g.searchTitle,
            heading: g.heading,
            links: g.activeLinks,
            views: g.activeViews,
            searches: g.activeSearches
          };
        });

        resolve(tracking);
      } else {
        resolve([]);
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}

export const topics = () => {
  return new Promise((resolve, reject) => {
    axios.post('/topics/get_topics').then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.topics);
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.log(err);
      resolve([])
    });
  });
}

export const guides = (start, end) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides', {start, end}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.log(err);
      resolve([])
    });
  });
}

export const allGuides = () => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/all', {token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.log(err);
      resolve([])
    });
  });
}

export const popular = (amount) => {
  return new Promise((resolve, reject) => {
    axios.post('/tracking/popular', {amount}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.log(err);
      resolve([])
    });
  });
};

export const recent = (amount) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/recent', {amount}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.log(err);
      resolve([])
    });
  });
}

export default {
  recent,
  popular,
  allGuides,
  guides,
  topics,
  tracking
}
