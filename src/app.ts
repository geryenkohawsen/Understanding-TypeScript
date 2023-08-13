class Department {
  // name: string = 'DEFAULT'; // an initializer value is not mandatory
  // private id: string;
  // private name: string; // public keyword is the DEFAULT setting

  // private employees: string[] = [];
  protected employees: string[] = []; // protected is like private but allows any class that extends this class to access this property

  // a method that is executed when the object is initiated
  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  // Make sure to catch unwanted behavior in TS
  describe(this: Department) {
    console.log('Department: ' + this.id + this.name);
  }

  addEmployee(employee: string) {
    // this.id = 'changed id';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// when there's no dedicated constructor in the subclass,
// the constructor of the parent class will be use
class ITDepartment extends Department {
  public admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, 'IT Dep.'); // always call super first before using the [this] keyword
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting Dep.'); // always call super first before using the [this] keyword
    this.lastReport = reports[0];
  }

  // you can overwrite the methods of the base class
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment('d1', ['Max']);
it.addEmployee('Max');
it.addEmployee('Tom');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW IT DEP.';
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('d2', []);

accounting.mostRecentReport = 'Year End Report'; // for getter & setter, access it normally just like a property
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport); // for getter & setter, access it normally just like a property
accounting.printReports();

accounting.addEmployee('Max');
accounting.addEmployee('Max2');
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'Dummy', describe: accounting.describe };

// accountingCopy.describe();
