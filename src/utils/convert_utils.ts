type Unit = 'B' | 'kB' | 'MB' | 'GB' | 'TB';

export class ConvertUtils {
  static convertToBytes(value: number, unit: Unit): number {
    const units: Unit[] = ['B', 'kB', 'MB', 'GB', 'TB'];
    const log = units.indexOf(unit);
    return value * Math.pow(1024, log);
  }

  static convertFromBytes(bytes: number): string {
    const units: Unit[] = ['B', 'kB', 'MB', 'GB', 'TB'];
    const log = Math.floor(Math.log(bytes) / Math.log(1024));
    const unit = units[log];
    const convertedValue = bytes / Math.pow(1024, log);
    return `${convertedValue.toFixed(2)} ${unit}`;
  }
}
