import {
  ActionType as ActionTypeTasks,
  ActionCreator as ActionCreatorTasks,
} from "./Tasks";

import {
  ActionType as ActionTypeCompletedAll,
  ActionCreator as ActionCreatorCompletedAll,
} from "./CompletedAll";

import {
  ActionType as ActionTypeFilterTab,
  ActionCreator as ActionCreatorFilterTab,
} from "./FilterTab";

const ActionType = {
  ...ActionTypeTasks,
  ...ActionTypeCompletedAll,
  ...ActionTypeFilterTab,
};
const ActionCreator = {
  ...ActionCreatorTasks,
  ...ActionCreatorCompletedAll,
  ...ActionCreatorFilterTab,
};

export { ActionType, ActionCreator };
