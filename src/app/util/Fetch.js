import axios from 'axios';

export const tracking = () => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/get_all_tracking', {token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
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
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const guideTracking = (searchTitle) => {
  return new Promise((resolve, reject) => {
    axios.post('/tracking/get_tracking', {searchTitle}).then((res) => {
      if(res.data.status === 200) {

        let { tracking } = res.data;

        tracking = {
          searchTitle: tracking.searchTitle,
          heading: tracking.heading,
          links: tracking.activeLinks,
          views: tracking.activeViews,
          searches: tracking.activeSearches
        };

        resolve(tracking);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const topics = () => {
  return new Promise((resolve, reject) => {
    axios.post('/topics/get_topics').then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.topics);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const guides = (start) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides', {start}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const guidesByTopic = (title, start) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/topic', {title, start}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const guidesBySearch = (query, start, getAmount) => {
  return new Promise((resolve, reject) => {

    let startTime = parseInt(query.substr(0, query.indexOf('-')));
    let endTime = parseInt(query.substr(query.indexOf('-')+1, query.length));

    let queryData = null;
    if(typeof startTime === 'number' && typeof endTime === 'number' && !isNaN(startTime) && !isNaN(endTime)) {
      queryData = {timeRange: {start: parseInt(startTime), end: parseInt(endTime)}, start, getAmount}
    } else {
      queryData = {query, start, getAmount}
    }

    axios.post('/search/guides', queryData).then((res) => {
      if(res.data.status === 200) {
        resolve({guides: res.data.guides, amount: res.data.amount});
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const adminGuide = (searchTitle) => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/guide', {searchTitle, token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guide);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const guideBySearchTitle = (searchTitle) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/guide', {searchTitle}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guide);
      } else {
        reject(res.data);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

export const allGuides = () => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/all_guides', {token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const popular = (amount) => {
  return new Promise((resolve, reject) => {
    axios.post('/tracking/popular', {amount}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
};

export const recent = (amount) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/recent', {amount}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const related = (heading, subHeading, tags) => {
  return new Promise((resolve, reject) => {
    axios.post('/guides/related', {heading, subHeading, tags}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.guides);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const comments = (searchTitle) => {
  return new Promise((resolve, reject) => {
    axios.post('/comments', {searchTitle}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.comments);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
};

export const commentAmount = (searchTitle) => {
  return new Promise((resolve, reject) => {
    axios.post('/comments/amount', {searchTitle}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.amount);
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

export default {
  recent,
  popular,
  allGuides,
  guides,
  guidesByTopic,
  guidesBySearch,
  guideBySearchTitle,
  topics,
  tracking,
  related,
  comments,
  commentAmount,
  adminGuide,
  guideTracking
}
