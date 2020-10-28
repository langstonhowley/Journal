# Journal

> By Langston Howley

A short coding project working with [Express JS](https://www.npmjs.com/package/express) and [Mongo DB](https://www.npmjs.com/package/mongodb). This REST API allows for users to send a "journal entry" (long bit of text) to a database (or Journal) to be retrieved later.

There is currently no frontend and I'm highly doubting making one so I use [cURL](https://curl.haxx.se/) commands to request the endpoints.

## Routes

- /entry
  
  With a multipart/form-data POST request a journal entry can be sent by:

  - /file
    - Sends the text within the file
  - /text
    - Sends the raw text input

### Example Entry

```bash
#Sending text to the journal
curl -F text="Hello World" --url http://localhost:3000/entry/text

#Sending a file to the journal
curl -F file=@path/to/local/file.txt --url http://localhost:3000/entry/file
```
