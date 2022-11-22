## STEPS:

copy your postman collection file to this project's root

add your file path in this line in index.js file
const data = Buffer.from(fs.readFileSync("./sample-collection.json")).toString()

run these commands:

npm install
npm run dev

access the root of project in chrome with http://localhost:5000/

check the root of folder. your code was generated in the folder named after your collection

### Optional Params
1) baseUrlVar       //for base url variable name
2) tokenVar         //for token variable name
3) selectedMethods  //for generating query hooks for only selected method requests

### Sample URL with all optional params
http://localhost:5000/?baseUrlVar=https://google.com&tokenVar=TOKEN&selectedMethods=get