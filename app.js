const inquirer = require('inquirer');

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(user, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!')
// });

const promptUser = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'user',
        message: 'What is your name? (Required)',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your name!')
                return false;
            }
        }
    }, {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username (Required)',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your GitHub username!')
                return false;
            }
        }
    }, {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About Me" section?',
        default: true
    }, {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    }]);
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter your project name!')
                    return false;
                }
            }
        }, {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project. (Required)',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter the project description!')
                    return false;
                }
            }
        }, {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        }, {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link!')
                    return false;
                }
            }
        }, {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        }, {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });