export class Alert {
  type: AlertType;
  message: string;
  staticAlertClosed: boolean;

  constructor() {
    this.staticAlertClosed = false;
  }

  toString() {
    return this.message;
  }

  getTypeString() {

    // return css class based on alert type
    switch (this.type) {
      case AlertType.success:
        return 'success';
      case AlertType.info:
        return 'info';
      case AlertType.warning:
        return 'warning';
        case AlertType.danger:
        return 'danger';
      case AlertType.primary:
        return 'primary';
      case AlertType.secondary:
        return 'secondary';
      case AlertType.light:
        return 'light';
      case AlertType.dark:
        return 'dark';
    }
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
