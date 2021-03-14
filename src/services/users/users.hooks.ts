import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import setFullName from '../../hooks/set-full-name';
import notifyNewAgent from '../../hooks/notify-new-agent';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), setFullName() ],
    update: [ hashPassword('password'),  authenticate('jwt'), setFullName() ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      setFullName(),
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'resetToken')
    ],
    find: [],
    get: [],
    create: [notifyNewAgent()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
