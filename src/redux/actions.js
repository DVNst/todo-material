import {
  ActionType as ActionTypeTasks,
  ActionCreator as ActionCreatorTasks,
} from './actions/Tasks';

import {
  ActionType as ActionTypeCompletedAll,
  ActionCreator as ActionCreatorCompletedAll,
} from './actions/CompletedAll';

import {
  ActionType as ActionTypeFilterTab,
  ActionCreator as ActionCreatorFilterTab,
} from './actions/FilterTab';

import {
  ActionType as ActionTypeLoading,
  ActionCreator as ActionCreatorLoading,
} from './actions/loading';

const ActionType = {
  ...ActionTypeTasks,
  ...ActionTypeCompletedAll,
  ...ActionTypeFilterTab,
  ...ActionTypeLoading,
};
const ActionCreator = {
  ...ActionCreatorTasks,
  ...ActionCreatorCompletedAll,
  ...ActionCreatorFilterTab,
  ...ActionCreatorLoading,
};

export { ActionType, ActionCreator };
