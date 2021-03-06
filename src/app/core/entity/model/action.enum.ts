/**
 * Enum containing actions
 */
export enum Action {

  NONE,

  ADD,
  UPDATE,
  CONTINUE,
  CANCEL,
  DELETE,
  COMPLETE,
  REOPEN,
  SEND_MAIL_MEETING_MINUTES,
  SEND_MAIL_DAILY_SCRUM_SUMMARY,

  OPEN_DIALOG_ADD,
  OPEN_DIALOG_UPDATE,
  OPEN_DIALOG_CONTINUE,
  OPEN_DIALOG_CREATION_TIME,
  OPEN_DIALOG_REMOVE_UNUSED,

  FILTER_SINGLE,
  FILTER_LIST,

  FULLSCREEN,
  POMODORO_START
}
