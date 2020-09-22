import express from 'express'

export const routes = (app: express.Application): void => {
  app.use('/health', require('./health'));
}