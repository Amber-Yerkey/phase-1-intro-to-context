// Your code here

function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array){
    const result = array.map(record => {
        return createEmployeeRecord(record)
    })
    return result
}

function createTimeInEvent(record, timestamp){
    const timeObj = {
        type: "TimeIn",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

function createTimeOutEvent(record, timestamp){
    const timeObj = {
        type: "TimeOut",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj)
    return record
}

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find(e => {
        return e.date === date
    })

    const timeOut = record.timeOutEvents.find(e => {
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    let pay = 0;
    for(let i = 0; i < record.timeInEvents.length; i++){
        let payDay = wagesEarnedOnDate(record, record.timeInEvents[i].date)
        pay += payDay
    }
    return pay
}

function calculatePayroll(arr){
    // return records.reduce(function(rec){
    //     return allWagesFor(rec)
    // }, 0)
    const totalPay = arr.reduce((acc, record) => {
        const totalPay = allWagesFor(record)
        return acc + totalPay
    }, 0)
    return totalPay
}
// function createTimeInEvent(date){
//     const newTimeObj = createTimeEvent(date, 'TimeIn')
//     this.timeInEvents.push(newTimeObj)
//     return this
// }

// function createTimeEvent(date, type) {
//     return {
//         type,
//         hour: parseInt(date.split(" ")[1]),
//         date: date.split(" ")[0]
//     }
// }