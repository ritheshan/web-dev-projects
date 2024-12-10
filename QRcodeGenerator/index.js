<<<<<<< HEAD
import inquirer from "inquirer"
import qr from "qr-image"
import fs from "fs"
inquirer
  .prompt([
    /* Pass your questions in here */
    {"message":"type in your url:" , "name":"url"}

  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
    const url=answers.url;
    
var qr_png = qr.image('url');
qr_png.pipe(fs.createWriteStream('qr.pngf'));
fs.writeFile('url.txt', url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  

/* 

1. Use the inquirer npm package to get user input.

=======
/* 
1. Use the inquirer npm package to get user input.
>>>>>>> 687e76da50d56d87aec9d4d44fc461aca8505fc8
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/