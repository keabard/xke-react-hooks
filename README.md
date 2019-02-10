*File tree explanation

The project comes from a classic create-react-app boilerplate. There is a scraping script (./import-hooks.py) written in Python that will scrap the hooks code present on http://usehooks.com. All the hooks scraped from this site are stored in ./src/hooks. Each hook has it own file.

There are a few examples in ./src/examples. The main sandbox environment is in ./src/App.js, where you can wire all the different hooks available in ./src/hooks.

Enjoy !

*HOW TO

** Hooks envionment

npm install
npm start

** Hooks scraping from http://usehooks.com

pip install -r requirements.txt
python import-hooks.py
/!\ WARNING: It will replace all files that are in src/hooks /!\