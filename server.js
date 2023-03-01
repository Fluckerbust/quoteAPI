const express = require('express');
const { request } = require('http');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));






app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`);
})

app.get('/api/quotes/random', (req, res, next) => {
    const fetchRandom = getRandomElement(quotes);
    res.send({quote: fetchRandom});
    
})

app.get(`/api/quotes`,(req,res,next)=>{
    
    const authorName = req.query.person
    //const authorName = req.params.author


    
    if(authorName){
        const authorArray = quotes.filter((quotes)=>{
            return quotes.person === authorName; })   
      res.send({quotes: authorArray});
    } else {
      res.send({quotes:quotes});
    } 
  });


app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote
    const person = req.query.person
    const newQuoteAdd = {quote:quote, person:person}
    function pushQuote (quoteText, attribution)  {
        quotes.push({quote:quoteText, person:attribution});
    }
    
    if(quote && person){
        console.log(quote)
    console.log(person)
    console.log(quote, person)
        pushQuote({quote, person});
        res.status(201).send({quote:quote, person:person});
    } else {
        res.status(400).send("There was an error processing the request. Please try again.")
    }
});

