const next = require('next'),
 dev = process.env.NODE_ENV !== 'production',
    nextApp = next({ dev });

export const nextSetUpConfig = async () => { 
    return new Promise((resolve,reject) => nextApp.prepare().then((...params) => {
        resolve({ nextSetUpConfig: true, nextApp: nextApp });
    }))
};
export const handle = nextApp.getRequestHandler();
