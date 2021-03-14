import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import addTotalPrice from '../../hooks/add-total-price';
import decimalsToNumbers from '../../hooks/decimals-to-numbers';
import adjustStocks from '../../hooks/adjust-stocks';
import checkStocks from '../../hooks/check-stocks';
// Don't remove this comment. It's needed to format import lines nicely.

const { protect } = local.hooks;

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [addTotalPrice(), checkStocks()],
    update: [addTotalPrice(), checkStocks()],
    patch: [addTotalPrice(), checkStocks()],
    remove: []
  },

  after: {
    all: [protect('password')],
    find: [decimalsToNumbers()],
    get: [decimalsToNumbers()],
    create: [adjustStocks()],
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
