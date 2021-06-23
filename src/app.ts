// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}

interface IndexedSumary {
  [city: string]: {
    [time: string]: {
      summary: TemperatureSummary
      count: number
    }
  }
}
const temperatures: IndexedSumary = {}

export function processReadings(readings: TemperatureReading[]): void {
  //add here your code
  for (const read of readings) {
    if (temperatures[read.city] == undefined) {
      temperatures[read.city] = {}
    }
    if (temperatures[read.city][read.time.toString()] == undefined) {
      temperatures[read.city][read.time.toString()] = {
        summary: {
          first: read.temperature,
          last: read.temperature,
          high: read.temperature,
          low: read.temperature,
          average: read.temperature,
        },
        count: 1,
      }
    } else {
      temperatures[read.city][read.time.toString()].summary.last =
        read.temperature
      if (
        temperatures[read.city][read.time.toString()].summary.high <
        read.temperature
      )
        temperatures[read.city][read.time.toString()].summary.high =
          read.temperature
      if (
        temperatures[read.city][read.time.toString()].summary.low >
        read.temperature
      )
        temperatures[read.city][read.time.toString()].summary.low =
          read.temperature
      temperatures[read.city][read.time.toString()].summary.average +=
        read.temperature
      temperatures[read.city][read.time.toString()].count++
    }
  }
  for (const keyCity in temperatures) {
    for (const keyTime in temperatures[keyCity]) {
      temperatures[keyCity][keyTime].summary.average /=
        temperatures[keyCity][keyTime].count
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  if (temperatures[city] == undefined) {
    return null
  }
  if (temperatures[city][date.toString()] == undefined) {
    return null
  }
  return temperatures[city][date.toString()].summary
}
