import requests
from bs4 import BeautifulSoup

def scrap_latest_hook():
    try:
        response = requests.get("https://usehooks.com/")
        soup = BeautifulSoup(response.content)
        latest_hook = scrap_single_hook(soup.find('h2'))
        write_hooks_to_file([latest_hook])
        return 'OK'
    except Exception as err:
        return err
    
def scrap_all_hooks():
    try:
        hooks = []
        response = requests.get("https://usehooks.com/")
        soup = BeautifulSoup(response.content)
        for h2 in soup.find_all('h2'):
            hooks.append(scrap_single_hook(h2))
        write_hooks_to_file(hooks)
        return 'OK'
    except Exception as err:
        return err
    
def scrap_single_hook(title):
    return [title.text, title.find_next('div').text, title.find_next('code').text]

def write_hooks_to_file(hooks):
    for hook in hooks:
        fh = open('./src/hooks/{}.js'.format(hook[0]), "w")
        fh.write(prettify_comment(hook[1]))
        fh.write("import React from 'react';\n")
        fh.write(hook[2])
        fh.close()

def prettify_comment(comment):
    comment = '/*' + comment
    for char_index in range(100, len(comment), 100):
        latest_blank_index = comment[:char_index].rfind(' ')
        comment = comment[:latest_blank_index] + '\n' + comment[latest_blank_index:]
    comment = comment + '*/\n\n'
    return comment
    
print(scrap_all_hooks())
