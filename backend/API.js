const fs = require('fs')

exports.createAccount = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data = JSON.parse(data)
        const account = {
            Username : data.Username,
            email : data.email,
            birthday: data.birthday,
            password: data.password,
            confirmPassword: data.confirmPassword
        }
console.log(data)
        // Authentication
        if(!account.Username || !account.email  || !account.birthday  || !account.password || !account.confirmPassword){
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'fill in the empty field2'}))
        }
        
        fs.readFile('account.json', 'utf8', (err, acc) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({error: 'internal server error'}))
            }
            if(!acc){
                res.writeHead(500, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'undefined'}))
            }
            
            const parsedAccount = JSON.parse(acc.toString())
            parsedAccount.push(account)

            fs.writeFile('account.json', JSON.stringify(parsedAccount), err => {
                if(err){
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({message : 'Could not write file'}))
                }
                res.writeHead(200, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({
                    message: "form submitted successfully",
                    account: account.Username
                }))
            })
        })
    })  
       
}