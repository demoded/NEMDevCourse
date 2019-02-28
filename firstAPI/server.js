var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id":"0001",
        "text":"Eggs"
    },
    {
        "id":"0002",
        "text":"Milk"
    },
    {
        "id":"0003",
        "text":"Bacon"
    },
    {
        "id":"0004",
        "text":"Chocolate"
    },
];

app.get('/ingredients', function(req, res) {
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
    var ingredient = req.body;
    if (!ingredient || ingredient.text == "") {
        res.status(500).send({error: "Your ingredient must have text."});
    } else {
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
})

app.put("/ingredients/:ingredientId", function(req, res) {
    var ingredientId = req.params.ingredientId;
    var newText = req.body.text;
    
    if (!newText || newText === "") {
        res.status(500).send({error:"You must provide ingredient text."});
    } else {
        var objectFound = false;
        for(var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            if (ing.id === req.params.ingredientId) {
                ingredients[x].text = newText;
                objectFound = true;
                break;
            }
        }
        
        if (!objectFound) {
            res.status(500).send({error:"Ingredient not found."})
        } else {
            res.send(ingredients);   
        }
    }
})

app.delete("/ingredients/:ingredientId", function(req, res) {
    var ingredientId = req.params.ingredientId;
    
    if (!ingredientId || ingredientId === "") {
        rew.status(500).send({error:"You must provide ingredient ID. "});
    } else {
        for(var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            if (ing.id === req.params.ingredientId) {
                ingredients.splice(x, 1);
            }
        }
        
        res.send(ingredients);
    }
})

app.get('/foo', function(req, res) {
    res.send('foo function');
});

app.listen(3000, function() {
    console.log('First API running on port 3000');
});