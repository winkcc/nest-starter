'use strict';
module.exports = {
  starter: {
    globalModule: {
      typeorm: {
        url: 'mysql://root:Wink20010713@43.142.84.120:3306/starter',
        synchronize: true,
        type: 'mysql',
        logging: true,
      },
    },
  },
};
