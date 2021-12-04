import { trigger, transition, style, animate } from "@angular/animations";

export const DIALOG_ENTER_LEAVE_ANIMATION_DURATION = 250;
export const DIALOG_ENTER_LEAVE_ANIMATION = trigger('dialogEnterLeaveAnimation', [
  transition(':enter', [
    style({
      transform: 'translateY(-50px)',
      opacity: 0,
    }),
    animate(`${DIALOG_ENTER_LEAVE_ANIMATION_DURATION}ms ease-out`, style({
      transform: 'translateY(0)',
      opacity: 1,
    })),
  ]),
  transition(':leave', [
    animate(`${DIALOG_ENTER_LEAVE_ANIMATION_DURATION}ms ease-in`, style({
      transform: 'translateY(-50px)',
      opacity: 0,
    })),
  ]),
]);
