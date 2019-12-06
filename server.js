var PORT = process.env.PORT || 4000;
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var faker = require('faker');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
// const Client=require('@influxdata/influx');
// // You can generate a Token from the "Tokens Tab" in the UI
// const client = new Client.Client('http://localhost:9999', 'FkiBRiN7cQRJWL6FEyMZj3484nRk88pfPCn-Bd5ZCkDxGS1vBPljOGypKuPkVElGYRsPooUH81mbApKJNFMfmQ==')
// const data = 'mem,host=host1 used_percent=23.43234543 1556896326'
// console.log(typeof(data));



// const res=client.write.create('xyz','FkiBRiN7cQRJWL6FEyMZj3484nRk88pfPCn-Bd5ZCkDxGS1vBPljOGypKuPkVElGYRsPooUH81mbApKJNFMfmQ==',data);
// console.log(res);

// const response = client.write.create('03b5fa5fb17f5e4f', 'bucketID', data)
const appmetrics = require('appmetrics');
const monitoring = appmetrics.monitor();
monitoring.on('cpu', (cpu) => {
  var lat=faker.address.latitude();
   var long=faker.address.longitude()
  const postData = `cpu_percentage,host=AmazonBay process=${cpu.process},latitude=${lat},longitude=${long},system=${cpu.system} ${cpu.time}`;
 console.log(postData);
  const options = {
    port: 8186,
    path: '/write?precision=ms',
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
});

  
// const Influx = require('influx');
// const influx = new Influx.InfluxDB({
//  host: 'localhost',
//  database: 'sample',
//  schema: [
//    {
//      measurement: 'cpu percentage',
//      fields: {
//        path: Influx.FieldType.STRING,
//        duration: Influx.FieldType.INTEGER
//      },
//      tags: [
//        'host'
//      ]
//    }
//  ]
// })
    
// influx.getDatabaseNames()
//   .then(names => {
    
//       console.log(names);
//     }
//   )

 
 



//with mysql--x--
//   .catch(error => console.log({ error }));
//   var lat=faker.address.latitude();
//     var long=faker.address.longitude()
//     console.log(lat,long)
 

// const query = 'from(bucket: "demo") |> range(start: -1h)'
// const {promise} = client.queries.execute('03b5fa5fb17f5e4f', query)
// const csv =  promise;
// console.log(csv);

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'demo',
//     password:'aspire'
//   });

// function intervalFunc() {
//     var array=["ranjit","kowsi","arjun","varun"];
//     for(let i=0;i<array.length;i++)
//     {

//   connection.query(
//     'SELECT deviceID FROM `userdetails` where username=?',[array[i]],
//     function(err, results, fields) {
//       //console.log(results[0].deviceID); 
//       var lat=faker.address.latitude();
//     var lon=faker.address.longitude()
//     connection.query('insert into deviceLocation values(id, ?, ?,?,now())',[results[0].deviceID,lat,lon], function (err, results, fields){
//         //console.log(results);
//     })
//     }
//   );
// }
    
//   }
//   setInterval(intervalFunc, 10000);
//--x--

  

app.get('/',(req,res)=>{
  
})
  
server.listen(PORT, function () {
    console.log('server running');
  }); 
