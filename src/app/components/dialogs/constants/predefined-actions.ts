import { DialogAction } from "../models/dialog-actions";

export const PREDEFINED_ACTIONS = {
  yesNo: [
    { label: 'نعم', key: 'yes' },
    { label: 'لا', key: 'no', color: 'primary', shape: 'outline' },
  ] as DialogAction[],
  okCancel: [
    { label: 'حسنا', key: 'ok' },
    { label: 'إلغاء', key: 'cancel', focused: true },
  ] as DialogAction[],
  ok: [{ label: 'حسنا', key: 'ok' }] as DialogAction[],
  close: [{ label: 'إغلاق', key: 'close', shape: 'outline', focused: true }] as DialogAction[],
  confirm: [
    { label: 'تأكيد', key: 'confirm', color: 'danger' },
    { label: 'إلغاء', key: 'cancel' },
  ] as DialogAction[],
};
