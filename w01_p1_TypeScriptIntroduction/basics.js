"use strict";
// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
// Primitives
let age;
age = 12;
let userName;
userName = "Max";
let isInstructor;
isInstructor = true;
// More complex types
let hobbies;
hobbies = ["Sports", "Cooking"];
let person;
person = {
    name: "Max",
    age: 32,
};
// person = {
//   isEmployee: true
// };
let people;
// Type inference
let course = "React - The Complete Guide";
course = 12341;
// Functions & types
function addNumbers(a, b) {
    return a + b;
}
function printOutput(value) {
    console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
    const newArray = [value, ...array];
    return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");
// updatedArray[0].split('');
class Student {
    // firstName: string;
    // lastName: string;
    // age: number;
    // private courses: string[];
    constructor(firstName, lastName, age, courses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.courses = courses;
    }
    enrol(courseName) {
        this.courses.push(courseName);
    }
    listCourses() {
        return this.courses.slice();
    }
}
const student = new Student("Max", "Schwarz", 32, ["Angular"]);
student.enrol("React");
let max;
max = {
    firstName: "Max",
    age: 32,
    greet() {
        console.log("Hello!");
    },
};
class Instructor {
    constructor(firstName, age) {
        this.firstName = firstName;
        this.age = age;
    }
    greet() {
        console.log(`Hello ${this.firstName}, you are ${age < 25 ? "a baby" : "an old person"}.`);
    }
}
