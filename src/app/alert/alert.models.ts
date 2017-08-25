export class Alert {
  type: string;
  message: string;
  staticAlertClosed: boolean;

  constructor() {
    this.staticAlertClosed = false;
  }

  toString() {
    return this.message;
  }

}

export enum AlertType {
  success,
  info,
  warning,
  danger,
  primary,
  secondary,
  light,
  dark,
}
