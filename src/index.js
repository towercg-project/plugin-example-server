import * as TowerCGServer from '@towercg/server';

import { pluginReducer } from './reducer';

export class ExamplePlugin extends TowerCGServer.ServerPlugin {
  static pluginName = "example";
  static reducer = pluginReducer;
  static defaultConfig = { tickRate: 1000 };

  initialize() {
    const tickRate = this.pluginConfig.tickRate;

    this.logger.info(`Initializing with a ${tickRate}ms tickrate.`);

    setInterval(() => {
      this.dispatch({ type: "example.incrementTicks" });
    }, tickRate)

    this.on("stateChanged", (event) => {
      const {oldState, newState} = event;
      this.logger.debug(`Tick: ${oldState.ticks} to ${newState.ticks}.`);
    });

    this.registerCommand("ping", (data) => ({ pong: true }));
  }
}
