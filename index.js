// Your code here

function createEmployeeRecord(newArray) {
    let newEmployee = {
        firstName: newArray[0],
        familyName: newArray[1],
        title: newArray[2],
        payPerHour: newArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(employeeRecords) {
    const result = []
    for (const employee of employeeRecords) {
        result.push(createEmployeeRecord(employee))
    }
    return result
}

const createTimeInEvent = (record,timeStamp) => {
    
    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

const createTimeOutEvent = (record,timeStamp) => {
    
    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj)
    return record
}

const hoursWorkedOnDate = (record, date) => {
    return (record.timeOutEvents[0].hour - record.timeInEvents[0].hour) / 100
}


const wagesEarnedOnDate = (record, date) => {
    let pay = 0
    const hours = hoursWorkedOnDate(record, date)
    pay += hours * record.payPerHour
    return pay
}

const allWagesFor = (record) => {
    let pay = 0

    for (let i = 0; i < record.timeInEvents.length; i++){
        let payday = wagesEarnedOnDate(record, record.timeInEvents[i])
        pay += payday
    }
    return pay
}








// function createTimeInEvent(employee, date){
//     let dateObj = date.split(" ")
//     let updatedEmployee = employee
//     let newObj = {
//         type: "TimeIn",
//         hour: parseInt(dateObj[1]),
//         date: dateObj[0]
//     }
//     updatedEmployee.timeInEvents[0] = newObj
//     return updatedEmployee
// }

// function createTimeOutEvent(employee, date){
//     let dateObj = date.split(" ")
//     let updatedEmployee = employee
//     let newObj = {
//         type: "TimeOut",
//         hour: parseInt(dateObj[1]),
//         date: dateObj[0]
//     }
//     updatedEmployee.timeOutEvents[0] = newObj
//     return updatedEmployee
// }

// function hoursWorkedOnDate(obj, date){
//     let timeIn = obj.timeInEvents.filter(el => (el.date === date))
//     let timeOut = obj.timeOutEvents.filter(el => (el.date === date))

//     for (let i = 0; i < timeIn.length; i++){
//         return (timeOut[i].hour - timeIn[i].hour)/100
//     }
// }

// function wagesEarnedOnDate(obj, date){
//     return hoursWorkedOnDate(obj, date) * obj.payPerHour
// }

// function allWagesFor(obj){
//     let dateArr = []
//     let dates = obj.timeInEvents.filter(el => el.date)
//     for (const el of dates){
//         dateArr.push(wagesEarnedOnDate(obj, el.date))
//     }

//     return dateArr.reduce((acc, next) => acc + next)
//     // let newDate = eObj.timeOutEvents[0].date
//     // let wages = wagesEarnedOnDate(eObj, newDate)
//     // let total = wages * 7
//     // return total
// }

// function calculatePayRoll(arr){
   
//     let employeeArr = []
//     for(const obj of arr) {
//         employeeArr.push(allWagesFor(obj))
//     }
//     return employeeArr.reduce((acc,next) => acc + next)

// }