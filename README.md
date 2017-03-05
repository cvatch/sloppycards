# SloppyCards
Sloppy Cards is an open-source drinking game managed and hosted using free services (Google Docs & Github Pages)

## Update data
Sloppy Cards runs completely on free services in the cloud (Github pages & Google Docs). It could be setup to automatically update a local cache from google-docs but as Github-Pages only allows front-end code we are using a manual process.

1. Goto https://cvatch.github.io/sloppycards/data.html the loading process is very intensive because of the size of the data-set so be patient. 
2. Once loaded copy the data and update 'https://github.com/cvatch/sloppycards/blob/master/data/cards.json' with your new data.
3. Now you must move your changes from the master branch to the gh-pages branch. You can do this by going to https://github.com/cvatch/sloppycards/pulls and creating a new pull request.
4. Accept the pull request and the project will be updated with the new data.
