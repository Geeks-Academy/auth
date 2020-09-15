import { Connection } from 'mongoose';

export interface IResult {
  database: {
    isConnected: boolean;
    status: number;
    message: string;
  };
  service: {
    isReady: boolean;
    status: number;
    message: string;
  };
}

export default class HealthCheckController {
  constructor(private connection: Connection) {}

  public getServiceStatus(): IResult {
    return {
      database: {
        isConnected: this.isConnected(),
        status: this.connection.readyState,
        message: this.databaseStatusMessage(),
      },
      service: {
        isReady: this.isConnected(),
        status: this.isConnected() ? 1 : 0,
        message: this.serviceStatusMessage(),
      },
    };
  }

  private serviceStatusMessage(): string {
    switch (this.connection.readyState) {
      case 0:
      case 2:
      case 3:
        return 'Not ready yet!';

      case 1:
        return 'Ready!';

      default:
        return 'Unknow service status!';
    }
  }

  private databaseStatusMessage(): string {
    switch (this.connection.readyState) {
      case 0:
        return 'Diconnected from database';

      case 1:
        return 'Connected to database';

      case 2:
        return 'Connecting to database...';

      case 3:
        return ' Disconecting from database...';

      default:
        return 'Unknown database connection state!';
    }
  }

  private isConnected() {
    return this.connection.readyState === 1;
  }
}
