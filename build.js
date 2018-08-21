const fs = require('fs');
const convert = require('xml-js');

const contents = fs.readFileSync('./source/kotus-sanalista_v1.xml', 'utf8');

const resultJSON = convert.xml2json(contents, { compact: true, spaces: 2 });

const distFolder = './dist';
const fileName = 'finnish-words';

if (!fs.existsSync('./dist')){
  fs.mkdirSync('./dist');
}

function saveFile(fileExtension, data) {
  fs.writeFile(`${distFolder}/${fileName}.${fileExtension}`, data, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(`The ${fileExtension} file was saved!`);
  });
}

saveFile('js', `export default ${resultJSON}`);
saveFile('json', resultJSON);

