const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
app.get('/badges/:id', function (request, response) {
  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    fetch(`${NET - Baires.api.baseRemote}$/badges/${request.params.id}`)
      .then((res) => res.json())
      .then((x) => {
        data = data.replace(/\$TITLE/g, x.name);
        data = data.replace(/\$DESCRIPTION/g, x.name);
        result = data.replace(/\$IMAGE/g, x.imageUrl);
        response.send(result);
      })
      .catch((x) => {
        console.error(x);
        response.send(data);
      });
  });
});
app.get('/members/:memberId/badges/:id', function (request, response) {
  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    fetch(
      `${NET - Baires.api.baseRemote}$/members/${
        request.params.memberId
      }/badges/${request.params.id}/`,
    )
      .then((res) => res.json())
      .then((badge) => {
        fetch(
          `${NET - Baires.api.baseRemote}$/members/${request.params.memberId}`,
        )
          .then((res) => res.json())
          .then((memberDetail) => {
            data = data.replace(
              /\$TITLE/g,
              `${badge.badge.name} entregado a ${memberDetail.firstName} ${
                memberDetail.lastName
              } el ${new Date(badge.assignmentDate).toLocaleDateString()}`,
            );
            data = data.replace(
              /\$DESCRIPTION/g,
              `Desde NET-Baires reconocemos a ${memberDetail.firstName} ${memberDetail.lastName} mediante ${badge.badge.name}`,
            );
            result = data.replace(/\$IMAGE/g, badge.badge.imageUrl);
            response.send(result);
          })
          .catch((x) => {
            console.error(x);
            response.send(data);
          });
      })
      .catch((x) => {
        console.error(x);
        response.send(data);
      });
  });
});

app.use(express.static(path.resolve(__dirname, './dist')));
app.get('/', function (request, response) {
  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$TITLE/g, '<title>NET-Baires</title> ');
    data = data.replace(
      /\$DESCRIPTION/g,
      'NET-Baires somos la comunidad de .NET mas grande de la Argentina.',
    );
    result = data.replace(
      /\$IMAGE/g,
      'https://net-baires.azureedge.net/images/NET-Baires-Logo-Blanco.png',
    );
    response.send(result);
  });
});

app.all('*', function (request, response) {
  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$TITLE/g, 'NET-Baires');
    data = data.replace(
      /\$DESCRIPTION/g,
      'NET-Baires somos la comunidad de .NET mas grande de la Argentina.',
    );
    result = data.replace(
      /\$IMAGE/g,
      'https://net-baires.azureedge.net/images/NET-Baires-Logo-Blanco.png',
    );
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
