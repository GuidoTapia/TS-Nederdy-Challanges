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
/* dictionary of dictionarys for the summarys, i use a counter for  */
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
  /*we iterate over all the readings, if there isn't a valid entry for a key, it creates it
  each read updates the values if it is necesary
  
  i used for of instead of reduce because its faster as far as I have been able to research
  and 1 loop does less comparations than 3*/
  for (const read of readings) {
    const readTimeToString: string = read.time.toString()
    if (temperatures[read.city] == undefined) {
      temperatures[read.city] = {}
    }
    if (temperatures[read.city][readTimeToString] == undefined) {
      temperatures[read.city][readTimeToString] = {
        summary: {
          first: read.temperature, // if the key doesn't had an assigned value then it's the first measure
          last: read.temperature,
          high: read.temperature,
          low: read.temperature,
          average: read.temperature,
        },
        count: 1,
      }
    } else {
      const tempAux: TemperatureSummary =
        temperatures[read.city][readTimeToString].summary
      //each measure would be the last if there is no other new
      tempAux.last = read.temperature
      //we update the higher measure if it's necesary
      if (tempAux.high < read.temperature) tempAux.high = read.temperature
      //we update the lower measure if it's necesary
      else if (tempAux.low > read.temperature) tempAux.low = read.temperature
      //we add up all the values for the average
      tempAux.average += read.temperature
      //we count the values for the average
      temperatures[read.city][readTimeToString].count++
    }
  }
  //we update the average knowing the sum of all measures of a day and the count of these
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
