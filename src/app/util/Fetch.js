import axios from 'axios';

export const tracking = () => {
  return new Promise((resolve, reject) => {
    axios.post('/tracking/get_tracking').then((res) => {
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
      resolve([])
    });
  });
}

const all = (start, end) => {
  return new Promise((resolve, reject) => {
    guides(start, end).then((guides) => {
      tracking().then((tracking) => {
        topics().then((topics) => {
          resolve({guides, tracking, topics})
        });
      });
    });
  });
}

export default all;
