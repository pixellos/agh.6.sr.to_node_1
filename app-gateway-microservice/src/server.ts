const path = require('path');
const gateway = require('express-gateway');
import * as ai from 'applicationinsights';

ai.setup()
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(ai.DistributedTracingModes.AI)
    .start();
  

gateway()
  .load(path.join(__dirname, 'config'))
  .run();