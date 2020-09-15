import HealthCheckController from '../controllers/HealthCheckController';
import mongoose from 'mongoose';

jest.mock('mongoose');
const connection: mongoose.Connection = new mongoose.Connection(mongoose);

describe('HealthCheckController', () => {
  it.each`
    status | expected | readyString    | dbStateString
    ${0}   | ${false} | ${'not ready'} | ${'diconnected from'}
    ${1}   | ${true}  | ${'ready'}     | ${'connected to'}
    ${2}   | ${false} | ${'not ready'} | ${'connecting to'}
    ${3}   | ${false} | ${'not ready'} | ${'diconnecting from'}
  `('is $readyString when $dbStateString DB', ({ status, expected }) => {
    connection.readyState = status;
    const healthCheckController: HealthCheckController = new HealthCheckController(
      connection,
    );

    const result = healthCheckController.getServiceStatus();

    expect(result.service.isReady).toBe(expected);
  });

  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ])(
    `return database status (provided: %i) same as mongoose readyState (expected: %i)`,
    (provided, expected) => {
      connection.readyState = provided;
      const healthCheckController: HealthCheckController = new HealthCheckController(
        connection,
      );

      const result = healthCheckController.getServiceStatus();
      expect(result.database.status).toBe(expected);
    },
  );

  it.each`
    status | expected | readyString    | dbStateString
    ${0}   | ${0}     | ${'not ready'} | ${'diconnected from'}
    ${1}   | ${1}     | ${'ready'}     | ${'connected to'}
    ${2}   | ${0}     | ${'not ready'} | ${'connecting to'}
    ${3}   | ${0}     | ${'not ready'} | ${'diconnecting from'}
  `(
    'has $readyString (numeric value: $expected) status when $dbStateString DB',
    ({ status, expected }) => {
      connection.readyState = status;
      const healthCheckController: HealthCheckController = new HealthCheckController(
        connection,
      );

      const result = healthCheckController.getServiceStatus();

      expect(result.service.status).toBe(expected);
    },
  );

  it.each`
    status | changedTo | expected | readyString    | dbStateString      | newDBStateString
    ${0}   | ${1}      | ${true}  | ${'ready'}     | ${'diconnected'}   | ${'connected'}
    ${1}   | ${2}      | ${false} | ${'not ready'} | ${'connected'}     | ${'connecting'}
    ${2}   | ${3}      | ${false} | ${'not ready'} | ${'connecting'}    | ${'diconnecting'}
    ${3}   | ${0}      | ${false} | ${'not ready'} | ${'disconnecting'} | ${'diconnected'}
  `(
    'return $expected when DB connection state changed from $dbStateString to $newDBStateString',
    ({ status, changedTo, expected }) => {
      connection.readyState = status;
      const healthCheckController: HealthCheckController = new HealthCheckController(
        connection,
      );

      connection.readyState = changedTo;

      const result = healthCheckController.getServiceStatus();

      expect(result.service.isReady).toBe(expected);
    },
  );

  it.each`
    status | changedTo | expected | readyString    | dbStateString      | newDBStateString
    ${0}   | ${1}      | ${1}     | ${'ready'}     | ${'diconnected'}   | ${'connected'}
    ${1}   | ${2}      | ${2}     | ${'not ready'} | ${'connected'}     | ${'connecting'}
    ${2}   | ${3}      | ${3}     | ${'not ready'} | ${'connecting'}    | ${'diconnecting'}
    ${3}   | ${0}      | ${0}     | ${'not ready'} | ${'disconnecting'} | ${'diconnected'}
  `(
    'return $expected numeric DB connection state when it changed from $dbStateString (numeric: $status) to $newDBStateString (numeric: $changedTo)',
    ({ status, changedTo, expected }) => {
      connection.readyState = status;
      const healthCheckController: HealthCheckController = new HealthCheckController(
        connection,
      );

      connection.readyState = changedTo;

      const result = healthCheckController.getServiceStatus();

      expect(result.database.status).toBe(expected);
    },
  );
});
