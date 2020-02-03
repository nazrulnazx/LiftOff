const express = require('express');
const app     = express();
const axios   = require('axios');

const getData = async (url,userName) =>{
    try{
        const response = await axios.get(url,{
                params: {
                    cursor: -1,
                    skip_status:"true",
                    include_user_entities:"false",
                    screen_name:userName
                },
                headers: {
                    Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAOIECQEAAAAAyleS3XsdkH%2BZejdWzqenumInWd4%3DRlkl9xdE1wcWhO1UzHZWXwxMJw7DRJjMQyJMnzlTayqUgHIEn3",
                    Accept: "*/*",
                }

              });
            // return response.data.users.map(function(item) { return {id:item.id,name:item.name} });
             let newData = {};
             for(let x in response.data.users){
                newData[response.data.users[x].id] = response.data.users[x].name;
             }
             return newData;
    }catch(error){
        console.log(error);
    }
}



async function  getUser(name1,name2){
    const url = "https://api.twitter.com/1.1/friends/list.json";
    let userOne = await getData(url,name1);
    let userTwo = await getData(url,name2);
    let data = {};
    let common = [];
    for(let x in userOne){
        data[x] = (typeof data[x] == "undefined")?data[x] = 1:++data[x];
    }

    for(let x in userTwo){
        data[x] = (typeof data[x] == "undefined")?data[x] = 1:++data[x];
    }

    for(let x in data){
        if(data[x]==2){
            common.push(userTwo[x]);
        }
    }
    console.log(common);
    return common;
}


app.get('/',(req,res,next)=>{

    res.send(`
        <form action="/get/common">
        user one:
        <input name="user_one" placeholder="nazrul_nazx"><br>
        user two:
        <input name="user_two" placeholder="chandan37791131"><br>
        <button type="submit">check</button>
    
        </form>
    `);

});

app.get('/get/common',(req,res,next)=>{
    getUser(req.query.user_one,req.query.user_two).then(x=>{
        res.json({
            commonUsers : x
        });
    });
});

app.listen(process.env.PORT,()=>{
console.log('listining at port 3000');
});


