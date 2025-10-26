export const InfoLog = 'info';
export const ErrorLog = 'error';
export const DebugLog = 'debug';
export const WarningLog = 'warning';

type LogLevel = 'info' | 'debug' | 'warning' | 'error';

interface Log {
  service?: string;
  level?: LogLevel;
  timestamp?: string;
  path?: string;
  query?: string;
  method?: string;
  message?: string;
  extra?: string;
  useragent?: string;
  ip?: string;
  caller?: string;
  status?: number;
  latency?: number;
}

const ServiceName = 'price-estimator_backend-service';

export function log(args: Log) {
  let objs = args;
  if (!objs.level) {
    objs.level = InfoLog;
  }
  objs.service = ServiceName;
  if (!objs.timestamp) {
    objs.timestamp = new Date().toISOString();
  }

  console.error(JSON.stringify(objs));
}
