var db = require('./msdb');

var express = require('express');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket){
    //登录
    socket.on('login',function(player){
        let strSql = "select name,maxC,value from player,password "
                    + "where player.id = password.id and player.name = '" + player.name + "'";
        let loginResult = null;
        db.sql(strSql,function(err,result){
            if (err) {
                console.log(err);
                return;
            }
            else if(result.recordset.length > 0)
            {
                if(player.password === result.recordset[0].value.trim())
                {
                    loginResult = {'name':result.recordset[0].name.trim(), 'maxC':result.recordset[0].maxC};
                }
            }
            db.close(); 
            socket.emit('loginResult',loginResult);
        });
    });

    //注册
    socket.on('signin',function(player){
        //查询账号是否已存在
        let strSql = "select id from player where player.name = '" + player.name + "'";
        let signResult = false;
        db.sql(strSql,function(err,result){
            if (err) {
                console.log(err);
                socket.emit('signinResult',signResult);
                return;
            }
            else if(result.recordset.length > 0)
            {
                socket.emit('signinResult',signResult);
                return;
            }
            db.close();
            //插入player表
            let strSql2 = "INSERT INTO player (name) VALUES ('" + player.name + "')"
            db.sql(strSql2,function(err,result){
                if (err) {
                    console.log(err);
                    socket.emit('signinResult',signResult);
                    return;
                }
                db.close();
                //查询用户id
                db.sql(strSql,function(err,result){
                    if (err) {
                        console.log(err);
                        socket.emit('signinResult',signResult);
                        return;
                    }
                    else if(result.recordset.length === 0)
                    {
                        socket.emit('signinResult',signResult);
                        return;
                    }
                    let id = result.recordset[0].id;
                    db.close();
                    //插入password表
                    let strSql3 = "INSERT INTO password (id,value)"
                                    + " VALUES ('" + id + "','" + player.password +"')"
                    db.sql(strSql3,function(err,result){
                        if (err) {
                            console.log(err);
                            socket.emit('signinResult',signResult);
                            return;
                        }
                        signResult = true;
                        socket.emit('signinResult',signResult);
                        db.close();
                    });
                });
            });
        });
    });

    //更新分数
    socket.on('push',function(data){
        //查询id
        let strSql = "select id from player where player.name = '" + data.name + "'";
        db.sql(strSql,function(err,result){
            let id = null;
            if (err) {
                console.log(err);
                return;
            }
            db.close();
            if(result.recordset.length > 0)
            {
                id = result.recordset[0].id;
            }
            else{
                return;
            }
            //查询分数
            let strSql2 = "select score from score where id = " + id + " and chapterNum = " + data.num;
            db.sql(strSql2,function(err,result){
                if(err){
                    console.log(err);
                    return;
                }
                db.close();
                //已存在评分
                if(result.recordset.length > 0)
                {
                    let score = result.recordset[0].score;
                    if(data.score > score)
                    {
                        let strSql3 = "UPDATE score SET score = " + data.score
                                        + " WHERE id = " + id + " and chapterNum = " + data.num; 
                        db.sql(strSql3,function(err,result){
                            if(err){
                                console.log(err);
                                return;
                            }
                            db.close();
                        });
                    }
                }
                else{       //第一次评分
                    let strSql4 = "INSERT INTO score (id,chapterNum,score)"
                                    + " VALUES (" + id + "," + data.num + "," + data.score + ")";
                    db.sql(strSql4,function(err,result){
                        if(err){
                            console.log(err);
                            return;
                        }
                        db.close();
                    });    
                } 
            })
        });
    });

    //排行榜
    socket.on('rank',function(num){
        let strSql = "select top (20) * from player,score"
                    + " where player.id = score.id and score.chapterNum = " + num + " order by score desc";
        let rankResult = [];
        db.sql(strSql,function(err,result){
            if (err) {
                console.log(err);
                return;
            }
            for(let i=0;i<result.recordset.length;++i)
            {
                rankResult.push({'name':result.recordset[i].name, 'score':result.recordset[i].score});
            }
            db.close(); 
            socket.emit('rankResult',rankResult);
        });
    });

    //更新最大通关关卡
    socket.on('updateC',function(data){
        let strSql = "UPDATE player SET maxC = " + data.num
                        + " WHERE name = '" + data.name + "'";
        db.sql(strSql,function(err,result){
            if(err){
                console.log(err);
                return;
            }
            db.close();
        });
    });
});

http.listen(3000,function(){
    console.log('listen on :3000');
});
