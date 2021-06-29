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
/* dictionary of dictionarys for the summarys, i use a nMeasures for know the quantity of measures 
per day and get the average per (City,Date) */
interface IndexedSumary {
  [city: string]: {
    [time: number]: {
      summary: TemperatureSummary
      nMeasures: number
      sumMeasures: number
    }
    histSummary: TemperatureSummary
    nMeasures: number
    sumMeasures: number
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
    if (temperatures[read.city] == undefined) {
      temperatures[read.city] = {
        histSummary: {
          first: read.temperature, // if the key doesn't had an assigned value then it's the first measure
          last: read.temperature,
          high: read.temperature,
          low: read.temperature,
          average: read.temperature,
        },
        nMeasures: 1,
        sumMeasures: read.temperature,
      }
    }
    if (temperatures[read.city][read.time.getTime()] == undefined) {
      temperatures[read.city][read.time.getTime()] = {
        summary: {
          first: read.temperature, // if the key doesn't had an assigned value then it's the first measure
          last: read.temperature,
          high: read.temperature,
          low: read.temperature,
          average: read.temperature,
        },
        nMeasures: 1,
        sumMeasures: read.temperature,
      }
    } else {
      // here inferes the type and there's no need for specify it
      const tempAux = temperatures[read.city][read.time.getTime()]
      //each measure would be the last if there is no other new
      tempAux.summary.last = read.temperature
      //we update the highest measure if it's necesary
      if (tempAux.summary.high < read.temperature)
        tempAux.summary.high = read.temperature
      //we update the lowest measure if it's necesary
      else if (tempAux.summary.low > read.temperature)
        tempAux.summary.low = read.temperature
      //we add up all the values (per City and Date) for the average
      tempAux.sumMeasures += read.temperature
      //we count the values (per City and Date) for the average
      tempAux.nMeasures++
      //we update the average with the new values of sum and n measures
      tempAux.summary.average = tempAux.sumMeasures / tempAux.nMeasures
    }
    //the same code but for the city historical
    const tempAux = temperatures[read.city]
    tempAux.histSummary.last = read.temperature
    if (tempAux.histSummary.high < read.temperature)
      tempAux.histSummary.high = read.temperature
    else if (tempAux.histSummary.low > read.temperature)
      tempAux.histSummary.low = read.temperature
    tempAux.sumMeasures += read.temperature
    tempAux.nMeasures++
    tempAux.histSummary.average = tempAux.sumMeasures / tempAux.nMeasures
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  return temperatures[city]?.[date.getTime()]?.summary ?? null
}

export function getHistoricalSummary(city: string): TemperatureSummary | null {
  //add here your code
  return temperatures[city]?.histSummary ?? null
}
