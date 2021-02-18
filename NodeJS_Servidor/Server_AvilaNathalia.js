const http = require('http');

function createRandomIntNumber(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function createRandomFloatNumber(min, max){
  return (Math.random() * (max - min) + min).toFixed(2);
}

function createObsjectResponse(){
  let object = {};
  object['id'] = createRandomIntNumber(1,10);
  object['title'] = `Producto ${createRandomIntNumber(1, 10)}`;
  object['price'] = createRandomFloatNumber(0, 9999.99)
  object['thumbnail'] = `Foto ${createRandomIntNumber(1, 10)}`;
  return object;
}
const server = http.createServer((req,res) => {
  res.end(JSON.stringify(createObsjectResponse()));
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, function(){
  console.log(`Servidor corriendo en el puerto ${this.address().port}`);
})