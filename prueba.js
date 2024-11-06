const xlsx = require('xlsx');
const path = require('path');
const testObject = [{
    "question": "What is the purpose of the ViewChild decorator in this component class?",
    "codeExamples": [
      "ts\n@Component({\n    ...\n    template: '<p #bio></p>'\n})\nexport class UserDetailsComponent {\n    @ViewChild('bio') bio;\n}\n"
    ],
    "answersOptions": [
      {
        "answer": "It indicates that the `<p>` tag is rendered as a child of the parent view that uses this component.",
        "isCorrect": false
      },
      {
        "answer": "It makes the `<p>` tag in the template support content projection.",
        "isCorrect": false
      },
      {
        "answer": "It makes the `<p>` tag visible in the final render. If the #bio was used in the template and the @ViewChild was not used in the class, then Angular would automatically hide the `<p>` tag that has #bio on it.",
        "isCorrect": false
      },
      {
        "answer": "It provides access from within the component class to the ElementRef object for the `<p>` tag that has the bio template reference variable in the component's template view.",
        "isCorrect": true
      }
    ],
    "urlFont": "https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/refs/heads/main/angular/angular-quiz.md"
  }];

const filePath = "./resources/kahoot-template.xlsx"
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets["Sheet1"];
// console.log("🚀 ~ worksheet:", typeof(worksheet))
worksheet["B10"] = { v: testObject[0].urlFont, t: "s" };

xlsx.writeFile(workbook, filePath)



console.log(`Archivo Excel guardado correctamente en ${filePath}`);

// worksheet['A1'] = { v: 'Hello', t: 's'}
// console.log("🚀 ~ workbook.Sheets:", workbook.Sheets);
// XLSX.writeFile(workbook, 'output.xlsx')
